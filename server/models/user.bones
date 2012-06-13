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

		this.bind("fetch:projects", function(){
			views.user.load_projects(this);
		});
	},
	url: function() {
        return '/api/user/' + encodeURIComponent(this.get('id'));
    },

	fetch_projects: function(){
		var options = {
			data : {
				user_id : this.id
			},
			success: function(evt){
				this.trigger("fetch:projects");
			}
		}
		new models.projects().fetch(options);
	},

    sync: function(){
    }
});