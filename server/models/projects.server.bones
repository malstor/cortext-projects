var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.projects.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

    // if(_.isUndefined(session.user)) return options.error('You need to be authenticated');

    var projectDir = '../data/projects/',
        resp = {};

    var projects = [];

    var files = fs.readdirSync(projectDir);

//    console.log(session);

    var load_defer = _.after(files.length, function(){
        options.success(projects);
    });

    var filter_user = options.user_id || session.user.id;

    _.each(files, function(file){
        yaml.load(projectDir+file, function(error, data){
            if(error) console.log(error)

            if(_.find(data.members, function(m){ return m.id === filter_user })){
//            if(true){
                data.elements = data.elements.slice(0,14);

                data.composition = {
                    Message: 0,
                    Image: 0,
                    Analysis: 0
                };

                data.composition = _.reduce(data.elements,
                    function(m, e){
                        m[e.type] = parseInt(m[e.type]) + 1;
                        return m;
                    }, data.composition);

                projects.push(data);
            } else {
                console.log("access not granted");
            }
            load_defer();
        });
    });
};