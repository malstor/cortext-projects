Cortext = {};

// Request Cortext credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Cortext.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'cortext'});
  if (!config) {
    console.log("[oauth] Warning : no config found for cortext !");
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();

  // var requiredScope = ['http://oauth.dev/auth/access'];
  // var scope = ['http://oauth.dev/auth/access'];
  // if (options.requestPermissions)
  //   scope = options.requestPermissions;
  // scope = _.union(scope, requiredScope);
  // var flatScope = _.map(scope, encodeURIComponent).join('+');

  console.log("[oauth] open popup with credentialToken :",credentialToken);
  var loginUrl =
        dashboardConfig.services.Identity.urlAuth+'/authorize' +
        '?response_type=code' +
        '&state=' + credentialToken +
        '&client_id=' + config.clientId +
        '&redirect_uri=' + dashboardConfig.services.Identity.callback+'/_oauth/cortext?close';
        
  Oauth.initiateLogin(credentialToken,
                      loginUrl,
                      credentialRequestCompleteCallback,
                      { height: 700, width: 1400 });
};