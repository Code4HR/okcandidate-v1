'use strict';

const Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');
const Boom = require('boom');

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

exports.register = function (server, options, next) {
    server.register(Basic, (err) => {
        server.auth.strategy('simple', 'basic', { validateFunc: validate });
        server.route({
            method: 'GET',
            path: '/login',
            config: {
                auth: 'simple',
                handler: function (request, reply) {
                    reply('hello, ' + request.auth.credentials.name);
                }
            }
        });
        server.route({
            method: 'GET',
            path: '/logout',
            handler: function (request, reply) {
                reply(Boom.unauthorized(null, 'Logged out'))
            }
        });
    })
}


const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

exports.register.attributes = {
    name: 'basic-auth'
};
