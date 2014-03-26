/** cortext project API tests (with module supertest)*/
 
/****** loading config **********/
config = require('nconf');

config.argv()
     .env()
     .file({ file:
       './config.json'
     });
var request = require('supertest')
  , express = require('express');

var app = require('../app.js');

console.log('------------------ Cortext Projects API - Test suite ---------------');
describe('GET /', function(){
  it("should return code 200 and welcome tag", function (){
      request(app)
        .get('/')
        .expect('Content-Type', /text/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
        });    
  });
});

describe('GET /elements', function(){
  it("should return code 200 and expected element list", function (){
      elmt = request(app).get('/elements');
      //console.log (elmt);
        elmt.expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          //res.send('coucou');
          
        });    
  });
});


describe('POST /elements', function(){
  it("should return code 200 and welcome tag", function (){
      request(app)
        .post('/elements')
        .send({ author: 1, project: 1, type: 'Message', content: 'Hey dude !' })
        .expect('Content-Type', /application\/json/)
        .expect(201)
        .end(function(err, res){
          if (err) throw err;
        });    
  });
});

describe('POST /project/1/documents', function(){
  it("should return code 200 and welcome tag", function (){
      request(app)
        .post('/elements')
        .send({ author: 1, project: 1, type: 'Message', content: 'Hey dude !' })
        .expect('Content-Type', /application\/json/)
        .expect(201)
        .end(function(err, res){
          if (err) throw err;
        });    
  });
});

