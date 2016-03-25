module.exports = function (server) {
  const SurveyAnswer = server.plugins['hapi-shelf'].model('SurveyAnswer')

  return [    {
    method: 'GET',
    path: '/login',
    handler: {
      view: 'Login'
    }
  },
    {
      method: 'GET',
      path: '/api/survey_answer',
      handler: (request, reply) => {
        SurveyAnswer
          .fetchAll()
          .then(survey_answers => {
            reply(survey_answers)
          })
      }
    },
    {
      method: 'GET',
      path: '/api/survey_answer/{id}',
      handler: (request, reply) => {
        SurveyAnswer
          .where({id: request.params.id})
          .fetch()
          .then(survey_answers => {
            reply(survey_answers)
          })
      }
    },
    {
      method: 'POST',
      path: '/api/survey_answer',
      handler: (request, reply) => {
        var survey_answer = new SurveyAnswer()

        survey_answer
          .save({
            survey_response_id: request.payload.surveyResponseId,
            question_id: request.payload.questionId,
            answer_id: request.payload.answerId
          })
          .then(function (newSurveyAnswer) {
            reply(newSurveyAnswer)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/survey_answer/{id}',
      handler: (request, reply) => {
        survey_answer
          .where({id: request.params.id})
          .fetch()
          .then(function (survey_answer) {
            survey_answer.save({
              survey_response_id: request.payload.surveyResponseId,
              question_id: request.payload.questionId,
              answer_id: request.payload.answerId
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
