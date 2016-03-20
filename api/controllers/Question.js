module.exports = function (server) {
  const Question = server.plugins['hapi-shelf'].model('Question')
  const Answer = server.plugins['hapi-shelf'].model('Answer')

  return [{
    method: 'GET',
    path: '/api/question',
    handler: (request, reply) => {
      Question
        .fetchAll({withRelated: ['answers']})
        .then(questions => {
          reply(questions)
        })
    }
  },
    {
      method: 'GET',
      path: '/api/question/{id}',
      handler: (request, reply) => {
        Question
          .where({id: request.params.id})
          .fetch({withRelated: ['answers']})
          .then(questions => {
            reply(questions)
          })
      }
    },
    {
      method: 'POST',
      path: '/api/question',
      handler: (request, reply) => {
        const question = new Question()

        question
          .save({
            survey_id: request.payload.surveyId,
            category_id: request.payload.categoryId,
            data_type: request.payload.dataType,
            question_text: request.payload.questionText
          })
          .then(function (newQuestion) {
            reply(newQuestion)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/question/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function (question) {
            question.save({
              survey_id: request.payload.surveyId,
              category_id: request.payload.categoryId,
              data_type: request.payload.dataType,
              question_text: request.payload.questionText
            })
              .then(function (answer) {
                reply(answer)
              })
              .catch()
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/question/delete/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function (question) {
            question.destroy()
              .then(function () {
                reply()
              })
              .catch()
          })
          .catch()
      }
    }]
}
