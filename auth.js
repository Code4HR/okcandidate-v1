const secret = 'superSecret'
const jwt = require('hapi-auth-jwt')

exports.register = function(server, options, next){

  function validate(request, token, callback) {
    console.log(request)
    console.log(token)
    var credentials = {'id': 1, 'name': 'blah'}
    return callback(null, true, credentials)
  }

  server.register(jwt, (err) => {
    server.auth.strategy('token', 'jwt', {
      key: secret,
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256']}
    })
  })
}

exports.register.attributes = {
  name: 'auth'
}
