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

    	    console.log(req.body);
		
		    var p = new models.Project({ id : project_id });
		    p.add_member(user_id);

		    // CLEANME je suis pas propre !
			res.send({}, headers);

		    console.log("<api");
    	});
    }
});