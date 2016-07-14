'use strict';

const Hapi = require('hapi');
const r = require('rethinkdb');
const db = require('./db_calls');

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
  method: 'GET',
  path: '/markers',
  handler: function (request, reply) {
    db.readMarkers(function(err, results){
      if (err) return console.log(err); //TODO (jos) Do something with this
      console.log(results);
      reply(results);
    });
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

    var currentMarker = {
      lat: lat,
      lng: lng,
      name: name,
      pic: pic
    };
    db.storeInDB(currentMarker, function(err, result){
      if (err) return console.log(err); //TODO (jos) Do something with this
      console.log(result); //TODO (jos) probably all to be done with the result.
    });
    reply('Done');
  }
});

server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        index: true
      }
    }
  });
});

var connection = null;
server.start((err) => {

  if (err) {
    throw err;
  }

  //TODO (jos) make host an ENV variable
  r.connect( {host: '192.168.99.100', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
    db.setConnection(connection);
    console.log('Server running at:', server.info.uri);
  })
});
