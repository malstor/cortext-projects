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

				// FIXME 				
				// $("#path ul .dashboard").css("paddingLeft", ($("#path ul .dashboard").width() + 10)+"px");

				$("#path ul .dashboard").css("paddingLeft", 107+"px");
				$("#path ul .home, #path ul .dashboard").unbind("mouseenter mouseleave");

				$("#project-new .new").on("click", function(e){
					e.preventDefault();

					var p = new models.Project({
						title : $("#project-new input").val()
					});

					p.save({}, { success: function(project, response){
						p.set(response);
						window.location = p.permalink();

						// var new_elt = $(templates.Dashboard_list_project({ p: p.toJSON(), templates : templates }));

						// $(".projects-list").prepend(new_elt);

						// $(new_elt).css('display', 'none');
						// $(new_elt).fadeIn(1000);
					}});
					// should take in account the save feedback
				});

				activate_button("#project-new input", "#project-new .new");

				$("#dashboard-meta .projects li").on("click", function(e){
					var href = $(this).find("a").attr("href");
					
					//console.log($(this));
					window.location = href;
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
				$("#header").hide();
				$(".trigger").hide();
				$('body').css('background', 'none');
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

				$("#add-element #select-type button").on("click", function(evt){
					var $button = $(evt.target);

					$("#add-element #select-type button").not("."+$button.attr("rel")).removeClass("on");
					$("#add-element form").filter(".on").not("form."+$button.attr("rel")).hide().removeClass("on");

					$button.toggleClass("on");
					$("#add-element form." + $button.attr("rel")).slideToggle().toggleClass("on");
				});

				$("#add-element .message .add").on("click", function(e){
					e.preventDefault();

					var element = new models.element({
						type: "Message",
						author: current_user.id,
						project : parseInt($("#add-element form").attr("rel")),
						date: new Date().getTime(),
						content: $("#add-element .message textarea").val()
					});

//					console.log(element);

					element.save({},{
						error: function(){
							console.log("new message: fail");
						},
						success: function(e, response){

							element.set(e);

				            element.set({
				            	permalink : "/element/"+e.get("type")+"/"+response[0]["id"]+"/in/"+project
				            });

							var new_el = $(templates["Project_"+element.get("type")]({ author : current_user, e : element.toJSON() }));
							$("#elements").prepend(new_el);

		//					console.log(new_el);

							$(new_el).css('display', 'none');
							$(new_el).fadeIn(1000);
						}
					});
				});

				$("#add-members .add").on("click", function(e){
					e.preventDefault();

					current_project.add_member($("#add-members input").val());
				});

				$("#add-members input").on("keyup", function(e){
					$("#proposition-members").empty();

					var options = {
						data : {
							query : $("#add-members input").val()
						},
						success : function(data){							
							$("#proposition-members").empty();

							if(data.length == 0){
								$("#proposition-members").html("<p>We cannot find available user for this project</p>");
							} else {
								_(data).each(function(u){
									var user = new models.user(u);
									user.set_gravatar();

									var $elt = $(templates.Project_proposition_item({ user : user.toJSON() }));

									$("#proposition-members").append($elt);

									$elt.children(".plus").on("click", function(evt){
										current_project.add_member(u.id);
									});
								});
							}
						}
					};

					$.ajax("/api/Project/"+parseInt($("#add-element form").attr("rel"))+"/members/propose", options);
				});

				$("#new-members h4").click(function(){
        			$("#new-members > div ").slideToggle(200);
    			});

				$("form .upload").click(function(){
					var parameters = {
						context : {
							project_id : project
						},
						callback_url : "http://collab.cortext.net/project/"+project,
						callback_json : "http://collab.cortext.net/api/Project/"+project+"/document"
					};

					console.log($.param(parameters, true));

					window.location = "http://assets.cortext.org/upload?" + $.param(parameters);
				});
                                $("form .start").click(function(){
					var parameters = {
						context : {
							project_id : project
						}
						
					};

					console.log($.param(parameters, true));

					window.location = "http://managerdev.cortext.org/job/new?user_id="+current_user.id+"&" + $.param(parameters);
				});

    			activate_button("#add-element .message textarea", "#add-element .message .add");
    			activate_button("#add-members input", null);

			}
		});

		// should be this value but having an issue of crossbrowser compatibility
		// var offset = ($("#path ul li.dashboard").innerWidth() - $("#path ul li.home").innerWidth());
	//	var offset = ($("#path ul li.dashboard").innerWidth());
		var offset = 107;

		$("#path ul").css("left", "-"+ (offset - $("#path ul li.home").innerWidth()) +"px");
		$("#path ul li.home").css("left", (offset - $("#path ul li.home").innerWidth()) +"px");

		console.log($("#path ul li.dashboard").innerWidth() - $("#path ul li.home").innerWidth());

		console.log($("#path ul li.dashboard").css("width"));
		console.log($("#path ul li.home").width());

		$("#path ul .home, #path ul .dashboard").bind("mouseenter", function(evt){
			$("#path ul").animate(
				{ paddingLeft: offset }
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

		app = new main();


	$("#question").click(function(){
    $("#question-panel").slideToggle(200);
    });
		$(".aide").bind("mouseleave", function(evt){
		$(".aide").hide('slow');
		
		$(".trigger").toggle("fast");
			$(this).toggleClass("active");						
		//$(".aide").css
			//('display', 'none');	
		//$(".trigger").css('background', '#9e1d43');		
		});
		  

		$(".trigger").bind("mouseenter", function(evt){
			console.log("heho");			
			$(".aide").toggle("fast");
			$(this).toggleClass("active");
			$(".trigger").css('display', 'none');	
			//$(".trigger").css('border', 'none');
			//$(this).toggle(
			//{duration:600});
			//$(this).animate("easeOutBounce");		
		});

		$('#mon_textarea').elastic();

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

				// FIXME : static id for demo
				// window.open(target.url+e.id+"/"+target.key, "CROSS CONNECT", "width=500,height=500");
				window.open(target.url+"15/"+target.key, "CROSS CONNECT", "width=500,height=500");
				document.location.href = "/dashboard";
			});

			var response = u.login(u.toJSON());
		});

	});

	_.each($(".participation"), function(e){
		to_participation_bar(e);
	});

	Backbone.history.start({pushState: true});
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

var activate_button = function(input, button){
	var $input = $(input);
	var $button = $(button);

	var default_value = $input.val();

	// FIXME : code un peu long
	$input.addClass('default');
	$button.attr('disabled', 'disabled');
	$button.addClass('inactive');

	$input.on("focus", function(evt){
		$input.val("");
		$input.addClass("focus");
		$input.removeClass('default');		
		$input.trigger("keyup");
	});

	$input.on("blur", function(evt){
		if($input.val() === ''){
			$input.val(default_value);
			$input.removeClass("focus");
			$input.addClass('default');		
		}
	});

	$input.on("keyup", function(evt){
		if($input.val() == '' || $input.hasClass('default') ){
			$button.attr('disabled', 'disabled');
			$button.addClass('inactive');
		} else {
			$button.removeAttr('disabled');
			$button.removeClass('inactive');
		}
	});
}