view = views.Main.extend({
	initialize: function(){
		console.log("rendering project "+ this.options.model.id);
	},
    render: function() {
    	var el = this.el;

    	var elements = this.model.get("elements");
        var members = this.model.get("members");
        var info = this.model.get("info");
        var project_id = this.model.get("id");

        // console.log(this);

		$(this.el).empty();

    	// console.log(elements);

        var elements_rendered = [];

    	_.each(elements, function(e){
            e.permalink = "/element/"+e.type+"/"+e.id+"/in/"+project_id;
            var t = templates[ "Project_"+e.type ]({ e: e });
            console.log("  - "+e.type+"#"+e.id);

    		elements_rendered.push(t);
    	});

        var options = {
            info: info,
            members: members,
            elements:elements_rendered
        }

        $(this.el).append(templates.Project(options));

        return this;
    }
});