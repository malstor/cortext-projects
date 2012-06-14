server = Bones.Server.extend({});

// server.prototype.initialize = function(app){
// 	console.log("hop");

// 	this.all("*", function(req, res, next){
// 		console.log("ping");
// 		next();
// 	});
// }

servers.Middleware.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
		this.all("*", function(req, res, next){
			session = req.session;
			next();
		});
    }
});