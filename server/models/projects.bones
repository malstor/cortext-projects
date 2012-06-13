model = Backbone.Collection.extend({
    model: models.Project,
    url: '/api/projects/default'
});