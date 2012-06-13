model = Backbone.Collection.extend({
	id : "",
    model: models.Project,
    url: function() {
        return '/api/projects/1';
    }
});