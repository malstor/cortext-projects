$(document).ready(function(){
	var m;

	Bones.initialize(function(models, views, routers, templates) {
		m = models;
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