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
<script type="text/javascript" src="js/canvas_barreprogress.js"></script>
<script type="text/javascript" src="js/fonctions_form_barre_comment.js"></script>
<script type="text/javascript" src="js/jquery.autogrowtextarea.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $('textarea').simpleautogrow();
});
</script>
</head>
<body onload="">
  	
    <div id="menu"><a href="#"><img src="images/home2.png" alt="#" /></a> 
    
    <ul>
    <li class="menu1"><a href="#"> algues vertes</a></li>  
   <li class="menu2"><a id="login-link" href="#" title="Login"> tam kien duong</a></li>
    </ul>    
  
   
<div id="login-panel">
<form action="" method="post">
<p>
<span class="sign">sign in</span> <br/>
<label class="user">user name
<input name="username" type="text" value="" />
</label> <br /><br />
<label class="password">password
<input name="password" type="password" value="" />
</label>
<input class="enter" type="submit" name="submit" value="Login" /><br/><br />
<span class="phrase">don't have an account. ask one by providing your email</span>
<label class="email">email
<input name="email" type="email" value="" />
<input class="enter" type="submit" name="submit" value="sign up" />
</label>
</p>
</form>
</div>

    
   </div>  
 
    
   <div class="effacement"></div>
 
    
	<div id="contener">
 
<!--contenu colone gauche -->    	
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
    
   
    
	<!--contenu central -->       
    <div id="main-content">
    
    	<div class="projet">
        	<div id="titre"><h3>analysis.py <a href="#">parameters</a> - <a href="#">logs</a></h3>
            <h4>10.03.2012</h4></div>
            
            <div class="fichier">
            <div class="img-pdf">pdf</div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>          
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div></div>
            
            <div class="fichier">
            <div class="img-pdf">pdf</div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div></div>
                    
            <div class="fichier">
            <div class="img-pdf">pdf</div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div></div>          
            
            
            <div class="fichier">
            <div class="img-pdf">pdf</div>
            <p class="name-pdf">mon super nom de fichier un peu long</p>
            <div class="bloc">            
            <span class="infos"><a href="#">5 comments</a></span><br/>
            <span class="data">23:12 12.05.2012</span>
            </div></div>
     
        </div><!--fin div projet -->   

        
        
        <div class="commentaires" id="el_1_comments">
                	<div class="comments_list">
                    	
				<div class="info-bul-img"></div>
	<div class="comment1">
          <h2>jean-philippe cointet</h2> <span class="data2A">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
           </div>
            <div class="comment1">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            
            <div class="comment1" id="test12">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
            <div class="content">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            </div>
            
            </div><!-- /comments_list -->
            
         <div class="comment-text">
            <form name="fff">
  			<textarea id="dmc"></textarea>
			</form>
            
            <div class="img-commentaire">
            <div class="bouton-com">
            <a href="#"><img src="images/bul-com.png" alt="" /><span class="comm">comment</span></a>
            </div></div>           
         </div>
        
        </div><!--fin div commentaires -->   
        	
        
    <div class="effacement"></div>
	
    
    <div class="comment2">
    	<h3>lise cornilleau</h3> <span class="data3">10.03.2012</span>
        <div class="comment2b"></div>
    <p>veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis es</p>
       
    </div>
    
    
     <div class="commentaires" id="el_2_comments">
        <div class="comments_list2">
        
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
            <div class="comment1" id="test13">
            <h3>jean-philippe cointet</h3> <span class="data2">23:12 12.05.2012</span>
               <div class="effacement"></div>
               <div class="content">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            </div>
            
            </div><!-- /comments_list2 -->

            <div class="comment-text">
            <form name="fff">
  			<textarea id="dmc2"></textarea>
			</form>
            <div class="img-commentaire">
            <div class="bouton-com">
            <a href="#"><img src="images/bul-com.png" alt="" /><span class="comm">comment</span></a>
            </div></div> 
                     
          </div>
        
        </div>
    
     <div class="effacement"></div>

    <div class="rendu">
    	<h3>tubes (analysis.py/12:02 21.06.2011)</h3> <span class="data3">10.03.2012</span>
        <div class="comment2b"></div>
        <img src="images/rendu-script.png" alt="resultat-script"  />
    </div>
    
    
    <div class="commentaires" id="el_3_comments">
            <div class="comments_list3">

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
            <div class="comment1" id="test14">
            <h3>jean-philippe cointet</h3> 
            <span class="data2">23:12 12.05.2012</span>
            <div class="effacement"></div>
            <div class="content">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
           	</div>
              </div>   <!-- fin de comments_list3 -->

            <div class="comment-text">
            <form name="fff">
  			<textarea id="dmc3"></textarea>
			</form>
            <div class="img-commentaire">
            <div class="bouton-com">
            <a href="#"><img src="images/bul-com.png" alt="" /><span class="comm">comment</span></a>
            </div></div>     
          </div>
        
        </div>
    
    
    	</div><!--fin contenu central -->   

    
    
    
    
<!--contenu colonne droite -->    	        
    <div id="sidebar-right">
    
    	<div id="sid1">
        <a href="#"><h2>start an analysis</h2></a>
     	<a href="#"><h3>add a document</h3></a>
        </div>
        
        
    	<div id="sid2">
      	<h4>queued scripts</h4>
                      
       	<div id="analysis1">
       	<span class="an1">analysis.py</span>
       	<span class="an2">10.03.2012</span> 
        <div id="canvas1"></div>			
  		<span class="an3">tam kien duong</span>                       
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
        <div id="canvas3"></div>
        <span class="an3">tam kien duong</span>    
       	</div>
               
    </div> <!-- fin side2 -->   
    <img src="images/logo.png" alt="" />  
    </div><!--fin colonne droite -->    	        

	</div><!--fin du contener général-->    	        


</body>
</html>
