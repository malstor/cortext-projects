var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.projects.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

    var projectDir = '../data/projects/',
        resp = {};

    var projects = [];

    var files = fs.readdirSync(projectDir);

    function fetch_next(current){
        yaml.load(projectDir+files[current], function(error, data){
            // ): chemo !
            if (current > files.length - 1){
                options.success(projects);
            } else {
                // console.log(error);
                // console.log(current);
                projects.push(data.info);
                fetch_next(current+1);
            }
        });
    }

    fetch_next(0);
};