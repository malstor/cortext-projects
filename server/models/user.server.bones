var fs = require('fs');
var crypto = require('crypto');

var path = require('path');

var yaml = require('pyyaml');

models['user'].secret = function() {
    return Bones.plugin.config.secret;
};

models['user'].prototype.app_secret = function() {
    return Bones.plugin.config.secret+"_app_1";
};

models['user'].prototype.hash_app = function(string) {
    return crypto.createHmac('sha256', this.app_secret()).update(string).digest('hex');
};

models['user'].prototype.is_app_auth_ok = function(string) {
    return this.hash_app(this.password.slice(0,8)) === string;
};

function get_gravatar_hash(email){
    var email = email.toLowerCase();

    return crypto.createHash('md5').update(email).digest("hex");
};

models.user.prototype.load = function(cb){
    var _this = this;

    db.collection("users", function(error, users){
        users.findOne({ id: parseInt(_this.id) }, function(error, user){
            if (error) {
                console.log("[user] ERROR user #"+_this.id+"does not exist");
                return options.error("user not found");
            }

            cb(user);
        });
    });
}

models.user.prototype.get_projects = function(callback){
    var _this = this;

    db.collection("projects_membership", function(error, memberships){
        memberships.find({ "value.members" : parseInt(_this.id) }).toArray(function(error, projects){
            callback( _.pluck(projects, "_id") );
        });
    });
}

models.user.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

    var resp = {id: model.id};

    var _this = this;

    this.load(function(user){
        user.gravatar = "http://www.gravatar.com/avatar/"+get_gravatar_hash(user.email);

        user.app = {
            key: model.hash_app(user.password.slice(0,8)),
            url: "http://88.191.67.92:8080/login"
        }
        delete user.password;

        resp = _.extend(resp, user);

        _this.get_projects(function(projects){
            resp.projects = projects;
            options.success(resp);       
        });
    });
};

models.user.prototype.fetch_projects = function(callback){
    console.log("[user]#fetch_projects");

    var user = this;

    var options = {
        url: new models.projects().url(),
        data: {
            user_id : this.id
        },
        success: function(event){
            user.trigger("fetch:projects");
            callback(); 
        }
    }

    this.projects = new models.projects();
    this.projects.fetch(options);
}