'use strict'

module.exports = (server) => {

  const Survey = server.plugins['hapi-shelf'].model('Survey');
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
      path: '/survey/{id}',
      handler: (request, reply) => {
        Survey
          .where({id: request.params.id})
          .fetch()
          .then(survey => {
            reply(survey)
          })
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
      path: '/answer/{id}',
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
      method: 'GET',
      path: '/question',
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
      path: '/question/{id}',
      handler: (request, reply) => {
        Question
          .where({id: request.params.id})
          .fetch({withRelated: ['answers']})
          .then(questions => {
            reply(questions)
          })
      }
    }
  ]

}
