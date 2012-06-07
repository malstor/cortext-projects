var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.projects.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

    var projectDir = '../data/projects/',
        resp = {};

    var projects = [];

    var files = fs.readdirSync(projectDir);

    var load_defer = _.after(files.length, function(){
        options.success(projects);
    });
    _.each(files, function(file){
        yaml.load(projectDir+file, function(error, data){
            if(error) console.log(error)

            projects.push(data.info);
            load_defer();
        });
    });
};