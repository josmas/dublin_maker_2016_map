'use strict';

const db = require('../../db_calls');
const expect = require('chai').expect;
const r = require('rethinkdb');

const firstMarker = {
  lat: 53.384635499999995,
  lng: -6.602360699999963,
  name: 'jos',
  pic: 'male_1.jpg'
};

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
      db.storeInDB(firstMarker, function(err, result){
        expect(err).to.be.null;
        done();
      })
    });
  });

  it('should error when there is not enough information for a marker', function (done) {
    r.connect( {host: '192.168.99.100', port: 28015}, function(err, conn) {
      if (err) throw err;
      db.setConnection(conn);
      db.storeInDB({}, function(err, result){
        expect(err).not.to.be.null;
        done();
      })
    });
  });

  it('should store a record with a real connection configured', function (done) {
    r.connect( {host: '192.168.99.100', port: 28015}, function(err, conn) {
      if (err) throw err;
      db.setConnection(conn);
      db.storeInDB(firstMarker, function(err, result){
        expect(err).to.be.null;
        expect(result).not.to.be.null;
        done();
      })
    });
  });

});
