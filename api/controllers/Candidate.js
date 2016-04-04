module.exports = function (server) {
  const Candidate = server.plugins['hapi-shelf'].model('Candidate')
  const SurveyAnswer = server.plugins['hapi-shelf'].model('SurveyAnswer')

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
      SurveyAnswer
      .query(function(score_builder) {
        score_builder.sum('intensity as score');
        score_builder.where('survey_response_id', request.params.survey_response_id)
      })
      .fetch()
      .then(function(total) {
        var score_raw = 'round((sum(cast(survey_answer.intensity as numeric(3,2))) / '
        + total.attributes.score + ') * 100) as composite_score'

        SurveyAnswer
        .query(function(match_builder) {
          match_builder.column('survey_response.id as survey_id', 'survey_response.geography_id')
          match_builder.column('candidate_answer.candidate_id', 'candidate.candidate_name')
          match_builder.column('candidate_type.id as type_id', 'candidate_type.type_name')
          match_builder.column(server.plugins['hapi-shelf'].knex.raw(score_raw))
          match_builder.innerJoin('survey_response', 'survey_answer.survey_response_id', 'survey_response.id')
          match_builder.innerJoin('candidate_answer', 'survey_answer.answer_id', 'candidate_answer.answer_id')
          match_builder.innerJoin('candidate_geography', function() {
            this.on('candidate_answer.candidate_id', '=', 'candidate_geography.candidate_id')
            .andOn('candidate_geography.geography_id', '=', 'survey_response.geography_id')
          })
          match_builder.innerJoin('candidate', 'candidate_answer.candidate_id', 'candidate.id')
          match_builder.innerJoin('candidate_type', 'candidate.candidate_type_id', 'candidate_type.id')
          match_builder.groupBy('survey_response.id', 'survey_response.geography_id'
          , 'candidate_answer.candidate_id', 'candidate.candidate_name'
          , 'candidate_type.id', 'candidate_type.type_name')
        })
        .fetchAll()
        .then(matches => {
          reply(formatCandidateMatch(matches))
        })
      })
    }
  }]
}

function formatCandidateMatch(matchArray) {
  var types = []
  var output = {}
  output.id = matchArray.models[0].attributes.surveyId
  output.geographyId = matchArray.models[0].attributes.geographyId
  output.survey = []

  for (var i = 0; i < matchArray.models.length; i++)
  {
    var typeExists = false

    for (var j = 0; j < output.survey.length; j++)
    {
      if (output.survey[j].candidateTypeName == matchArray.models[i].attributes.typeName)
      {
        typeExists = true

        var candidateExists = false

        for (var k = 0; k < output.survey[j].candidates.length; k++)
        {
          if(output.survey[j].candidates[k].candidateId == matchArray.models[i].attributes.candidateId)
          {
            candidateExists = true
          }
        }

        if(!candidateExists)
        {
          output.survey[j].candidates[output.survey[j].candidates.length] = {
            candidateId: matchArray.models[i].attributes.candidateId,
            candidateName: matchArray.models[i].attributes.candidateName,
            compositeMatchScore: matchArray.models[i].attributes.compositeScore
          }
        }
      }
    }

    if (!typeExists)
    {
      output.survey[output.survey.length] = {
        candidateTypeId: matchArray.models[i].attributes.typeId,
        candidateTypeName: matchArray.models[i].attributes.typeName,
        candidates: [{
          candidateId: matchArray.models[i].attributes.candidateId,
          candidateName: matchArray.models[i].attributes.candidateName,
          compositeMatchScore: matchArray.models[i].attributes.compositeScore
        }]
      }
    }
  }

  return(output)
}
