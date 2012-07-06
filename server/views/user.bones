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

        $("#indicator_projects .number").html( _.size(user.projects) );

        var total = {
            "Analysis": 0,
            "Image": 0,
            "Message": 0
        }

        var target = {
            "Analysis"  : "#indicator_analysis",
            "Image"     : "#indicator_documents",
            "Message"   : "#indicator_messages"
        };

        _(user.projects).each(function (p){
            $("#projects").append(templates.user_projects({project : p, composition : p.members[user.id].participation }));

            _.each(p.members[user.id].participation, function(count, type){ if(type != "Others"){{ total[type] += count }} });
        });
        
        var all = _.reduce(total, function(memo, item){ console.log(item); return parseInt(memo + item); }, 0);

        _.each(total, function(count, type){
            $(target[type]+" .number").html(count);

            // $(target[type]).width( Math.round(( count / all ) * ($("#indicators").width() - (4 * 74))) + 74);

            // console.log(total);
            // console.log(all);
        });

        _.each($(".participation"), function(e){
            to_participation_bar(e);
        });
    },
    load_messages: function(user){
        // TODO: ajax loading. On fera dans la dentelle plus tard
        $("#messages").empty();

        var projects = _(user.projects).filter(function(p){ return p.members[user.id].participation.Message > 0 }).slice(0,4);

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