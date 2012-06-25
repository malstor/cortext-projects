model = Backbone.Model.extend({

    members : [],
    elements: [],

    url: function() {
        return '/api/Project/' + encodeURIComponent(this.get('id'));
    },

    permalink: function(){
    	return '/project/' + encodeURIComponent(this.get('id'));
    },

    get_info: function(){
    	return this.get("info");
    },

    get_path: function(){
		var path = []

		path.push({
	        type: "Project",
	        url: this.permalink(),
	        name: this.get("title")
        });

		return path;
	},

    get_relative_participation: function(){
        // TBC
    }
});