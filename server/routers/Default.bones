router = Backbone.Router.extend({
    routes: {
		'/': 'home'
        // '/user/:user': 'user',
        // '/project/:project': 'project',
        // '/project/:project/object/:object': 'object'
    },

    home: function() {
    	var router = this;

    	router.send(views.Home, {});
    },

    pageTitle: function(el){
    	return "lol"
    },

    error: function(error) {
    	this.send(views.Error, _.isArray(error) ? error.shift() : error);
    }
});