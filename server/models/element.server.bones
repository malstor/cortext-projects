var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');


models.element.prototype.sync_read = function(method, model, options){
    var resp = {id: model.id};

    db.collection("elements",function(error, collection){
//        console.log(error);

        collection.findOne({ "id" : parseInt(model.id) }, function(e, item){
//            console.log(e);
            console.log("[db]READ [element: "+model.id+"]");

            resp = _.extend(resp, item);
            options.success(resp);
        });
    });
}

models.element.prototype.sync_update = function(method, model, options){
    var resp = {};

    db.collection("elements", function(error, elements){
        elements.insert(model.toJSON(), function(error, element){
            options.success(element);
        });   
    });
}

models.element.prototype.sync = function(method, model, options) {
    switch(method){
        case "read": this.sync_read(method, model, options); break;
        case "create": this.sync_update(method, model, options); break;
        default : return options.error('Unsupported method');
    }    
};