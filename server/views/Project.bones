view = views.Main.extend({
	initialize: function(){
		console.log("rendering project "+ this.options.model.id);
	},
    render: function() {
    	var el = this.el;

    	var elements = this.model.get("elements");

        console.log(this);

		$(this.el).empty();

    	console.log(elements);

    	_.each(elements, function(e){
    		$(el).append(templates[ e.type ]({ e: e }));
    	});

        return this;
    }
});