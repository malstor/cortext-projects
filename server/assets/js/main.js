var app;

var models, views, routers, templates;

var colors = {
	Analysis: "#34B02C",
	Image: "#E62E60",
	Message: "#FFD505",
	Others: "#EEF2F6"
}

$(document).ready(function(){
	var m;

	Bones.initialize(function(models, views, routers, templates) {
		models = models;
		views = views;
		routers = routers;
		templates = templates;

		var main = Backbone.Router.extend({
			routes : {
				"dashboard": "dashboard",
				"login" : "login",
				"user/:user" : "user",
				"project/:project" : "project"
			},

			dashboard: function(){
				$("#path ul .dashboard").css("paddingLeft", ($("#path ul .dashboard").width() + 10)+"px");
				$("#path ul .home, #path ul .dashboard").unbind("mouseenter mouseleave");

				$("#project-new .new").on("click", function(e){
					e.preventDefault();

					var p = new models.Project({
						title : $("#project-new input").val()
					});

					p.save({}, { success: function(project, response){
						p.set(response);

						var new_elt = $(templates.Dashboard_list_project({ p: p.toJSON(), templates : templates }));

						$(".projects-list").prepend(new_elt);

						$(new_elt).css('display', 'none');
						$(new_elt).fadeIn(1000);
					}});

					// should take in account the save feedback

				});
			},

			user: function(user){
				var u = new models.user({ id : user });
				var v = new views.user();

				u.bind("fetch:projects", function(){
					v.load_projects(u);
					v.load_messages(u);
				});

				u.fetch_projects();
			},

			login: function(){
			},

			project: function(project){
				var current_project = new models.Project({ id : project });

				$("#members").delegate(".member", "click", function(evt){
					var user_id = $(this).attr("rel");

					if( $(this).hasClass("active") ){
						$("#members .member").removeClass("inactive");
						$(this).removeClass("active");

						$("#elements").children().filter(":hidden").slideDown("fast");
					} else {
						$("#members .member").removeClass("active");
						$("#members .member").addClass("inactive");
						$(this).removeClass("inactive");
						$(this).addClass("active");

						$("#elements").children(":not(."+user_id+")").filter(":not(:hidden)").slideUp("fast");
						$("#elements").children("."+user_id+"").slideDown("fast");
					}
				});


				$("#add-element .add").on("click", function(e){
					e.preventDefault();

					var element = new models.element({
						type: "Message",
						author: current_user.id,
						project : parseInt($("#add-element form").attr("rel")),
						date: new Date().getTime(),
						content: $("#add-element textarea").val()
					});

//					console.log(element);

					element.save();

					var new_el = $(templates["Project_"+element.get("type")]({ author : current_user, e : element.toJSON() }));
					$("#elements").prepend(new_el);

//					console.log(new_el);

					$(new_el).css('display', 'none');
					$(new_el).fadeIn(1000);
				});

				$("#add-member .add").on("click", function(e){
					e.preventDefault();

					current_project.add_member($("#add-member input").val());
				});

				$("#link").click(function(){
        			$("#panel").slideToggle(200);
    			});
			}
		});

		app = new main();

		$("#path ul").css("marginLeft", "-"+($("#path ul .dashboard").width() - 50 )+"px");
		$("#path ul .home").css("left", ($("#path ul .dashboard").width() - 50 ) +"px");

		$("#path ul .home, #path ul .dashboard").bind("mouseenter", function(evt){
			$("#path ul").animate(
				{ paddingLeft: $("#path ul .dashboard").width() }
			,{
				duration: 600,
				queue: false
			});
		});

		$("#path ul .home, #path ul .dashboard").bind("mouseleave", function(evt){
			$("#path ul").animate(
			{
				paddingLeft: 0 }
			,{
				duration: 600,
				queue: false
			});
		});


		$("#login").submit(function(e){
			e.preventDefault();

			var u = new models.user({
				name: $("#login #name").val(),
				password: $("#login #password").val(),
				id: $("#login #id").val()
			});

			u.bind("auth:status", function(e){
				var target = e.get("app");

				var options = {
					app_key: target.key,
					user: u.get("id")
				}

				window.open(target.url+"?"+$.param(options), "CROSS CONNECT", "width=500,height=500");
				document.location.href = "/dashboard";
			});

			var response = u.login(u.toJSON());
		});

		Backbone.history.start({pushState: true});
	});

	_.each($(".participation"), function(e){
		to_participation_bar(e);
	});
});


function to_participation_bar(e){
//	console.log(e);

	var w = $(e).width();
	var h = 10;

	// transform .data into an hash
	var data = _.map($(e).children(".data").children(), function(elt){
		return {
			type: $(elt).attr("class"),
			count: $(elt).find("span").html()
		}
	});

	data = _(data).sortBy(function(d){ return d.type });

	//console.log(data);

	var sum = _.reduce(data, function(m, t){ return m + parseInt(t.count) }, 0);
	
	var canvas = document.createElement("canvas");
	$(canvas).attr("height",10);
	$(canvas).attr("width",w);

	var ctx = canvas.getContext("2d");

	var cursor_x = 0;

	ctx.fillStyle = "#EEF2F6";
	ctx.fillRect (0, 0, w, h);

	_.each(data, function(d){
		// ERK
		if(d.type != "Others"){
			var l = Math.round( (d.count/sum) *  w);

			ctx.fillStyle = colors[d.type];
			ctx.fillRect (cursor_x, 0, l, h);

			cursor_x = cursor_x+l;
		}
	});

	$(e).children(".data").hide();
	// $(e).bind("mouseenter mouseleave", function(evt){
	// 	$(e).children(".data").css("width", w+"px");
	// 	$(e).children(".data").slideToggle("fast");
	// });

	$(e).prepend(canvas);
}