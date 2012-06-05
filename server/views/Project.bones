view = views.Main.extend({
	initialize: function(){
		console.log("rendering project "+ this.options.model.id);
	},
    render: function() {
    	var el = this.el;

    	var elements = this.model.get("elements");
        var members = this.model.get("members");
        var info = this.model.get("info");

        // console.log(this);

		$(this.el).empty();

    	// console.log(elements);

        var elements_rendered = [];

    	_.each(elements, function(e){
            var t = templates[ e.type ]({ e: e });
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