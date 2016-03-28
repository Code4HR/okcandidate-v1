'use strict'
const fetch = require('isomorphic-fetch')
const turf = require('turf')
const superwards = turf.featurecollection(require('../data/superwards.json'))

const SMARTY_STREETS_API = 'https://api.smartystreets.com/street-address'
const SMARTY_STREETS_AUTH_ID = process.env['SMARTY_STREETS_AUTH_ID']
const SMARTY_STREETS_AUTH_TOKEN = process.env['SMARTY_STREETS_AUTH_TOKEN']

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
      const url = buildStreetQuery(request.payload.street)
      let thisWard
      fetch(url)
        .then(function (response) {
          // TODO HANDLE HAPI ERROR
          return response.json()
        })
        .then(function (address) {
          thisWard = whichWard(address)
          return Geography
            .query('where', 'geography_name', 'like', `%${thisWard.ward}`)
            .fetch()
        })
        .then(geography => {
          return geography
        })
        .then(reply)
    }
  }]
}

function buildStreetQuery (street1) {
  // / Builds a GET query string
  const params = [
    {'key': 'auth-id', 'value': SMARTY_STREETS_AUTH_ID},
    {'key': 'auth-token', 'value': SMARTY_STREETS_AUTH_TOKEN},
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
  const point = turf.point([address[0].metadata.longitude, address[0].metadata.latitude])
  return turf.inside(point, superwards.features.features[0]) ? {'ward': 6} : {'ward': 7}
}
