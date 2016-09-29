module.exports = function (server) {
	const Users = server.plugins('hapi-shelf').model('Users')

	return[{
		method: 'GET',
		path: '/api/users',
		handler: (request, reply) => {
			Users
			.fetchall()
			.then(users =>{
				.reply(users)
			})
		}
	}]
}