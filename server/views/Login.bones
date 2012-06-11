view = Backbone.View.extend({
    initialize: function() {
    },
    render: function(){
    	$(this.el).empty().append(templates.login());
    }
});