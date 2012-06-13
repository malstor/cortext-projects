model = Backbone.Model.extend({
    url: function() {
        return '/api/Project/' + encodeURIComponent(this.get('id'));
    },

    get_info: function(){
    	return this.get("info");
    }
});