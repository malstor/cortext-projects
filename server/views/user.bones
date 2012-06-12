view = views.Main.extend({
	initialize: function(){
		console.log("rendering user "+ this.options.model.id);
	},
    render: function() {
    	var el = this.el;

//        var projects = new models.projects().fetch({ user_id : this.options.model.id });

        var options = {
            user : this.options.model.toJSON(),
            projects : {}
        }

        console.log(options);

        $(this.el).empty().append(templates.user(options));

        return this;
    }
});