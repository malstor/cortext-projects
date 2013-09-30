Cortext = {};

// https://developers.cortext.com/accounts/docs/OAuth2Login#userinfocall
Cortext.whitelistedFields = ['id', 'email', 'username', 'name'];

Oauth.registerService('cortext', 2, null, function(query) {

  console.log("[oauth] getting access token from service");
  var response = getTokens(query);
  console.log("[oauth] grant response : ", response);
  var accessToken = response.accessToken;
  console.log("[oauth] accessToken received: ", accessToken);
  var identity = getIdentity(accessToken);
  console.log("[oauth] received user credentials: ", identity);

  var serviceData = {
    accessToken: accessToken,
    expiresAt: (+new Date) + (1000 * response.expiresIn)
  };

  var fields = _.pick(identity, Cortext.whitelistedFields);
  _.extend(serviceData, fields);

  // only set the token in serviceData if it's there. this ensures
  // that we don't lose old ones (since we only get this on the first
  // log in attempt)
  if (response.refreshToken)
    serviceData.refreshToken = response.refreshToken;
  
  var serviceObject = {
    serviceData: serviceData,
    options: {profile: {name: identity.name, username: identity.username, email: identity.email, id: identity.id}}
  };
  console.log("[oauth] id complete, returning service object", serviceObject);
  return serviceObject;
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
// - refreshToken, if this is the first authorization request
var getTokens = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'cortext'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var response;
  console.log("[oauth] get access token with query and config:", query, config);
  try {
    response = HTTP.post(
      dashboardConfig.services.Identity.urlAuth+"/grant", {params: {
        code: query.code,
        client_id: config.clientId,
        client_secret: config.secret,
        redirect_uri: Meteor.absoluteUrl("_oauth/cortext?close"),
        grant_type: 'authorization_code'
      }});
    console.log("[oauth] response from grant request : ", response);
  } catch (err) {
    console.log("[oauth] Failed to complete OAuth handshake with Cortext." + err.message, err.response);
    throw _.extend(new Error("Failed to complete OAuth handshake with Cortext. " + err.message),
                   {response: err.response});
  }
  var datas = JSON.parse(response.content);
  if(datas)
  {
      return {
      accessToken: datas.access_token,
      refreshToken: datas.refresh_token,
      expiresIn: datas.expires_in
    };
  }
  else{
    console.log("[oauth] error retrieving accessToken :", response);
  }  
};

var getIdentity = function (accessToken) {
  try {
    var response = HTTP.get(
      dashboardConfig.services.Identity.urlAuth+"/access",
      {params: {access_token: accessToken}});
    console.log('[auth] response from access request ', response);
    return JSON.parse(response.content);
  } catch (err) {
    console.log('[auth] response from access request ', response);
    throw _.extend(new Error("Failed to fetch identity from Cortext. " + err.message),
                   {response: err.response});
  }
};


Cortext.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};