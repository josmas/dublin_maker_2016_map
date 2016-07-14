'use strict';

const r = require('rethinkdb');

var connection = null;
function setConnection(conn) {
  connection = conn;
}

function storeInDB(marker, cb) {
  if (connection) console.log('good to go with the DB');
  else return cb(new Error('DB connection not available.'));

  console.log('The marker is: ' + JSON.stringify(marker));
  //TODO (jos) cb(err) when adding DB code
  cb(null, 'all seems good');
}

module.exports = {
  setConnection: setConnection,
  storeInDB: storeInDB
}
