// Create a basic Hapi.js server
require('babel-register')({
  presets: ['es2015', 'react']
})

const Hapi = require('hapi')
const dateFormat = require('dateformat')
const format = 'dd mmm HH:MM:ss'
const routes = require('./routes')

// Basic Hapi.js connection stuff
const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 8000
})

// Register the inert and vision Hapi plugins
// As of Hapi 9.x, these two plugins are no longer
// included in Hapi automatically
// https://github.com/hapijs/hapi/issues/2682
server.register([{
  register: require('inert')
}, {
  register: require('vision')
}], function(err) {

  if (err) return console.error(err)

    // Add the React-rendering view engine
    server.views({
        engines: {
            jsx: require('hapi-react-views')
        },
        relativeTo: __dirname,
        path: 'views'
    })

    // Add a route to serve static assets (CSS, JS, IMG)
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'assets',
          index: ['index.html']
        }
      }
    })

    // Add main app route
    server.route(routes)

    server.start(function() {
      console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri)
    })

});

