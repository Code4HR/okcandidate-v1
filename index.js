'use strict';

const Hapi = require('hapi');
const routes = require('./routes')

// Instantiate a server, listen on port 3000
const server = new Hapi.Server();
server.connection({ port: 3000 });

// Start Server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

// Add Routes
server.route(routes)
