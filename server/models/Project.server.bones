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

models.Project.prototype.add_document = function(data, cb){
    var _this = this;

    db.collection("elements", function(error,elements){
        var element = new models.element({
            project: parseInt(_this.id),
            type: "Image"       
        });

        element.set(data)

        element.save({
            error : function(){},
            success : function(model, response){
                cb(model);
            }
        });
    });
}

models.Project.prototype.get_members = function(cb){
    var _this = this;

    db.collection("projects_membership", function(error, collection){
        collection.findOne({ _id: parseInt(_this.id) }, function(error,r){
            db.collection("users", function(error, collection){
                collection.find({ id: { "$in": r.value.members } }).toArray(function(error, array){

                    // FIXME : name should be processed once and for all or at least not here

                    _(array).each(function(item){
                        if(item.firstname == null && item.lastname == null){
                            item.name = item.email;
                        }
                        else if (item.firstname == null ){
                            item.name == item.lastname;
                        }
                        else if (item.lastname == null ){
                            item.name == item.firstname;
                        }
                        else item.name = item.firstname+" "+item.lastname;
                    });

                    cb(array);
                });
            });
        });
    });
}

models.Project.prototype.add_member = function(user_id){
    var _this = this;

    db.collection("projects_membership", function(error, collection){
        collection.update({ _id: parseInt(_this.id) }, { "$addToSet" : { "value.members" : user_id }} ,function(error,r){
            console.log(r);
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

                    if(!_.isObject(m.participation)){
                        u[m.id] = m;
                        m.participation = {};
                        m.participation.Others = s;
                    };

                    m.participation[e.type] = ( m.participation[e.type] ? m.participation[e.type] + 1 : 1);
                    m.participation.Others = m.participation.Others - 1;
                });

                var no_activity = _.difference(members, u);

                // console.log(no_activity);

                _.each(no_activity, function(member){
                    u[member.id] = member;
                    member.participation = {};
                    member.participation.Others = s;
                });

                project.members = u;

                resp = _.extend(resp, project);
                options.success(resp);                   
            });
        });
    });
}



models.Project.prototype.sync_create = function(method, model, options){
    var _this = this;

    if( !(session && session.user) ){
        return options.error("you must be logged in to perform this action.");
    }

    db.collection("projects", function(error, projects){
        projects.findOne({}, { sort : [[ "id", -1 ]]  }, function(error, last){

            model.set({
                id: parseInt(last.id)+1,
                date_created : new Date().getTime(),
                date_updated : new Date().getTime()
            });

            projects.insert(model.toJSON(), function(error, new_project){
                db.collection("projects_membership", function(error,collection){
                    collection.insert({ _id : new_project[0]["id"], value : { members : [ session.user.id ] } });
                });

                db.collection("counter_projects_elements", function(error,collection){
                    collection.insert({ _id : new_project[0]["id"], "value" : { Message:0, Analysis:0, Image:0 } });
                });

                options.success(new_project[0]);
            });

        });
    });
}

models.Project.prototype.sync = function(method, model, options) {
    switch(method){
        case "create"   : this.sync_create(method, model, options); break;
        case "read"     : this.sync_read(method, model, options); break;
        default         : return options.error('Unsupported method');
    }   
};