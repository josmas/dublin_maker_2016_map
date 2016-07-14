'use strict';

const r = require('rethinkdb');

var connection = null;
function setConnection(conn) {
  connection = conn;
}

/**
* This function expects that the database 'jos' and table 'markers' EXIST.
*/
function storeInDB(marker, cb) {
  if (connection) console.log('good to go with the DB');
  else return cb(new Error('DB connection not available.'));

  console.log('The marker is: ' + JSON.stringify(marker));
  if (!marker.lat || !marker.lng || !marker.name || !marker.pic) {
    return cb(new Error('Not enough info to store the Marker'));
  }

  r.db('jos').table('markers').insert([
    marker
  ]).run(connection, function(err, result) {
    if (err) {
      console.log(err);
      return cb(err);
    }
    console.log(JSON.stringify(result, null, 2));
    cb(null, 'all seems good');
  })
}

function readMarkers(cb) {
  r.db('jos').table('markers').run(connection, function(err, cursor) {
    if (err) return cb(err);
    cursor.toArray(function(err, result) {
        if (err) return cb(err);
        cb(null, result);
    });
});
}

module.exports = {
  setConnection: setConnection,
  storeInDB: storeInDB,
  readMarkers: readMarkers
}
