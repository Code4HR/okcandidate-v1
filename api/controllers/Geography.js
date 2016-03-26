'use strict'

module.exports = function (server) {
  const Geography = server.plugins['hapi-shelf'].model('Geography')
  return [{
    method: 'GET',
    path: '/api/geography',
    handler: (request, reply) => {

      Geography
        .fetchAll()
        .then(geographies => {
          reply(geographies)
        })

    }
  }]
}
