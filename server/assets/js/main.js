var colors = {
	Analysis: "#34B02C",
	Image: "#A3319F",
	Message: "#D0D644",
	Others: "#EEF2F6"
}

$(document).ready(function(){
	var m;

	Bones.initialize(function(models, views, routers, templates) {
		m = models;
	});

	_.each($(".participation"), function(e){
		to_participation_bar(e);
	});

	$("#login").submit(function(e){
		e.preventDefault();

		var user = new m.user({
			name: $("#login #name").val(),
			password: $("#login #password").val(),
			id: $("#login #id").val()
		});

		console.log(user);
		console.log(user.url());
		var response = user.login(user.toJSON());
//		var response = user.login();

		console.log(user);
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
	$(e).bind("mouseenter mouseleave", function(evt){
		$(e).children(".data").css("width", w+"px");
		$(e).children(".data").slideToggle("fast");
	});


	$(e).prepend(canvas);
}