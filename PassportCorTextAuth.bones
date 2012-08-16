var passport = require('passport'),
    strategy = require('passport-oauth').OAuthStrategy;

var request = require('request');

server = servers.Passport.extend({
    key: 'oauth',
    strategy: strategy,
       
    verify: function(token, tokenSecret, profile, done) {
        // Temporarily put the oauth details into the user object, to allow us to
        // get them into the session.
        _.extend(profile, { oauth: { token: token, token_secret: tokenSecret } });

        return done(null, profile);
    }

});

server.augment({
    initialize: function(parent, app) {
        this.options.callbackURL = "http://localhost:3000/auth/" + this.key + "/callback";
        parent.call(this, app);

        this.get('/auth/' + this.key + '/callback', 
            passport.authenticate(this.key), function(req, res, next) {
                // add the query parameters to the user object.
                // This should be done by the oauth library, but for some reason
                // it doesn't behave correctly with some variables.
                // see: https://github.com/jaredhanson/passport-oauth/issues/1
                _.extend(req.user, req.query);

                // we don't want the query argument oauth_token
                // in the user record.
                delete req.user.oauth_token;

                // Move the oauth credentials into the session proper,
                // not the user record. This means we can push the
                // user record to the client without leaking secrets.
                req.session.oauth = req.user.oauth;
                delete req.user.oauth;

                // update users

                request.get("http://managerdev.cortext.org/api/users.json",function(error, response, body){
                        var data = JSON.parse(body);

                        db.collection("users", function(error, users){
                            users.remove({});

                            _(data).each(function(user){
                                user.id = parseInt(user.userid);
                                user["keywords"] = [];

                                _([user.email, user.lastname, user.firstname, user.firstname+" "+user.lastname ]).each(function(key){
                                    user["keywords"].push(key);
                                });

                                users.insert(user);
                            });
                        });
                    });

                // SET THE ME
                request({
                    uri: 'http://managerdev.cortext.org/api/user.json',
                    oauth : {
                        consumer_key: 12345,
                        consumer_secret: 67890,
                        token: req.session.oauth.token,
                        token_secret: req.session.oauth.token_secret
                    }
                },function(error, response, body){
                    _.extend(req.user, JSON.parse(body))
                    req.user.id = req.user.userid;
                    req.session.user = new models.user(req.user);

                    res.redirect('/');
                });
            });
    }
});
