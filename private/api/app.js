/**
 * cortext projects api - application
 *
 * @package    cortext-projects
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.1 - 2013
 */


/******** initialization *********/
//express initialization - handle request/response
var express = require('express');
var app = express();

//cortext api methods
var api = require('./lib/api.js');

/****** app config ***********/
app.use(express.bodyParser());

/********Routes**************/

// /
app.get('/', api.welcome);

//elements
app.get('/elements', api.getElements);
app.get('/elements/:id', api.getOneElement);
app.post('/elements', api.createElement);

//documents (element type = document)
app.get('/documents/:id', api.getOneDocument);
app.post('/documents', api.createDocument);

//analysis
app.get('/analysis/:id', api.getOneAnalysis);
app.post('/analysis', api.createAnalysis);

/******** app start ***********/

app.listen(8080);
console.log('cortext api server - listening on port 8080');