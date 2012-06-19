view = Backbone.View.extend({
    initialize: function() {
    },
    render: function(){
    	var element = this.model.toJSON();
    	var project_id = "";

    	console.log(element);

        element.permalink = "/element/"+element.type+"/"+element.id+"/in/"+project_id;
        var element_rendered = templates[ "Project_"+element.type ]({ e: element });

        var options = {
            element: element_rendered
        }

    	$(this.el).empty().append(templates.element(options));
    }
});