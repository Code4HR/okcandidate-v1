const _ = require('lodash')

module.exports = function (server) {
  const Survey = server.plugins['hapi-shelf'].model('Survey')
  return [
    {
      method: 'GET',
      path: '/api/survey',
      handler: (request, reply) => {
        Survey
          .fetchAll()
          .then(surveys => {
            reply(surveys)
          })
      }
    },
    {
      method: 'GET',
      path: '/api/survey/{id}',
      handler: (request, reply) => {
        Survey
          .where({id: request.params.id})
          .fetch({withRelated: ['questions.answers', 'categories']})
          .then(survey => {

            survey = survey.toJSON()

            const sortedQuestions = _.sortBy(survey.questions, question => question.categoryId)
            const indexedCategories = survey.categories.map(category => {
              return Object.assign({}, category, {
                firstQuestionIndex: sortedQuestions.findIndex(question => {
                  return question.categoryId === category.id
                })
              })
            })

            reply(Object.assign({}, survey, {
              questions: sortedQuestions,
              categories: indexedCategories
            }))

          })
      }
    },
    {
      method: 'POST',
      path: '/api/survey',
      handler: (request, reply) => {
        const survey = new Survey()

        survey
          .save({
            survey_name: request.payload.surveyName
          })
          .then(function (newSurvey) {
            reply(newSurvey)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/survey/{id}',
      handler: (request, reply) => {
        Survey
          .where({id: request.params.id})
          .fetch()
          .then(function (survey) {
            survey.save({
              survey_name: request.payload.surveyName
            })
              .then(function (survey) {
                reply(survey)
              })
              .catch()
          })
          .catch()
      }
    }
  ]
}
