model = models.User;
// model = model.extend(Backbone.Model);

model = model.extend({
	name : "",
	email: "tk@deveha.com",
	gravatar: "",

	url: function() {
        return '/api/user/' + encodeURIComponent(this.get('id'));
    },
	initialize: function(){
		var m = this;


		this.bind("auth:error", function(e){
			console.log("log failed");
		});

		this.bind("auth:status", function(e){
			console.log("log success");
			m.save();

			window.location= "/dashboard";
		});
	},
	url: function() {
        return '/api/user/' + encodeURIComponent(this.get('id'));
    },

	fetch_projects: function(){
		 this.projects = new models.projects().fetch({ user_id : this.id });
	},

    sync: function(){
    }
});