var fs = require('fs');
var path = require('path');

var yaml = require('pyyaml');

models.Project.prototype.get_elements = function(cb){
    var _this = this;

   db.collection("elements", function(error, elements){
        var options = {
            sort : [[ "date" , -1 ]]
        }

        elements.find({ project : parseInt(_this.id) }, options).toArray(function(error, elements){
            cb(elements);
        });
    });
}

models.Project.prototype.get_members = function(cb){
    var _this = this;

    db.collection("projects_membership", function(error, collection){
        collection.findOne({ _id: parseInt(_this.id) }, function(error,r){
            db.collection("users", function(error, collection){
                collection.find({ id: { "$in": r.value.members } }).toArray(function(error, array){
                    cb(array);
                });
            });
        });
    });
}

models.Project.prototype.get_composition = function(cb){
    var _this = this;

    db.collection("counter_projects_elements", function(e,c){
        c.findOne({ _id: parseInt(_this.id) }, function(e, item){
           cb(item.value);
        });
    });
}

models.Project.prototype.sync_read = function(method, model, options){
    var _this = this;
    var resp = {id: model.id}; 
    var project = resp;


    db.collection("projects", function(error, projects){
        projects.findOne({ id : parseInt(_this.id) }, function(error, proj){
            project = _.extend(project, proj);
        });
    });

    _this.get_elements(function(elements){
        project.elements = elements;

        _this.get_composition(function(composition){
            project.composition = composition;

            var u = {};
            var s = _.size(project.elements);

            _this.get_members(function(members){
                project.members = members;

                // console.log(members);

                // processing user data
                _.each(project.elements, function(e){
                    var m = _.find(project.members, function(m){ return m.id == e.author; });

                    console.log(e);

                    if(!_.isObject(m.participation)){
                        u[m.id] = m;
                        m.participation = {};
                        m.participation.Others = s;
                    };

                    m.participation[e.type] = ( m.participation[e.type] ? m.participation[e.type] + 1 : 1);
                    m.participation.Others = m.participation.Others - 1;
                });

                project.members = u;

                resp = _.extend(resp, project);
                options.success(resp);                   
            });
        });
    });
}

models.Project.prototype.sync = function(method, model, options) {
    switch(method){
        case "read": this.sync_read(method, model, options); break;
        default : return options.error('Unsupported method');
    }
    
};