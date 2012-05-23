function draw_bar(a) {
 var canvas = document.createElement("canvas");
 var ctx = canvas.getContext("2d");

 ctx.fillStyle = "rgb(52, 176, 44)";
 ctx.fillRect (0, 0,  Math.floor((a * 235 ) / 100), 10);

	return canvas;

}

function script_progress_bar(name, div, a){
	console.log(div);
	document.getElementById(div).appendChild(draw_bar(a));
}




function draw_user_bar(a, b, c) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	canvas.width = 335;
	canvas.height = 10;
	
	ctx.fillStyle = "rgb(238, 242, 246)";
	ctx.fillRect (0, 0, Math.floor(((b+c) * 345 ) / 100), 10);
	
	ctx.fillStyle = "rgb(121, 81, 139)";
	ctx.fillRect (0, 0, Math.floor(((a+b) * 345 ) / 100), 10);
		
	ctx.fillStyle = "rgb(52, 176, 44)";
	ctx.fillRect (0, 0, Math.floor((a * 345 ) / 100), 10);
	
	
	
	return canvas;
}

function user_progress_bar(name, div, a, b, c){
	console.log(div);
	
	document.getElementById(div).appendChild(draw_user_bar(a, b, c));
}






