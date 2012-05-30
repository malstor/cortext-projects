view = views.Main.extend({
	initialize: function(){
		console.log("opening project "+ this.options.project);
	},
    render: function() {
    	var el = this.el;

    	var elements = [];

    	var nb_elements = 4 + Math.floor( Math.random() * 20);

		$(this.el).empty();

		var current_date = new Date().getTime();

    	for(var i = 0; i < nb_elements; i++){
    		var e = {
    			id: Math.floor( Math.random() * 100),
    			type : types[ Math.floor( Math.random() * 3) ],
    			author : names [ Math.floor( Math.random() * names.length) ],
    			date : current_date,
    			date_formated : format_date(current_date)
    		};

    		current_date = current_date - Math.floor( Math.random() * 4) * 24 * 60 * 60 * 1000;

    		if(e.type == "Message"){
    			e.content = lorem.create( Math.floor( Math.random() * 3) + 1).generate();
    		}

    		if(e.type == "Image"){
    			e.url = "http://lorempixel.com/735/400/";
    		}

    		elements.push(e);
    	}

    	console.log(elements);

    	_.each(elements, function(e){
    		$(el).append(templates[ e.type ]({ e: e }));
    	});

        return this;
    }
});

function format_date(date){
	var date = new Date(date);

	var d = date.getDate();
	var m = date.getMonth()+1;
	var y = date.getFullYear()

	return d+"."+m+"."+y;
}