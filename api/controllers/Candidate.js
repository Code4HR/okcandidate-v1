const _ = require('lodash')

module.exports = function (server) {
  const Candidate = server.plugins['hapi-shelf'].model('Candidate')
  const SurveyAnswer = server.plugins['hapi-shelf'].model('SurveyAnswer')
  const SurveyResponse = server.plugins['hapi-shelf'].model('SurveyResponse')

  function getCandidateMatch(surveyResponseId, callback)
  {
    SurveyAnswer
    .query(answer_builder => {
      answer_builder.column('survey_response.id as response_id')
      answer_builder.column('survey_response.geography_id')
      answer_builder.column('candidate_answer.candidate_id')
      answer_builder.column('candidate.candidate_name')
      answer_builder.column('candidate.candidate_website')
      answer_builder.column('candidate_type.id as type_id')
      answer_builder.column('candidate_type.type_name ')
      answer_builder.column('category.id as category_id')
      answer_builder.column('category.category_name')
      answer_builder.column('survey_answer.question_id')
      answer_builder.column('question.question_text')
      answer_builder.column('survey_answer.answer_id')
      answer_builder.column('a1.answer_value as answer_text')
      answer_builder.column('candidate_answer.answer_id as candidate_answer_id')
      answer_builder.column('a2.answer_value as candidate_answer_text')
      answer_builder.column(server.plugins['hapi-shelf'].knex.raw("case \
        when survey_answer.answer_id = candidate_answer.answer_id \
        then (cast(survey_answer.intensity as numeric(3,2)) + cast(candidate_answer.intensity as numeric(3,2))) / 10 \
        else 0.00 \
        end as score"))
      answer_builder.innerJoin('question', 'survey_answer.question_id', 'question.id')
      answer_builder.innerJoin('category', 'question.category_id', 'category.id')
      answer_builder.innerJoin('answer as a1', 'survey_answer.answer_id', 'a1.id')
      answer_builder.innerJoin('survey_response', 'survey_answer.survey_response_id', 'survey_response.id')
      answer_builder.innerJoin('candidate_answer', 'survey_answer.question_id', 'candidate_answer.question_id')
      answer_builder.innerJoin('answer as a2', 'candidate_answer.answer_id', 'a2.id')
      answer_builder.innerJoin('candidate_geography', function() {
        this.on('candidate_answer.candidate_id', '=', 'candidate_geography.candidate_id')
        .andOn('candidate_geography.geography_id', '=', 'survey_response.geography_id')
      })
      answer_builder.innerJoin('candidate', 'candidate_answer.candidate_id', 'candidate.id')
      answer_builder.innerJoin('candidate_type', 'candidate.candidate_type_id', 'candidate_type.id')
      answer_builder.where('survey_response.id', surveyResponseId)
    })
    .fetchAll()
    .then(answers => {
      formatCandidateMatch(answers, callback)
    })
  }

  function formatCandidateMatch(matchArray, callback)
  {
    var responses = _.uniq(matchArray.pluck('responseId'))
    var geographies = _.uniq(matchArray.pluck('geographyId'))
    var candidates = _.uniq(matchArray.pluck('candidateId'))
    var candidateTypes = _.uniq(matchArray.pluck('typeId'))
    var categories = _.uniq(matchArray.pluck('categoryId'))

    if (responses.length === 1)
    {
      var output = {}
      output.id = responses[0]
      output.geographyId = geographies[0]

      output.survey = candidateTypes.map((typeId) => {
        var candidateType = {}

        candidateType.candidateTypeId = typeId
        candidateType.candidateTypeName = matchArray.findWhere({'typeId': typeId}).get('typeName')

        candidateType.candidates = candidates.filter((candidateId) => {
          if (matchArray.findWhere({'typeId': typeId, 'candidateId': candidateId}))
          {
            return true
          }
          return false
        }).map((candidateId) => {
          var candidateList = matchArray.where({'typeId': typeId, 'candidateId': candidateId})

          var candidate = {}

          candidate.candidateId = candidateId
          candidate.candidateName = matchArray.findWhere({'candidateId': candidateId}).get('candidateName')
          candidate.candidateWebsite = matchArray.findWhere({'candidateId': candidateId}).get('candidateWebsite')
          candidate.compositeMatchScore = Math.round((candidateList.reduce((p, n) => {
            return p + parseFloat(n.get('score'))
          }, 0.0)*100) / (candidateList.length))

          candidate.categoryMatchScores = categories.filter((categoryId) => {
            if (matchArray.findWhere({'typeId': typeId,
                                      'categoryId': categoryId,
                                      'candidateId': candidateId}))
            {
              return true
            }
            return false
          })
          .map((categoryId) => {
            var categoryList = matchArray.where({'typeId': typeId,
                                                 'categoryId': categoryId,
                                                 'candidateId': candidateId})

           if (categoryList.length > 0)
           {
             var category = {}

             category.categoryId = categoryId
             category.categoryName = matchArray.findWhere({'categoryId': categoryId}).get('categoryName')
             category.categoryMatch = Math.round((categoryList.reduce((p, n) => {
               return p + parseFloat(n.get('score'))
             }, 0.0)*100) / categoryList.length)

             category.questions = categoryList.map((item) => {
               return {
                 questionId: item.get('questionId'),
                 questionText: item.get('questionText'),
                 candidateAnswerId: item.get('candidateAnswerId'),
                 candidateAnswerLabel: item.get('candidateAnswerText'),
                 voterAnswerId: item.get('answerId'),
                 voterAnswerText: item.get('answerText')
               }
             })

             return category
           }
          })

          return candidate
        })

        return candidateType
      })
    }

    callback(output)
  }


  return [{
    method: 'GET',
    path: '/api/candidate',
    handler: (request, reply) => {
      Candidate
        .fetchAll()
        .then(candidates => {
          reply(candidates)
        })
    }
  },
  {
    method: 'GET',
    path: '/api/candidate/{id}',
    handler: (request, reply) => {
      Candidate
        .where({id: request.params.id})
        .fetch()
        .then(candidate => {
          reply(candidate)
        })
    }
  },
  {
    method: 'GET',
    path: '/api/candidate_match/{survey_response_id}',
    handler: (request, reply) => {

      const responseId = request.params.survey_response_id

      Promise.all([
        SurveyResponse
          .where({id: responseId})
          .fetch(),
        new Promise(resolve => {
          getCandidateMatch(responseId, matches => {
            resolve(matches)
          })
        })
      ]).then(results => {
        const info = results[0].toJSON()
        const hasContactInfo = Boolean(info.userEmail || info.userPhone)
        reply(Object.assign({}, results[1], {hasContactInfo}))
      })
    }
  }]
}
