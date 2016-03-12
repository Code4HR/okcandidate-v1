'use strict'

module.exports = (server) => {

  const Answer = server.plugins['hapi-shelf'].model('Answer');
  const Question = server.plugins['hapi-shelf'].model('Question');

  return [
    {
      method: 'GET',
      path: '/',
      handler: {
        view: 'Default'
      }
    },
    {
      method: 'GET',
      path: '/admin',
      handler: {
        view: 'Default'
      }
    },
    {
      method: 'GET',
      path: '/survey',
      handler: {
        view: 'Default'
      }
    },
    {
      method: 'GET',
      path: '/login',
      handler: {
        view: 'Login'
      }
    },
    {
      method: 'GET',
      path: '/answer',
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
      path: '/question',
      handler: (request, reply) => {
        Question
          .fetchAll({withRelated: ['answers']})
          .then(questions => {
            reply(questions)
          })
      }
    }
  ]

}
