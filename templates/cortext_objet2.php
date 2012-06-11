<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cortext Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Plateforme Cortext Manager" />
<meta name="keywords" content="manager,corpus,texte" />  
<link href="css/reset.css" type="text/css" rel="stylesheet" />  
<link href="css/style-general.css" type="text/css" rel="stylesheet" />
<link href="css/style-general.css" type="text/css" rel="stylesheet" />
<link href="css/style-menu.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-left.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-right.css" type="text/css" rel="stylesheet" />
<link href="css/form-login.css" type="text/css" rel="stylesheet" />
<link href="css/style-objet.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" href="css/lightbox.css" type="text/css" media="screen" />
<link href="css/bouton-style.css" type="text/css" rel="stylesheet" />

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="js/canvas_barreprogress.js"></script>
<script type="text/javascript" src="js/fonctions_form_barre_comment.js"></script>
<script type="text/javascript" src="lib/jquery.autogrowtextarea.js"></script>
<script type="text/javascript" src="lib/lightbox.js"></script>
<script type="text/javascript" src="lib/lightbox_img.js"></script>

</head>
<body onload="">
  	  	
<div id="conteneur-principal">

	<div id="barre-top">
    <div id="menu">
    <a href="cortext_accueil.php"><img src="images/home2.png" alt="#" /></a>     
    <ul>
    <li class="menu1a"><a href="#"> projet</a></li>  
    <li class="menu1"><a href="#"> algues vertes</a></li> 
    <li class="menu1b"><a href="#"> analysis.py - 12.12.2012</a></li>
    <li class="menu1"><a href="#"> carte semantique</a></li>   
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
   
   </div> <!--fin de menu-->  
 
 </div><!--fin de barre-top-->  
    
   <div class="effacement"></div>
 
    
	<div id="container">
 
	<!--contenu colone gauche -->    	
    <div id="sidebar-left">
    	<div id="barre-left">
        
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
         
    	</div>  <!--fin de barre-left-->
    	</div><!--fin de sidebar-left-->
       
    
	<!--contenu central -->       
    <div id="main-content">
    
    
        <div class="rendu-suite">
    	<h3>tubes (analysis.py/12:02 21.06.2011)</h3> <span class="data3">10.03.2012</span>
        <div class="comment2b"></div>
      <a href="images/rendu-script2.png" rel="lightbox"> <img src="images/rendu-script.png" alt="resultat-script"  /></a> 
    </div>
    
    <div class="effacement"></div>
	<div id="trait"></div>
        
        <div class="commentaires-suite" id="el_1_comments">
        <div class="info-bul-img"></div>
                	<div class="comments_list">
                    	
				
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
  			<textarea id="dmc" onFocus="if(this.value!='')this.value=''"; ></textarea>
			</form>
            
            <div class="img-commentaire">
            <div class="bouton-com">
            <a href="#"><img src="images/bul-com.png" alt="" /><span class="comm">comment</span></a>
            </div></div>           
         </div>
        
        </div><!--fin div commentaires -->           	
    	</div><!--fin contenu central -->   
   
    
<!--contenu colonne droite -->    	        
    <div id="sidebar-right">
       <div id="barre-right">
       
    	<div id="sid1">
        <p class="bouton bleu">Create new project</p> 
        <p class="bouton violet">Add a document</p> 
        </div>        
                 
    	<div id="sid2-suite">
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
             
   	<div id="logo"></div>
    
           </div> <!--fin barre<-->       
    </div><!--fin colonne droite -->
        	            	       
	</div><!--fin du contener--> 
           
</div><!--fin du conteneur principal-->
     
</body>
</html>
