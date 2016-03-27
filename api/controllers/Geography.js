'use strict'
require('isomorphic-fetch')

const SMARTY_STREETS_API = 'https://api.smartystreets.com/street-address'
const SMART_STREET_AUTH_ID = process.env['SS_AUTH_ID']
const SMART_STREET_AUTH_TOKEN = process.env['SS_AUTH_TOKEN']

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
  },
    {
      method: 'POST',
      path: '/api/geography/ward',
      handler: (request, reply) => {
        let url = buildStreetQuery(request.payload.street)
        console.log(url)
        fetch(url)
          .then(function (response) {
            // TODO HANDLE HAPI ERROR
            reply(response.json())
          })
      }
    }]
}

function buildStreetQuery (street1) {
  // / Builds a GET query string
  let params = [
    {'key': 'auth-id', 'value': SMART_STREET_AUTH_ID},
    {'key': 'auth-token', 'value': SMART_STREET_AUTH_TOKEN},
    {'key': 'street', 'value': street1.replace(/ /g, '+')},
    {'key': 'city', 'value': 'norfolk'},
    {'key': 'state', 'value': 'VA'},
    {'key': 'candidates', 'value': 10}
  ]
  let query = ''
  params.forEach((p) => {
    query = `${query}&${p.key}=${p.value}`
  })
  return `${SMARTY_STREETS_API}?${query.slice(1)}`
}
