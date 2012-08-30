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

    console.log("options:");
    console.log(current_user);

    db.collection("projects_membership", function(error, collection){
        collection.find({ "value.members" : parseInt(current_user) }).toArray(function(error, array){
            if(array.length == 0){
                options.success([]);
                console.log("0");
            } else {
                var in_project = _.pluck(array, "_id");

                var done = _.after(array.length, function(){
                    projects = _.sortBy(projects, function(p){ return -p.get("date_created"); });
                    options.success(projects);                        
                })

                _.each(in_project, function(project_id){
                    var o = {
                        data : options.data,
                        error : function(){},
                        success: function(project){
                            projects.push(project);
                            done();
                        }
                    }

                    var p = new models.Project({ id : project_id });
                    p.fetch(o);
                });

            }
        });
    });
};