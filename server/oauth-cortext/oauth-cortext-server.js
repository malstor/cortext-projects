Cortext = {};

// https://developers.cortext.com/accounts/docs/OAuth2Login#userinfocall
Cortext.whitelistedFields = ['id', 'email', 'username', 'name', 'accessToken'];

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
    options: {profile: {name: identity.name, username: identity.username, email: identity.email, id: identity.id, accessToken : accessToken}}
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
      dashboardConfig.services.Identity.urlGrant, {params: {
        code: query.code,
        client_id: config.clientId,
        client_secret: config.secret,
        redirect_uri: dashboardConfig.services.Identity.callback+'/_oauth/cortext?close',
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
      dashboardConfig.services.Identity.urlAccess,
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

Meteor.methods({
  updateProfile: function(force_update){
    console.log ('[profileUpdate] updateProfile called');
    var mUser = Meteor.users.findOne(this.userId);
    var accessToken = mUser.services.cortext.accessToken;
    var email = mUser.services.cortext.email;
    var username = mUser.services.cortext.username;
    var name = mUser.services.cortext.name;
    var id = mUser.services.cortext.id;
    if(force_update)
    {
      //@fixme : this will introduce a potiential difference between service.cortext and profile until the next login
      identity = getIdentity(accessToken);
      console.log ('[profileUpdate] ====> return from getIdentity : ', identity);
      id = identity.id;
      email =  identity.email;
      username = identity.username;
      name = identity.name;

    }

    Meteor.users.update(this.userId, {$set:
      {
        'profile.id' : id,
        'profile.name' : name,
        'profile.email': email,
        'profile.accessToken' : accessToken,
        'profile.username' : username,
        'services.cortext.id' : id,
        'services.cortext.name' : name,
        'services.cortext.email': email,
        'services.cortext.accessToken' : accessToken,
        'services.cortext.username' : username,

      }
    });
    console.log('[profileUpdate] user profile has been updated :', Meteor.users.findOne(this.userId));
  }
});