var Db, Server, db, mongo, server, _;
mongo = require('mongodb');

Server = mongo.Server;

Db = mongo.Db;

server = new Server('localhost', 3002, {
  auto_reconnect: true
});

db = new Db('meteor', server);

_ = require("underscore");

var express = require('express');
var app = express();
var api = require('./lib/db.js');


/********Routes**************/
app.get('/', function(req, res){
    res.send('cortext api - welcome');
});

app.get('/elements', function(req, res){
    console.log('--> [GET] /elements/');
    api.sendAll('elements', {}, {}, res, db);
});

app.get('/elements/:id', function(req, res){
    console.log('--> [GET] /elements/'+req.params.id);
    api.sendItem('elements', {id: parseInt(req.params.id)}, res, db);
});

/******** app start ***********/

app.listen(8080);
console.log('server listening on 8080');