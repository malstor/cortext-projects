<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cortext Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Plateforme Cortext Manager" />
<meta name="keywords" content="manager,corpus,texte" />  
<link href="css/reset.css" type="text/css" rel="stylesheet" />  
<link href="css/style-general.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-left2.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-right2.css" type="text/css" rel="stylesheet" />

<link href="css/form-login.css" type="text/css" rel="stylesheet" />


 


<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>





<script type="text/javascript">
$(document).ready(function(){
    $("#login-link").click(function(){
        $("#login-panel").slideToggle(200);
    });
	
	for(var i = 1; i < 4; i++){
		script_progress_bar("container"+i, "canvas"+i, Math.floor(Math.random() * 100) );
	}
	

	
	for(var i = 1; i < 5; i++){
    var a = Math.floor(Math.random() * 50);
   var b = Math.floor(Math.random() * 50);
 
    user_progress_bar("container"+i, "contain"+i, a, b);
}	
	
});

$(document).keydown(function(e) {
    if (e.keyCode == 27) {
        $("#login-panel").hide(0);
    }
});


</script> 


<script type="application/x-javascript">
function draw_bar() {
 var canvas = document.createElement("canvas");
 var ctx = canvas.getContext("2d");

 ctx.fillStyle = "rgb(52, 176, 44)";
 ctx.fillRect (0, 0, Math.floor(Math.random() * 100), 10);

	return canvas;

}

function script_progress_bar(name, div, a){
	console.log(div);
	document.getElementById(div).appendChild(draw_bar(Math.random));
}




function draw_user_bar(a, b) {
 var canvas = document.createElement("canvas");
 var ctx = canvas.getContext("2d");

 ctx.fillStyle = "rgb(121, 81, 139)";
 ctx.fillRect (0, 0, Math.floor(((a+b) * 235 ) / 100), 10);

 ctx.fillStyle = "rgb(52, 176, 44)";
 ctx.fillRect (0, 0, Math.floor((a * 235 ) / 100), 10);

	

	return canvas;

}

function user_progress_bar(name, div, a, b){
	console.log(div);
	
	document.getElementById(div).appendChild(draw_user_bar(a, b));
}





  </script>


</head>
<body onload="">
  	
    <div id="menu"><img src="images/home.png" alt="#" /> 
    
    <ul>
    <li class="menu1"><a href="#"> algues vertes</a></li>  
   <li class="menu2"><a id="login-link" href="#login" title="Login"> tam kien duong</a></li>
    </ul>    
  
   
<div id="login-panel">
<form action="" method="post">
<p>
<label>Username:
<input name="username" type="text" value="" />
</label> <br /><br />
<label>Password:
<input name="password" type="password" value="" />
</label><br /><br /><br />
<input type="submit" name="submit" value="Login" />
<small>Press ESC to close</small>
</p>
</form>
</div>
<!-- /login-panel -->
<!-- </div>/demoheader -->
    
   </div>  
 
    
   <div class="effacement"></div>
 
    
	<div id="contener">
  	
    <div id="sidebar-left">
    	
        <div id="sid_1">
        <h3>informations</h3>
      		<p>
			create: xx .xx .xxx <br/>
			updated: xx .xx .xxx <br/>
            analysis: 56 <br/>
            documents: 200<br/>
            messages: 555
		 	</p>
         </div>
         
         <div id="sid_2">
         <h3>participants</h3>
         
         <div id="utilisateur">
      	<span class="name">bill</span>
		<div id="contain1" class="contain-left"> </div>      

         <span class="name">bob</span>
	<div id="contain2" class="contain-left"> </div>
               
         <span class="name">john</span>
        <div id="contain3" class="contain-left"> </div>      
 
        
         <span class="name">admin</span>
   		<div id="contain4" class="contain-left"></div> 
     
              
 		</div>
        
         </div>
         
         
         <div id="sid_3">
         
         <h3>phases</h3>
                  
         </div>
    
    
    
    </div>
    
   
    
    
    
    <div id="main-content">
    
    	<div class="projet">
        	<div id="titre"><h3>analysis.py <a href="#">parameters</a> - <a href="#">logs</a></h3>
            <h4>10.03.2012</h4></div>
            
            <div class="fichier">
            <div class="img-pdf"></div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>
            
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div>
            
            </div>
            
            <div class="fichier">
            <div class="img-pdf"></div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div></div>

          
            
            <div class="fichier">
            <div class="img-pdf"></div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div></div>
            
           
            
            
            <div class="fichier">
            <div class="img-pdf"></div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div></div>

            

        
        </div>
        
        
        <div class="commentaires">
        
        	<div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
           </div>
            <div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <div class="comment-text">
            <div class="img-commentaire"><img src="images/comment-img.png" alt="#" /></div>           
          </div>
        
        </div>
        
    <div class="effacement"></div>
	
    
    <div class="comment2">
    	<h3>lise cornilleau</h3> <span class="data3">10.03.2012</span>
        <div class="comment2b"></div>
    <p>veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis es</p>
       
    </div>
    
    
     <div class="commentaires">
        
        	<div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
           </div>
            <div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <div class="comment-text">
            <div class="img-commentaire"><img src="images/comment-img.png" alt="#" /></div>           
          </div>
        
        </div>
    
     <div class="effacement"></div>

    <div class="rendu">
    	<h3>tubes (analysis.py/12:02 21.06.2011)</h3> <span class="data3">10.03.2012</span>
        <div class="comment2b"></div>
        <img src="images/rendu-script.png" alt="resultat-script"  />
    </div>
    
    
    <div class="commentaires">
        
        	<div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
           </div>
            <div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <div class="comment-text">
            <div class="img-commentaire"><img src="images/comment-img.png" alt="#" /></div>           
          </div>
        
        </div>
    
    
    </div>
    
    
    
    
    
    
    
    <div id="sidebar-right">
    
    	<div id="sid1">
        <h2>start an analysis</h2>
     	<h3>add a document</h3>
        </div>
        
        
    <div id="sid2">
    
      <h4>queued scripts</h4>              
       <div id="analysis1">
       	<span class="an1">analysis.py</span>
       	<span class="an2">10.03.2012</span> 
        <div id="canvas1"> 		
</div>

  <span class="an3">tam kien duong</span>      
 <!--       <div id="container1"></div>      
       <div class="barre"></div>
-->                  
    </div>
 
    <div id="analysis2">
    	<span class="an1">analysis.py</span>
       	<span class="an2">10.03.2012</span> 
        <div id="canvas2"></div>
       <span class="an3">tam kien duong</span>         
    </div>
    
       <div id="analysis3">
       <span class="an1">analysis.py</span>
       	<span class="an2">10.03.2012</span>
         <div id="canvas3">    </div>
         <span class="an3">tam kien duong</span>    
       </div>

       
    </div>
    
    <img src="images/logo.png" alt="" />
    
    
    </div>
      






	</div>

</body>
</html>
