server = Bones.Server.extend({});

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
		    res.header('Access-Control-Allow-Origin', '*');
		    res.header('Access-Control-Allow-Methods', '*');

			session = req.session || {};
			next();
		});
    }
});