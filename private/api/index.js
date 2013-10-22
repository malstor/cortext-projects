/**
 * cortext projects api - server 
 *
 * @package    cortext-projects
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.1 - 2013
 */
var app = require('./app.js')

/******** app start ***********/

app.listen(8080);
console.log('cortext api server - listening on port 8080');