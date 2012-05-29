view = Backbone.View.extend({
    id: 'main',
    initialize: function() {
        this.app = new views.App();
    },
    attach: function() {
        return this;
    }
});