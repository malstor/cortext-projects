server = Bones.Server.extend({});

// server.prototype.initialize = function(app){
// 	console.log("hop");

// 	this.all("*", function(req, res, next){
// 		console.log("ping");
// 		next();
// 	});
// }

server.prototype.initialize = function(app) {
    this.use(this.allow.bind(this));
};

server.prototype.allow = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Methods', 'GET');
    next();
};

servers.Middleware.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
		this.all("*", function(req, res, next){
			session = req.session || {};
			next();
		});
    }
});