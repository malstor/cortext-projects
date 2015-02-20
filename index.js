/**** cortext-projects *****/


//the lines below are a hack to get meteor running without the keepalive option witch tends to exit the process when processor is too busy 
//(see https://github.com/meteor/meteor/issues/2536 for detailed)
//
if (Meteor.isServer) {
  process.argv = _.without(process.argv, '--keepalive');
  Meteor.startup(function () { console.log("LISTENING"); });
}