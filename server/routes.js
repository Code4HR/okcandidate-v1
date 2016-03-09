// Routes
var admin = require("./controllers/admin")


module.exports = [
  {
    method: 'GET',
    path: '/admin',
    config: {
        auth: 'simple',
        handler: admin
    }
  },
  {
    method: 'GET',
    path: '/survey',
    handler: {
      view: 'Default'
    }
  },
]
