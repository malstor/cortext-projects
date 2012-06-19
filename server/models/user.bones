model = models.User;
// model = model.extend(Backbone.Model);

model = model.extend({
	name : "",
	email: "tk@deveha.com",
	gravatar: "",
	info: {},
	projects : [],
	url: function() {
        return '/api/user/' + encodeURIComponent(this.get('id'));
    },
	initialize: function(){
		var user = this;
		var views = views;

		this.bind("auth:error", function(e){
			console.log("log failed");
		});

		this.bind("auth:status", function(e){
			console.log("log success");
		});
	},

	cross_auth: function(){
		console.log(this);
	},

	url: function() {
        return '/api/user/' + encodeURIComponent(this.get('id'));
    },

	get_info: function(){
		var clone = _.clone(this);
		delete clone.projects;

		return clone.toJSON();
	},

	get_path: function(){
		var path = []

		if(this.show){
			path.push(this.show.get_path()[0]);
		}

		path.push({
	        type: "user",
	        url: "/user/"+this.get("id"),
	        name: this.get("name")
        });

		return path;
	},

	fetch_projects: function(callback){
		var user = this;

		var options = {
			data: {
			},
			url: this.url() + "/projects",
			success: function(data){
				user.projects = data;
	            user.trigger("fetch:projects");
			}
		}

		$.ajax(options);
	},

    sync: function(){
    }
});