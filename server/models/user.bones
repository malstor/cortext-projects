model = models.User;
model = model.extend(Backbone.Model);

model = model.extend({
	initialize: function(){
		this.bind("auth:error", function(e){
			console.log("log failed");
		});

		this.bind("auth:status", function(e){
			console.log("log success");
		});

	},
	url: function() {
        return '/api/user/' + encodeURIComponent(this.get('id'));
    },
    sync: function(){
    }
});