'use strict'

module.exports = (server) => {
  const Joi = require('joi')
  const Boom = require('boom')
  const Promise = require('bluebird')

  const API_ROUTES = [].concat(
     require('./controllers/Category')(server),
     require('./controllers/Survey')(server),
     require('./controllers/Question')(server),
     require('./controllers/Answer')(server),
     require('./controllers/SurveyResponse')(server),
     require('./controllers/SurveyAnswer')(server),
     require('./controllers/Geography')(server),
     require('./controllers/Candidate')(server)
  )

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
      config: {
        auth: {
          strategy: 'standard',
          scope: 'admin'
        }
      },
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
      path: '/results/{id}',
      handler: {
        view: 'Default'
      }
    }
  ].concat(API_ROUTES)

}

function getValidatedUser(email, password){
  return new Promise(function (fulfill, reject) {
    var users = [{
      email: 'paulo@paulo.com',
      password: 'paulopass'
    },
    {
      email: 'other@other.com',
      password: 'otherpass'
    }]

    function grabCleanUser(user) {
      var user = user
      delete user.password
      return user
    }

    if (email === users[0].email && password === users[0].password) {
      return fulfill(grabCleanUser(users[0]))
    } else if (email === users[1].email && password === users[1].password) {
      return fulfill(grabCleanUser(users[1]))
    } else {
      return reject(null)
    }

  })
}











