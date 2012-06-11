var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.projects.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

    var projectDir = '../data/projects/',
        resp = {};

    var projects = [];

    var files = fs.readdirSync(projectDir);

//    console.log(session);

    var load_defer = _.after(files.length, function(){
        options.success(projects);
    });

    _.each(files, function(file){
        yaml.load(projectDir+file, function(error, data){
            if(error) console.log(error)

            if(!_.isUndefined(session.user) && _.find(data.members, function(m){ return m.id === session.user.id })){
//            if(true){
                data.elements = data.elements.slice(0,14);

                data.composition = {
                        Message: 0,
                        Image: 0,
                        Analysis: 0
                    };

                data.composition = _.reduce(data.elements,
                    function(m, e){
                        // console.log(e.type);
                        // console.log(m[e.type]);

                        m[e.type] = parseInt(m[e.type]) + 1;

                        return m;
                    }, data.composition);

                console.log(data.composition);
                projects.push(data);
            } else {
                console.log("access not granted");
            }
            load_defer();
        });
    });
};