var MongoStore = require('connect-mongo')(middleware);

var request = require('request');

servers.Middleware.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        // session support is required, and is the responsibility
        // of your application to enable.
        this.use(middleware.session({
        	secret: Bones.plugin.config.secret,
	        store : new MongoStore({
	            db  : "sessions",
	            host: "localhost"
	        })
        }));

        this.use(new servers.oauth(app));
    }
})

