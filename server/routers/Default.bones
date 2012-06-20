router = Backbone.Router.extend({
    routes: {
		'/'                                     : 'home',
        '/dashboard'                            : 'dashboard',
        '/login'                                : 'login',
        '/user/:user'                           : 'user',
        '/project/:project'                     : 'project',
        '/api/user/:user/projects'              : "user_projects",
        '/element/:type/:element/in/:project'   : 'element',
        '/element/:type/:element'               : 'element'
    },
    home: function() {
    	var router = this;
    	router.send(views.Home, {});
    },

    dashboard: function() {
        var router = this,
            fetcher = this.fetcher(),
            projects = new models.projects();

        if(_.isUndefined(session.user)){
//            return this.res.redirect("/");
            return router.error({ status: 401, message: "you need to be logged to access this page" });
        }

        fetcher.push(projects);
        fetcher.fetch(function(error){
            if (error) return router.error(error);
            // console.log(projects);
            router.send(views.Dashboard, { projects : projects });
        });
    },

    login: function() {
        var router = this;

        if(this.req.query.app_key){
            var q = this.req.query;
            var user = new models.user({ id : q.user });

            var f = this.fetcher();
            f.push(user);
            f.fetch(function(){
            
                if(user.is_app_auth_ok(q.app_key)){
                    router.req.session.user = user;
                    router.req.session.user.authenticated = true;
                    console.log("ok billy");
                }

                router.send(views.login_app, { model : user });
            });
        } else {
           router.send(views.Login, {});
        }
    },

    project: function(project_id){
        var router = this,
            fetcher = this.fetcher(),
            project = new models.Project({id: project_id});

        fetcher.push(project);
        
        fetcher.fetch(function(err) {
            if (err) return router.error(err);
            router.send(views.Project, { model : project });
        });
    },

    user: function(user_id){
        var router = this,
            fetcher = this.fetcher(),
            user = new models.user({id: user_id});

        fetcher.push(user);
        
        fetcher.fetch(function(err) {
            if (err) return router.error(err);
            router.send(views.user, { model : user });
        });

        console.log(user_id);
    },

    element: function(type, element, project){
        var router = this;
        var fetcher = this.fetcher();
        var element = new models.element({id: element});

console.log(element);
        fetcher.push(element);

        if(project){
           project = new models.Project({id: project});
           fetcher.push(project);
        }

        fetcher.fetch(function(err) {
            if (err) return router.error(err);

            if(project) element.show_in(project);

            router.send(views.element, { model : element });
        });
    },

    send: function(view) {
        var options = (arguments.length > 1 ? arguments[1] : {});
        var v = new view(options);

        document.title = this.pageTitle(v);
    },

    pageTitle: function(v){
    	var t = "projects.cortext";

        return (v.pageTitle ? t+": "+v.pageTitle : t);
    },

    error: function(error) {
    	this.send(views.Error, _.isArray(error) ? error.shift() : error);
    },

    path : function(model){
        var p = [];

        if(model) p = model.get_path();

        return p;
    },

    fetcher: function() {
        var models = [];

        return {
            push: function(item) { models.push(item) },
            fetch: function(callback) {
                if (!models.length) return callback();
                var errors = [];
                var _done = _.after(models.length, function() {
                    callback(errors.length ? errors : null);
                });
                _.each(models, function(model) {
                    model.fetch({
                        success: _done,
                        error: function(error) {
                            errors.push(error);
                            _done();
                        }
                    });
                });
            }
        }
    }
});