'use strict'

exports.register = function(server, options, next){
	server.route([
	{
		method: 'GET',
		path: '/createuser',
		config: {
			// Uncomment for security
			//auth: {
			//	strategy: 'standard',
			//	scope: 'admin'
			//},
			handler: function(request, reply) {
			return reply('<html><head><title>User Creation</title></head><body>' +
						'<form method="post" action="/createuser">' +
						'New Username:<br><input type="text" name="create_username" ><br>' +
						'New Email:<br><input type="text" name="create_email" ><br>' +
						'New Password:<br><input type="password" name="create_password"><br/><br/>' +
						'Scope:<br><input type="text" name="create_scope"><br/><br/>' +
						'Survey:<br><input type="int" name="survey_access_number"><br/><br/>' +
						'<input type="submit" value="Create User"></form></body></html>')
			}

		}
	},
	{
		method: 'POST',
		path: '/createuser',
		config: {
			// Uncomment for security
			//auth: {
			//	strategy: 'standard',
			//	scope: 'admin'
			//},
			handler: function(request, reply) {

				const User = server.plugins['hapi-shelf'].model('Users')

				const user = new User()
					.save({
						username: request.payload.create_username,
						email: request.payload.create_email,
						password: request.payload.create_password,
						scope: request.payload.create_scope,
						survey: request.payload.survey_access_number
					})
					.then(function(new_user) {
						reply.redirect('/allusers')
					})
					.catch()
			}

		}
	},
	{
		method: 'GET',
		path: '/allusers',
		config: {
			handler: function(request, reply) {

				const User = server.plugins['hapi-shelf'].model('Users')

				reply(User
					.fetchAll()
					)
			}
		}
	}])
	next()
}

exports.register.attributes = {
  name: 'newuser'
}