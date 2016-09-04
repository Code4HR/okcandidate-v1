module.exports = function (server) {
  const SurveyResponse = server.plugins['hapi-shelf'].model('SurveyResponse')

  return [    {
    method: 'GET',
    path: '/api/survey_response',
    handler: (request, reply) => {
      SurveyResponse
        .fetchAll()
        .then(survey_responses => {
          reply(survey_responses)
        })
    }
  },
    {
      method: 'GET',
      path: '/api/survey_response/{id}',
      handler: (request, reply) => {
        SurveyResponse
          .where({id: request.params.id})
          .fetch()
          .then(survey_responses => {
            reply(survey_responses)
          })
      }
    },
    {
      method: 'POST',
      path: '/api/survey_response',
      handler: (request, reply) => {
        const survey_response = new SurveyResponse()
        survey_response
          .save({
            survey_id: request.payload.surveyId,
            geography_id: request.payload.geographyId,
            user_email: request.payload.userEmail,
            user_phone: request.payload.userPhone,
          })
          .then(function (newSurveyResponse) {
            reply(newSurveyResponse)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/survey_response/{id}',
      handler: (request, reply) => {
        survey_response
          .where({id: request.params.id})
          .fetch()
          .then(function (survey_response) {
            survey_response.save({
              survey_id: request.payload.surveyId,
              geography_id: request.payload.geographyId
              user_email: request.payload.userEmail,
              user_phone: request.payload.userPhone,
            })
              .then(function (surveyResponse) {
                reply(surveyResponse)
              })
              .catch()
          })
          .catch()
      }
    }]
}
