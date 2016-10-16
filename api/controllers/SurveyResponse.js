function anonymize (survey) {
  if (survey.attributes.userEmail) {
    survey.attributes.userEmail = 'survey@okcandidate.code4hr.org'
  }

  if (survey.attributes.userPhone) {
    survey.attributes.userPhone = '757-555-5555'
  }
  return survey
}

module.exports = function (server) {
  const SurveyResponse = server.plugins['hapi-shelf'].model('SurveyResponse')
  return [
    {
      method: 'GET',
      path: '/api/survey_response',
      handler: (request, reply) => {
        SurveyResponse
          .fetchAll()
          .then(survey_responses => {
            reply(survey_responses.map(data=>anonymize(data)))
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
            reply(anonymize(survey_responses))
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
        const survey_response = new SurveyResponse()
        survey_response
          .where({id: request.params.id})
          .fetch()
          .then(function (survey_response) {
            survey_response.save({
              survey_id: request.payload.surveyId,
              geography_id: request.payload.geographyId,
              user_email: request.payload.userEmail,
              user_phone: request.payload.userPhone
            })
              .then(function (surveyResponse) {
                reply(surveyResponse)
              })
              .catch()
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/survey_response/contact_info/{id}',
      handler: (request, reply) => {
        const survey_response = new SurveyResponse()
        survey_response
          .where({id: request.params.id})
          .fetch()
          .then(survey_response => {
            survey_response.save({
              user_email: request.payload.userEmail,
              user_phone: request.payload.userPhone
            })
            .then(survey_response => {
              reply(survey_response)
            })
            .catch()
          })
          .catch()
      }
    }
  ]
}
