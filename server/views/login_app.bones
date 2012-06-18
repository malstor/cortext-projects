view = Backbone.View.extend({
    initialize: function() {
    },
    render: function(){
    	var options = {
    		user: this.model.toJSON()
    	};

    	$(this.el).empty().append(templates.login_app(options));
    }
});