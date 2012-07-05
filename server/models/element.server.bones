var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.element.prototype.sync_create = function(method, model, options){
    var resp = {};
    var _this = this;

    if( !(session && session.user) ){
        return options.error("you must be logged in to perform this action.");
    }

    if( session.user.id != model.get("author") ){
        return options.error("hum little prick. you can publish stuff as someone else.");
    }

    db.collection("projects", function(error, projects){
        projects.update({ id : model.get("project")  }, { $set : { date_updated : new Date().getTime() } });
    });

    db.collection("elements", function(error, elements){
        elements.findOne({}, { sort : [[ "id", -1 ]]}, function(error, last){
            model.set({
                id : parseInt(last.id)+1,
                date: new Date().getTime()
            });
            elements.insert(model.toJSON(), function(error, element){
                _this.sync_update_project_counter(element[0]);
                options.success(element);
            });
        });
    });
}

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
    var resp = {id: model.id};

    db.collection("elements",function(error, elements){
        var update = {
            $set : model.changedAttributes()
        }

        console.log(update);

        elements.update({id: model.id}, update, function(error, results){
             options.success( results[0] );
        });
    });
}

models.element.prototype.sync_update_project_counter = function(element){

//    console.log(element);

    var v = {};
    v["value."+element.type] = 1;

    var modifier = { $inc : v };

//    console.log(modifier);

    db.collection('counter_projects_elements', function(error, counters){
        counters.update({ "_id" : parseInt(element.project) }, modifier);
    });
}

models.element.prototype.sync = function(method, model, options) {
    switch(method){
        case "create"   : this.sync_create(method, model, options); break;
        case "read"     : this.sync_read(method, model, options); break;
        case "update"   : this.sync_update(method, model, options); break;
        default : return options.error('Unsupported method');
    }    
};