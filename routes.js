// Routes

module.exports = [
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
  },
  {
    method: 'GET',
    path: '/login',
    handler: {
      view: 'Login'
    }
  }
]
