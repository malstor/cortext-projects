var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.Project.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

    var projectDir = '../data/projects/' + model.id,
        resp = {id: model.id};

    yaml.load(projectDir+".yaml", function(error, data){
        if (error) {
            console.log("[error][project: "+model.id+"] yaml not found");
            return options.error("project not found");
        }

        console.log("[project: "+model.id+"] loading data from yaml");

        resp = _.extend(resp, data);
        options.success(resp);

        // console.log(model);
        // console.log(options);
        // console.log(data);
    });
};