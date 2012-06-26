bones  = require('bones');
marked = require('marked');
moment = require('moment');

mongo 	= require('mongodb');
Server 	= mongo.Server;
Db 		= mongo.Db;

//server 	= new Server('88.191.67.92', 27017, {auto_reconnect: true});
server 	= new Server('localhost', 27017, {auto_reconnect: true});
db 		= new Db('projects', server);

bones.plugin.config.secret = '4b6be4b408195388def323740e7cc20053fa6f57f46faf57816a99ae2a257af2';

require('bones-auth');

require('./views/Main');

bones.load(__dirname);

session = {};
request = {};

if (!module.parent) {
    bones.start();
}