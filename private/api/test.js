/** cortext project API tests (with module supertest)*/
var request = require('supertest')
  , express = require('express');

var app = require('./app.js');

request(app)
  .get('/elements')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });