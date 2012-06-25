view = views.Main.extend({
	initialize: function(){
		console.log("rendering project "+ this.options.model.id);
	},
    render: function() {
    	var el = this.el;
        var model = this.model;
    	var elements = this.model.get("elements");

        // console.log(this);

		$(this.el).empty();

    	// console.log(elements);

        var elements_rendered = [];

    	_.each(elements, function(e){
            e.permalink = "/element/"+e.type+"/"+e.id+"/in/"+model.get("id");
            var t = templates[ "Project_"+e.type ]({ e: e });
            console.log("  - "+e.type+"#"+e.id);

    		elements_rendered.push(t);
    	});

        var options = {
            project: this.model.toJSON(),
            elements:elements_rendered
        }

        $(this.el).append(templates.Project(options));

        return this;
    }
});