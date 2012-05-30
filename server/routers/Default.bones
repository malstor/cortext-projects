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
        var router = this;

        router.send(views.Project, { project : project_id });
    },

    send: function(view) {
        var options = (arguments.length > 1 ? arguments[1] : {});
        var v = new view(options);
    },

    pageTitle: function(el){
    	return "lola";
    },

    error: function(error) {
    	this.send(views.Error, _.isArray(error) ? error.shift() : error);
    }
});