'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.route({
  method: ['PUT', 'POST'],
  path: '/maprequest',
  handler: function (request, reply) {
    var lat, lng, name, pic;
    console.log("payload: " + request.payload);
    var payload = request.payload;
    console.log(typeof request.payload);

    // The format of the payload is: { '14 : 34 : jos : female_3.png': '' } BUT...

    // From the phone, it comes in as an object (not locally, but only from App Inventor calls)
    if (typeof payload === 'object') {
      lat = Object.keys(payload)[0].split(' : ')[0];
      lng = Object.keys(payload)[0].split(' : ')[1];
      name = Object.keys(payload)[0].split(' : ')[2];
      pic = Object.keys(payload)[0].split(' : ')[3];
    }

    // Cannot reproduce the object encoding locally so creating an additional parser
    if (typeof payload === 'string'){
      payload = payload.split("'")[1];
      lat = payload.split(' : ')[0];
      lng = payload.split(' : ')[1];
      name = payload.split(' : ')[2];
      pic = payload.split(' : ')[3];
    }

    //TODO (jos) Push to DB

    console.log(lat + ' '  + lng + ' ' + name + ' ' + pic);
    reply('Done');
  }
});

server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('./public/index.html');
    }
  });
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
