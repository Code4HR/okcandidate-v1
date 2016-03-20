module.exports = function (server) {
  const DataType = server.plugins['hapi-shelf'].model('DataType')

  return [{
    method: 'GET',
    path: '/api/data_type',
    handler: (request, reply) => {
      DataType
        .fetchAll()
        .then(dataTypes => {
          reply(dataTypes)
        })
    }
  }]
}
