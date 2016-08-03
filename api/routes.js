'use strict'

module.exports = (server) => {

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
