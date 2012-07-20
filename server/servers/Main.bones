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


servers.Middleware.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
		this.all("*", function(req, res, next){
//			console.log("hoho");
		    res.header('Access-Control-Allow-Origin', '*');
		    res.header('Access-Control-Allow-Methods', '*');

			session = req.session || {};
			next();
		});
    }
});

servers.Route.augment({
    initialize: function(parent, app) {
        parent.call(this, app);

        this.initialize_api_extra(app);
    },
    initialize_api_extra: function(app){
    	console.log("*** extra api modules ***");

    	this.post('/api/Project/:project/member', function(req, res){
    		var project_id = req.params.project;
    		var user_id = req.body.user_id;

    	    console.log("api>");

		    var p = new models.Project({ id : project_id });
		    p.add_member(user_id);

		    // FIXME je suis pas propre !
			res.send({}, headers);

		    console.log("<api");
    	});

        this.get('/api/Project/:project/members/propose', function(req, res){
            var project_id = req.params.project;

            db.collection("projects_membership", function(error, memberships){
                memberships.findOne({ _id : parseInt(project_id) }, function(error, membership){
                    db.collection("users", function(error, users){
                        var q = {
                            keywords : req.query.query,
                            id : { "$nin" : membership["value"]["members"] }
                        };

                        users.find(q).toArray(function(error, matches){
                            res.send(matches, headers);
                        });
                    });
                });
            });
        });

        this.post('/api/element/:element/status', function(req, res){
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
        });
    }
});