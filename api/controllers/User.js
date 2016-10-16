module.exports = function (server) {
	const User = server.plugins['hapi-shelf'].model('User')
	const boom = require('boom')
	const bcrypt = require('bcrypt')
	const jwt = require('jsonwebtoken')
	const secret = 'superSecret'

	function verifyUniqueUser(request, reply) {
		User
		.where({email: request.payload.email})
		.count()
		.then(count => {
			if (count > 0) {
				reply(boom.badRequest('Email taken'))
			}
			else {
				reply(request.payload)
			}
		})
	}

	function verifyCredentials(request, reply) {
		const password = request.payload.password

		User
		.where({email: request.payload.email})
		.fetch()
		.then(user => {
			if (user) {
				bcrypt.compare(password, user.get('password'), (err, isValid) => {
					if (err) {
						console.log(err)
						reply(boom.badRequest('Error'))
					}
					if (isValid) {
						reply(user)
					}
				})
			}
		})
	}

	function createToken(user) {
		return jwt.sign({id: user.get('id'), email: user.get('email')},
			               secret,
										 {algorithm: 'HS256', expiresIn: "1h"})
	}

	function hashPassword(password, callback) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				return callback(err, hash)
			})
		})
	}

	return[
		{
			method: 'GET',
			path: '/api/users',
			config: {
				auth: 'token',
				handler: (request, reply) => {
					User
					.fetchAll()
					.then(users =>{
						reply(users)
					})
				}
			}
		},
		{
			method: 'POST',
			path: '/api/user',
			config: {
				pre: [{method: verifyUniqueUser}],
				handler: (request, reply) => {
					var user = new User()

					hashPassword(request.payload.password, (err, hash) => {
						if (err) {

						}
						user.save({
							email: request.payload.email,
							password: hash
						})
						.then((newUser) => {
							reply({credentials: { id_token: createToken(newUser) }}).code(201)
						})
					})
				}
			}
		},
		{
			method: 'POST',
			path: '/api/user/authenticate',
			config: {
				pre: [
					{ method: verifyCredentials, assign: 'user' }
				],
				handler: (request, reply) => {
					var token = createToken(request.pre.user)
					reply({id_token: token})
					.header("Authorization", token)
				}
			}
		}]
}
