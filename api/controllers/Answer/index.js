module.exports = function (server) {
  const Answer = server.plugins['hapi-shelf'].model('Answer')

  return [    {
    method: 'GET',
    path: '/api/answer',
    handler: (request, reply) => {
      Answer
        .fetchAll()
        .then(answers => {
          reply(answers)
        })
    }
  },
    {
      method: 'GET',
      path: '/api/answer/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(answers => {
            reply(answers)
          })
      }
    },
    {
      method: 'POST',
      path: '/api/answer',
      handler: (request, reply) => {
        const answer = new Answer()

        answer
          .save({
            question_id: request.payload.questionId,
            answer_label: request.payload.answerLabel,
            answer_value: request.payload.answerValue,
            answer_order: request.payload.answerOrder
          })
          .then(function (newAnswer) {
            reply(newAnswer)
          })
          .catch()
      }
    },
    {
      method: 'POST',
      path: '/api/answer/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function (answer) {
            answer.save({
              question_id: request.payload.questionId,
              answer_label: request.payload.answerLabel,
              answer_value: request.payload.answerValue,
              answer_order: request.payload.answerOrder
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
      path: '/api/answer/delete/{id}',
      handler: (request, reply) => {
        Answer
          .where({id: request.params.id})
          .fetch()
          .then(function (answer) {
            answer.destroy()
              .then(function () {
                reply()
              })
              .catch()
          })
          .catch()
      }
    }]
}
