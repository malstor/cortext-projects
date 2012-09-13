var MongoStore = require('connect-mongo')(middleware);

var request = require('request');

servers.Middleware.augment({
    initialize: function(parent, app) {
        this.use(middleware.sanitizeHost(app));
        this.use(middleware.bodyParser());
        this.use(middleware.cookieParser());
//        this.use(middleware.validateCSRFToken());
        this.use(middleware.fragmentRedirect());

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

