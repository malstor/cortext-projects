/**
 * cortext projects api - server 
 *
 * @package    cortext-projects
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.2 - 2014
 */

/****** loading config **********/
config = require('nconf');

config.argv()
     .env()
     .file({ file:
       './config.json'
     });

/***** loading app ***********/
var app = require('./app.js');


/******** app start ***********/

app.listen(config.get('app:port'));
d = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '');
console.log('['+d+'] cortext api server - listening on port ' + config.get('app:port'));