var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.projects.prototype.sync = function(method, model, options) {
    if (method != 'read') return options.error('Unsupported method');

//    if(_.isUndefined(session.user)) return options.error('You need to be authenticated');

    options.data = options.data || {};

    var resp = {};

    var projects = [];

    var current_user = options.data.user_id || session.user.id;

    db.collection("projects_membership", function(error, collection){
        collection.find({ "value.members" : current_user }).toArray(function(error, array){
            var in_project = _.pluck(array, "_id");

            db.collection("projects", function(error, collection){
                collection.find({ "id" : { "$in" : in_project } }).toArray(function(error, array){
//                    console.log(array);

                    var done = _.after(array.length, function(){
                        options.success(projects);                        
                    })

                    _.each(array, function(project){
                        db.collection("elements", function(error, elements){
                            var options = {
                                limit : 10
                            }

                            elements.find({ project : parseInt(project.id) }, options).toArray(function(error, element){
                                console.log(error);
                                project.elements = element;

                                db.collection("counter_projects_elements", function(e,c){
                                    c.findOne({ _id: project.id }, function(e, item){
                                       project.composition = item.value;
                                       projects.push(project);
                                       done();
                                    });
                                });
                            });
                        });                    
                    });
                });
            });
        });
    });
};