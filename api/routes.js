'use strict'

module.exports = (server) => {

  const API_ROUTES = [].concat(
     require('./controllers/Category')(server),
     require('./controllers/Survey')(server),
     require('./controllers/Question')(server),
     require('./controllers/Answer')(server),
     require('./controllers/SurveyResponse')(server),
     require('./controllers/SurveyAnswer')(server),
     require('./controllers/Geography')(server)
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
    }
  ].concat(API_ROUTES)

}
