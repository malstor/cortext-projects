model = Backbone.Model.extend({
   url: function() {
        return '/api/element/' + encodeURIComponent(this.get('id'));
    },

    show_in: function(project){
    	this.show = project;
    },

	get_info: function(){
		return this.toJSON();
	},
	get_path: function(){
		var path = []

		if(this.show){
			path.push(this.show.get_path()[0]);
		}

		path.push({
	        type: this.get("type"),
	        url: this.get("url"),
	        name: "j'ai pas encore de titre"
        });

		return path;
	}
});