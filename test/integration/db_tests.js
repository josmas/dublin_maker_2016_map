'use strict';

const db = require('../../db_calls');
const expect = require('chai').expect;
const r = require('rethinkdb');

describe('A locally availabe, fully functioning rethinkDB database', function() {

  it('should have a null connection when not configured', function (done) {
    db.storeInDB({}, function(err, result){
      expect(err).not.to.be.null;
      done();
    })
  });

  it('should have a real connection when configured', function (done) {
    r.connect( {host: '192.168.99.100', port: 28015}, function(err, conn) {
      if (err) throw err;
      db.setConnection(conn);
      db.storeInDB({}, function(err, result){
        expect(err).to.be.null;
        done();
      })
    });
  });

});
