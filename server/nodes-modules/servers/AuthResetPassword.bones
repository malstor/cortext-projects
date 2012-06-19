var email = require('email'),
    crypto = require('crypto'),
    fs = require('fs'),
    Buffer = require('buffer').Buffer;

servers.Auth.augment({
    initialize: function(parent, app, args) {
        parent.call(this, app, args);

        // Conditionally add the recaptcha test. This has to be injected at this point and there
        // is no clean way to augment or extend the middleware or auth servers to accomplish this
        // otherwise.
        if (servers.ReCaptcha) {
            this.post('/api/reset-password/:id', servers.ReCaptcha.verifyReCaptcha);
        }

        this.get('/reset-password/*', this.tokenLogin.bind(this), this.resetPassword.bind(this));
        this.post('/api/reset-password/:id', this.authEmail.bind(this));
    }
});

// Turn a string into a base64 token encrypted with the secret and with a
// message digest based on the salt.
servers.Auth.prototype.encryptExpiringRequest = function(data, secret, salt) {
    data = new Buffer(JSON.stringify(data), 'utf8').toString('binary');
    var cipher = crypto.createCipher('aes-256-cfb', secret);
    var timestamp = (Date.now() / 1000).toFixed();
    while (timestamp.length < 10) timestamp = '0' + timestamp;
    var hash = crypto.createHash('sha256').update(salt).update(timestamp).update(data).digest('binary');
    var request = cipher.update(hash, 'binary', 'binary') +
                  cipher.update(timestamp, 'binary', 'binary') +
                  cipher.update(data, 'binary', 'binary') +
                  cipher['final']('binary');
    return new Buffer(request, 'binary').toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
};

// Decrypt a token.
servers.Auth.prototype.decryptExpiringRequest = function(data, secret, maxAge) {
    if (typeof maxAge === 'undefined') maxAge = 86400;
    var decipher = crypto.createDecipher('aes-256-cfb', secret);
    var request = decipher.update(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64', 'binary')
        + decipher['final']('binary');
    var timestamp = parseInt(request.substring(32, 42), 10) || -1;
    var result = { request: request, generated: timestamp };
    if ((Date.now() / 1000).toFixed() > (timestamp + maxAge)) return result;
    try { result.data = JSON.parse(new Buffer(request.substring(42), 'binary').toString('utf8')); }
    catch (err) {}
    return result;
};

// Verify authenticity of a decrypted request.
servers.Auth.prototype.verifyExpiringRequest = function(message, salt) {
    var hash = crypto.createHash('sha256').update(salt).update(message.request.substring(32));
    return hash.digest('binary') === message.request.substring(0, 32);
};

// Generate a new session for the user identified by the token.
servers.Auth.prototype.tokenLogin = function(req, res, next) {
    var secret = this.args.model.secret();
    var message = this.decryptExpiringRequest(req.params[0], secret,
        Bones.plugin.config.passwordResetTimeout);

    if (message.data) {
        // Obtain salt for user.
        new this.args.model({ id: message.data }, req.query).fetch({
            success: function(model, resp) {
                var salt = model.password;
                if (this.verifyExpiringRequest(message, salt)) {
                    req.user = model;
                    next();
                } else {
                    next(new Error.HTTP('Invalid login token', 403));
                }
            }.bind(this),
            error: function() {
                next(new Error.HTTP('Invalid login token', 403));
            }
        });
    } else {
        next(new Error.HTTP('Invalid login token', 403));
    }
};

servers.Auth.prototype.resetPassword = function(req, res, next) {
    var auth = this;
    this.session(req, res, function() {
        // Set the password to a random unguessable value to
        // prevent multiple logins with the same token.
        req.user.save({
            password: crypto.createHash('sha256')
                .update(req.user.password).update('' + Math.random())
                .digest('hex')
        }, {
            success: function() {
                // Set a stub cookie that can also be read via HTTP
                // (The session cookie might not). Aids in nginx configuration.
                res.cookie(auth.args.stubKey, 'yes', auth.args.stubCookie);

                req.session.regenerate(function() {
                    req.session.user = req.user;
                    req.session.user.authenticated = true;

                    // Applications should bind on /reset-password/* and redirect
                    // to the path of their choice.
                    next();
                });
            },
            error: function() {
                next(new Error.HTTP(500));
            }
        });
    });
};

// Generate an email object with a login token.
servers.Auth.prototype.generateEmail = function(model, req, options) {
    var options = options || {};
    var secret = model.constructor.secret();
    var salt = model.password;
    var token = this.encryptExpiringRequest(model.id, secret, salt);

    var subject = options.subject || Bones.plugin.config.passwordResetSubject;
    var body = options.resetPasswordEmailTemplate ? options.resetPasswordEmailTemplate({ token: token, host: req.headers.host })
        : templates.ResetPasswordEmail({ token: token, host: req.headers.host });
    var altText = options.resetPasswordEmailAltTemplate ? options.resetPasswordEmailAltTemplate({ token: token, host: req.headers.host })
        : templates.ResetPasswordEmailAlt({ token: token, host: req.headers.host });


    var mail = new email.Email({
        from: Bones.plugin.config.adminEmail,
        to: '<' + model.get('email') + '>',
        bodyType: 'html',
        subject: subject,
        body: body,
        altText: altText
    });

    return mail;
};

// Send an email to the user containing a login link with a token.
servers.Auth.prototype.authEmail = function(req, res, next) {
    new this.args.model({ id: req.params.id }, req.query).fetch({
        success: function(model, resp) {
            if (!model.get('email') || !email.isValidAddress(model.get('email'))) {
                next(new Error.HTTP('Invalid email address', 409));
            } else {
                this.generateEmail(model, req).send(function(err) {
                    if (err) {
                        next(new Error.HTTP('Could not send email. Contact your administrator.'), 500);
                    } else {
                        res.send({ message: 'Email has been sent' });
                    }
                });
            }
        }.bind(this),
        error: function() {
            next(new Error.HTTP(403));
        }
    });
};
