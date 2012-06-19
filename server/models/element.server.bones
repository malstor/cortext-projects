var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');


models.element.prototype.sync_read = function(method, model, options){
    var projectDir = '../data/elements/' + model.id,
        resp = {id: model.id};

    yaml.load(projectDir+".yaml", function(error, data){
        if (error) {
            console.log("[error][element: "+model.id+"] yaml not found");
            return options.error("project not found");
        }

        console.log("[element: "+model.id+"] loading data from yaml");

        resp = _.extend(resp, data);
        options.success(resp);
    });
}

models.element.prototype.sync = function(method, model, options) {
    switch(method){
        case "read": this.sync_read(method, model, options); break;
        default : return options.error('Unsupported method');
    }    
};