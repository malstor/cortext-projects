$(document).ready(function(){
	
	//-------- formulaire: login/password----------
						   
    $("#login-link").click(function(){
        $("#login-panel").slideToggle(200);
    });
	
	
	//--------fonction pour les barres de progression----------
	
	for(var i = 1; i < 4; i++){
		var a = Math.floor(Math.random() * 100);
		
		script_progress_bar("container"+i, "canvas"+i, a );
	}
	

	
	for(var i = 1; i < 5; i++){
		var a = Math.floor(Math.random() * 50);
		var b = Math.floor(Math.random() * 50);
		user_progress_bar("container"+i, "contain"+i, a, b);
	}
	
	
	//--------fonction pour l'ajout des commentaires 1----------
	
	$("#el_1_comments a").click(function(){
		var div = $("#test12").clone();
		
		$(div).children('.content').html("<p>"+ $("#dmc").val() +"</p>");
		
		$(".comments_list").append(div);
		$(div).hide();		
		$(div).slideDown("slow");			

		
	});
	
	
	//--------fonction pour l'ajout des commentaires 2----------
	
	$("#el_2_comments a").click(function(){
		var div = $("#test13").clone();
		
		$(div).children('.content').html("<p>"+ $("#dmc2").val() +"</p>");
		
		$(".comments_list2").append(div);
		$(div).hide();
		$(div).slideDown("slow");

		
	});
	
	//--------fonction pour l'ajout des commentaires 3----------
	
	$("#el_3_comments a").click(function(){
		var div = $("#test14").clone();
		
		$(div).children('.content').html("<p>"+ $("#dmc3").val() +"</p>");
		
		$(".comments_list3").append(div);
		$(div).hide();
		$(div).slideDown("slow");
		
	});
	
	
});

	//--------fonction pour le formulaire: login/password----------

	$(document).keydown(function(e) {
    if (e.keyCode == 27) {
        $("#login-panel").hide(0);
  	  }
});