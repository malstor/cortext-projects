view = views.Main.extend({
	initialize: function(){
		console.log("opening dashboard");
	},

    render: function() {
    	var options = {
            projects: []
        }

        this.options.projects.each(function(p){
        	options.projects.push(p.toJSON() );
        });

 //   	console.log(options);

        $(this.el).empty().append(templates.Dashboard(options));
        return this;
    }
});
