view = views.Main.extend({
	initialize: function(){
		console.log("opening dashboard");
	},

    render: function() {
        console.log(session.user);

    	var options = {
            projects: [],
            templates : templates
        }

        this.options.projects.each(function(p){
        	options.projects.push(p.toJSON() );
        });

 //   	console.log(options);

        $(this.el).empty().append(templates.Dashboard(options));
        return this;
    }
});
