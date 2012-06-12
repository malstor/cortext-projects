var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');


models.Project.prototype.sync_read = function(method, model, options){
    var projectDir = '../data/projects/' + model.id,
        resp = {id: model.id};

    yaml.load(projectDir+".yaml", function(error, data){
        if (error) {
            console.log("[error][project: "+model.id+"] yaml not found");
            return options.error("project not found");
        }

        console.log("[project: "+model.id+"] loading data from yaml");

        var u = {};
        var s = _.size(data.elements);

        // processing user data
        _.each(data.elements, function(e){
            var m = _.find(data.members, function(m){ return m.id == e.author.id; });

            if(!_.isObject(m.participation)){
                u[m.id] = m;
                m.participation = {};
                m.participation.Others = s;
            };

            m.participation[e.type] = ( m.participation[e.type] ? m.participation[e.type] + 1 : 1);
            m.participation.Others = m.participation.Others - 1;
        });

        data.members = u;

        resp = _.extend(resp, data);
        options.success(resp);
    });
}

models.Project.prototype.sync = function(method, model, options) {
    switch(method){
        case "read": this.sync_read(method, model, options); break;
        default : return options.error('Unsupported method');
    }
    
};