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
    console.log("haha");
        this.extra_routes(app);
}

server.prototype.extra_routes = function(app){
    console.log("*** extra api modules ***");

    this.get('/api/Project/:project/members/propose', this.api_project_members_propose);

    this.post('/api/Project/:project/member', this.api_project_member);
    this.post('/api/element/:element/status', this.api_element_status);
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

server.prototype.api_element_status = function(req, res, next){
    var element_id = req.params.element;

    var e = new models.Elements({ id : element_id });
    e.save({ body : req.body }, {
        success: function(model, resp) {
            res.send(resp, headers);
        },
        error: function(model, err) {
            err = err instanceof Object ? err.toString() : err;
            next(new Error.HTTP(err, 409));
        }
    });
}