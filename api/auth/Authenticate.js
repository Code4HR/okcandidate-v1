'use strict'

const Joi = require('joi')
const Boom = require('boom')
const Bluebird = require('bluebird')
const Hoek = require('hoek')


const time_logged_in = 5184000000
let uuid = 1

exports.register = function(server, options, next){

	// Caching their cookie allowance
  const cache = server.cache({
	segment: 'standard',
	expiresIn: time_logged_in
  })

  server.app.cache = cache
  
  // Register cookie authorization library, won't compile without callback function
  server.register([
	  {
	  	register: require('hapi-auth-cookie')
	  }
	], function(err) {
		if (err) {
			console.error('Failed to load a plugin:', err)
			throw err
		}
  })

  // Create strategy	
  server.auth.strategy('standard', 'cookie',{
		cookie: 'cookiename',
		password: 'cookiepass',
		isSecure: true,
		ttl: time_logged_in,
		validateFunc: function (request, session, callback) {

			cache.get(session.sid, (err, cached) => {
				if (err) {
					return callback(err, false)
				}
				if (!cached) {
					return callback(null, false)
				}
				return callback(null, true, cached.account)
			})
		}
  })

  // Routes for authentication
  server.route([
	{
		// Create main login route with placeholder HTML until we route it correctly
	  method: 'GET',
	  path: '/login',
	  config: {
	  	  auth: false,
			handler: {
				view: 'LoginDefault'
			}
	  } 
	},
	{
		// Where the action happens. Sends info grabbed from the input forms to the getValidatedUser function (below)
		// inside of which the DB is queried to see if the given info is a match. If yes, they're authenticated
	  method: 'POST',
	  path: '/login',
	  config:{
		auth: false,
		validate: {
		  payload: {
			email: Joi.string().required(),
			password: Joi.string().min(2).max(200).required()
		  }
		},
		handler: function(request, reply) {

		  const email = request.payload.email
		  const password = request.payload.password

		  getValidatedUser(server, request.payload.email,request.payload.password)
		  .then(function (user) {
		 
			if (user) {
				//They're in!
				const sid = String(++uuid)

				request.server.app.cache.set(sid, { account: user}, 0, (err) =>{
					Hoek.assert(!err, err)
					request.cookieAuth.set({sid: sid})
					return reply.redirect('/admin')
				}) 
			} else {
				// GTFO
				return reply(Boom.badImplementation())
				}
		  })

		  .catch(function (err) {
			return reply(Boom.badImplementation())
		  })} 
		}
	}, {
		// Bye bye now
		method: 'GET',
		path: '/logout',
		config: {
			auth: false,
			handler: function (request, reply) {
				request.cookieAuth.clear()
				return reply('Logged out')
			}
		}
	}
])
  next()
}

exports.register.attributes = {
  name: 'auth'
}


function getValidatedUser(server, email, password){
	// Grab the table from DB and make it happen
	const User = server.plugins['hapi-shelf'].model('Users')

	return User
			.where({'email': email,
					'password': password })
			.fetch()
}
