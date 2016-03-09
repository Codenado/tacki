'use strict';

var app = require('../..');
import request from 'supertest';

var newTack;

describe('Tack API:', function() {

  describe('GET /api/tacks', function() {
    var tacks;

    beforeEach(function(done) {
      request(app)
        .get('/api/tacks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tacks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tacks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tacks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tacks')
        .send({
          name: 'New Tack',
          info: 'This is the brand new tack!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTack = res.body;
          done();
        });
    });

    it('should respond with the newly created tack', function() {
      newTack.name.should.equal('New Tack');
      newTack.info.should.equal('This is the brand new tack!!!');
    });

  });

  describe('GET /api/tacks/:id', function() {
    var tack;

    beforeEach(function(done) {
      request(app)
        .get('/api/tacks/' + newTack._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tack = res.body;
          done();
        });
    });

    afterEach(function() {
      tack = {};
    });

    it('should respond with the requested tack', function() {
      tack.name.should.equal('New Tack');
      tack.info.should.equal('This is the brand new tack!!!');
    });

  });

  describe('PUT /api/tacks/:id', function() {
    var updatedTack;

    beforeEach(function(done) {
      request(app)
        .put('/api/tacks/' + newTack._id)
        .send({
          name: 'Updated Tack',
          info: 'This is the updated tack!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTack = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTack = {};
    });

    it('should respond with the updated tack', function() {
      updatedTack.name.should.equal('Updated Tack');
      updatedTack.info.should.equal('This is the updated tack!!!');
    });

  });

  describe('DELETE /api/tacks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tacks/' + newTack._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tack does not exist', function(done) {
      request(app)
        .delete('/api/tacks/' + newTack._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
