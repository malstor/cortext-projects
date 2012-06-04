view = views.Main.extend({
	initialize: function(){
		console.log("opening project "+ this.options.project);
	},
    render: function() {
    	var el = this.el;

    	var elements = this.model.elements;

        console.log(this);

		$(this.el).empty();

    	console.log(elements);

    	_.each(elements, function(e){
    		$(el).append(templates[ e.type ]({ e: e }));
    	});

        return this;
    }
});