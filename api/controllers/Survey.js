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
            reply(survey)
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
