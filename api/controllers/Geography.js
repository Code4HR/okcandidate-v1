'use strict'
require('isomorphic-fetch')

var turf = require('turf')
var superwards = turf.featurecollection(require('../data/superwards.json'))

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
            return response.json()
          })
          .then(function (address) {
            return whichWard(address)
          })
          .then(reply)
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
    {'key': 'candidates', 'value': 1}
  ]
  let query = ''
  params.forEach((p) => {
    query = `${query}&${p.key}=${p.value}`
  })
  return `${SMARTY_STREETS_API}?${query.slice(1)}`
}

function whichWard (address) {
  // There are only two feature collections/wards so we can guess if its not 6, its 7
  if (address.length === 0) {
    return {'error': 'address not found'}
  }
  let point = turf.point([address[0].metadata.longitude, address[0].metadata.latitude])
  return turf.inside(point, superwards.features.features[0]) ? {'ward': 6} : {'ward': 7}
}
