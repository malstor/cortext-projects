model = Backbone.Model.extend({
	owner: {},
    url: '/api/dashboard',

    initialize: function(owner){
    	this.owner = new models.user({ id: owner });
    },
    fetch_projects: function(){
    	var _this = this;

    	this.owner.fetch_projects(function(){
 //   		_this.trigger("");
    	});
    }
});