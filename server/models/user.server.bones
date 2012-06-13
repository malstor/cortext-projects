var fs = require('fs');
var crypto = require('crypto');

var path = require('path');

var yaml = require('pyyaml');

models['user'].secret = function() {
    return Bones.plugin.config.secret;
};

function get_gravatar_hash(email){
    var email = email.toLowerCase();

    return crypto.createHash('md5').update(email).digest("hex");
};

models.user.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

    var user_dir = '../data/users/' + model.id,
        resp = {id: model.id};

    yaml.load(user_dir+".yaml", function(error, data){
        if (error) {
            console.log("[error][user: "+model.id+"] yaml not found");
            return options.error("user not found");
        }

        console.log("[user: "+model.id+"] loading data from yaml");
        model.password = data.password;

        delete data.password;

        data.gravatar = "http://www.gravatar.com/avatar/"+get_gravatar_hash(data.email);

        resp = _.extend(resp, data);
        options.success(resp);
    });
};

models.user.prototype.fetch_projects = function(callback){
    console.log("#fetch_projects");

    var user = this;

    var options = {
        url: new models.projects().url(),
        data: {
            user_id : this.id
        },
        success: function(evt){
            callback();
        }
    }

    this.projects = new models.projects();
    this.projects.fetch(options);
}