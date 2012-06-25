view = views.Main.extend({
	initialize: function(){
        console.log("init: view.user");
	},
    render: function() {
        console.log("rendering user "+ this.options.model.id);

    	var el = this.el;

        // var projects = new models.projects().fetch({ user_id : this.options.model.id });

        var options = {
            user : this.options.model.toJSON(),
            projects : {}
        }

        console.log(options);

        $(this.el).empty().append(templates.user(options));

        return this;
    },
    load_projects: function(user){
        // TODO: ajax loading. On fera dans la dentelle plus tard
        $("#projects").empty();

        _(user.projects).each(function (p){
            var composition = {
                Message: 0,
                Image: 0,
                Analysis: 0,
                Others: 0
            }

            _(p.elements).reduce(function(composition, element){
                if(element.author.id == user.id){
                    composition[element.type] +=1;
                } else {
                    composition["Others"] += 1;
                }
                return composition;
            },composition);

            $("#projects").append(templates.user_projects({project : p, composition : composition}));
        });
            
        _.each($(".participation"), function(e){
            to_participation_bar(e);
        });
    },
    load_messages: function(user){
        // TODO: ajax loading. On fera dans la dentelle plus tard
        $("#messages").empty();

        var projects = user.projects.slice(0,4);

        _(projects).each(function (p){
            
            // filter messages
            p.elements = _(p.elements).filter(function(e){
                return e.type == "Message";
            });

            // keep only last five messages
            p.elements = p.elements.slice(0,5);

            $("#messages").append(templates.user_messages({project : p}));
        });
    }
});