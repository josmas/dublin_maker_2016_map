'use strict';

/**
* A simple script to create a DB and table in RethinkDB, needed for the system to work.
*/
r = require('rethinkdb');

var connection = null;
//TODO (jos) make host an ENV variable - using the docker IP on mac
r.connect( {host: '192.168.99.100', port: 28015}, function(err, conn) {
  if (err) throw err;
  connection = conn;
  r.dbCreate('jos').run(conn, function(err, res){
    if (err) throw err;
    r.db('jos').tableCreate('markers').run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    })
  });
})
