var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models['user'].secret = function() {
    return Bones.plugin.config.secret;
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

        resp = _.extend(resp, data);
        options.success(resp);
    });
};