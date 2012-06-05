router = Backbone.Router.extend({
    routes: {
		'/': 'home',
        // '/user/:user': 'user',
        '/project/:project': 'project'
        // '/project/:project/object/:object': 'object'
    },

    home: function() {
    	var router = this;
    	router.send(views.Home, {});
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

    path : function(info){
        var p = [];

        p.push({
            class: "project type",
            name: "project"
        });


        p.push({
            class: "project name",
            url: "/project/2",
            name: "Voix du Nord"
        });

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