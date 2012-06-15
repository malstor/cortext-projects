var app;

var models, views, routers, templates;

var colors = {
	Analysis: "#34B02C",
	Image: "#A3319F",
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
				"user/:user" : "user",
				"project/:project" : "project"
			},

			user: function(user){
				var u = new models.user({ id : user });
				var v = new views.user();

				u.bind("fetch:projects", function(){
					v.load_projects(this);
					v.load_messages(this);
				});

				u.fetch_projects();
			},

			project: function(project){
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
			}
		});

		app = new main();

		$("#login").submit(function(e){
			e.preventDefault();

			var user = new models.user({
				name: $("#login #name").val(),
				password: $("#login #password").val(),
				id: $("#login #id").val()
			});

			var response = user.login(user.toJSON());
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
			var l = Math.floor( (d.count/sum) *  w);

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

String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

format_date = function(date){
	var date = new Date(date);

	var d = date.getDate();
		d = String(d).lpad("0", 2);

	var m = date.getMonth()+1;
		m = String(m).lpad("0", 2);

	var y = date.getFullYear()

	return d+"."+m+"."+y;
}