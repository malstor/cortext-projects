server = Bones.Server.extend({});

var headers = { 'Content-Type': 'application/json' };

// server.prototype.initialize = function(app){
// 	console.log("hop");

// 	this.all("*", function(req, res, next){
// 		console.log("ping");
// 		next();
// 	});
// }

// servers.Core.augment({
// 	initialize: function(parent, app) {
//         parent.call(this, app);
// 	    this.use(this.allow.bind(this));
// 	},
// 	allow: function(req, res, next) {

// 		console.log("open the gate !");

// 	    res.header('Access-Control-Allow-Origin', '*');
// 	    res.header('Access-Control-Allow-Methods', '*');
// 	    next();
// 	}
// });

servers.Core.augment({
    initialize : function(parent, app){
        parent.call(this, app);

        this.use(new servers.Main(app));
    }
});


servers.Middleware.augment({
    initialize: function(parent, app) {

        parent.call(this, app);
		this.all("*", function(req, res, next){
//			console.log("hoho");
		    res.header('Access-Control-Allow-Origin', '*');
		    res.header('Access-Control-Allow-Methods', '*');
			next();
		});
    }
});

// servers.Route.augment({
//     initialize: function(parent, app) {
//         parent.call(this, app);
//     },
//     initialize_api_extra: function(app){
// });

server.prototype.initialize = function(app){
    this.extra_routes(app);
}

server.prototype.extra_routes = function(app){
    console.log("*** extra api modules ***");

    this.get('/api/Project/:project/members/propose', this.api_project_members_propose);

    this.post('/api/Project/:project/document', this.api_project_document);
    this.post('/api/Project/:project/analysis', this.api_project_analysis);
    this.post('/api/Project/:project/member', this.api_project_member);

    this.post('/api/analysis/:analysis/status', this.api_analysis_status);
}

server.prototype.api_project_document = function(req, res, next){
    if(!req.body){
        res.send(500, { error : 'invalid element' });
    } else {
        var project = new models.Project( { id : req.params.project } );
        project.add_document( req.body, function(element){
            res.send(element, headers);
        });
    }

}
server.prototype.api_project_analysis = function(req, res, next){
    if(!req.body){
        res.send(500, { error : 'invalid element' });
    } else {
        var project = new models.Project( { id : parseInt(req.params.project) } );
        project.add_analysis( req.body, function(element){
            res.send(element, headers);
        });
    }
}

server.prototype.api_project_member = function(req, res, next){
    var project_id = req.params.project;
    var user_id = req.body.user_id;

    var p = new models.Project({ id : project_id });
    p.add_member(user_id);

    // FIXME je suis pas propre !
    res.send({}, headers);
}

server.prototype.api_project_members_propose = function(req, res, next){
    var project_id = req.params.project;

    db.collection("projects_membership", function(error, memberships){
        memberships.findOne({ _id : parseInt(project_id) }, function(error, membership){
            db.collection("users", function(error, users){
                var q = {
                    keywords : { $regex: req.query.query },
                    id : { "$nin" : membership["value"]["members"] }
                };

                users.find(q).toArray(function(error, matches){
                    res.send(matches, headers);
                });
            });
        });
    });
}

server.prototype.api_analysis_status = function(req, res, next){
    var analysis_id = req.params.analysis;

    var e = new models.element({ id : parseInt(analysis_id) });

    e.update_content( req.body, function(element){
        console.log(element);

        res.send(element, headers);
    } );

}