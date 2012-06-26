model = Backbone.Model.extend({

    members : [],
    elements: [],

    url: function() {
        var url = '/api/Project/';

        if(this.has('id')){
            url += encodeURIComponent(this.get('id'))
        }

        return url;
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
    },

    add_member : function(user_id){
        var project = this;

        var url = this.url() + "/member";
        url += (/\?/.test(url) ? '&' : '?') + '_=' + $.now();

        var params = {
            "user_id" : parseInt(user_id),
            "bones.token" : Backbone.csrf(url)
        }

        var options = {
            data: JSON.stringify(params),
            contentType: 'application/json',
            dataType: 'json',
            type: "POST",
            url: url,
            success: function(data){
                project.trigger("add:member");
            }
        }

        $.ajax(options);
    }
});