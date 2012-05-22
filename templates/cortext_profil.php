<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cortext Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Plateforme Cortext Manager" />
<meta name="keywords" content="manager,corpus,texte" />  
<link href="css/reset.css" type="text/css" rel="stylesheet" />  
<link href="css/style-general.css" type="text/css" rel="stylesheet" />
<link href="css/style-profil.css" type="text/css" rel="stylesheet" />
<link href="css/style-menu-profil.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-left_projet.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-right_projet.css" type="text/css" rel="stylesheet" />
<link href="css/form-login.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="js/canvas_barreprogress.js"></script>
<script type="text/javascript" src="js/fonctions_form_barre_comment.js"></script>
<script type="text/javascript" src="lib/jquery.autogrowtextarea.js"></script>

</head>
<body onload="">
  	
<div id="conteneur-principal">
    
    <div id="barre-top">
    
    <div id="menu">
    <a href="cortext_accueil.php"><img src="images/home2.png" alt="#" /></a>     
    <ul>
    <li class="menu1"><a href="#"> projects</a></li>  
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
 
 </div> <!--fin barre-top pour position:fixed-->
    
   <div class="effacement"></div>
 
    
	<div id="contener" class="logo">

	<!--contenu colone gauche -->    	
    <div id="sidebar-left">
    	<div id="barre-left">
        
        <div id="sid_1_projet">
        <h3>informations</h3>
      		<p>
			projects: 3 <br/>
			visualisations: 32<br/>
            analysis: 56 <br/>
            documents: 200<br/>
            messages: 555
		 	</p>
         </div>
         
         <div id="sid_2_projet"><a href="http://docs.cortext.net/">
         <img src="images/robots.png" alt="help" />
         <h3>you need help ?</h3>
         <h4>read documentation</h4>  </a>     
        </div>
                  
         <div id="sid_3_projet">         
         <h3>projects</h3>
         <p>
			algues vertes <br/>
			les économistes <br/>
            voix du nord<br/>
            xxx xxx xxx<br/>
            xxx xxx xxx<br/>
            xxx xxx xxx<br/>
         	xxx xxx xxx
		 	</p>                  
         </div>
    
    	</div> <!--fin de barre-left-->
    	</div><!--fin de sidebar-left-->
    
    
	<!--contenu central -->       
  	<div id="main-content">    
    	<div class="user_cortext">
        
        <div id="gravatar">
         
         <div id="grav_photo">
         	<div id="grav_photocadre">
         	<div id="grav_photomat"></div>
         	</div>
         </div><!--fin div grav_photo -->  
         
        <div id="grav_user">            
         <h1>Chloé Duloquin</h1>
         <h2>Paris, France</h2>
         <h3>chloeduloquin@hotmail.fr</h3>
         <h3>www.chloeduloquin.fr</h3>
		</div>
        
        
         <div id="grav_data">
         <p>member since : 10.02.11</p>
         </div>
         
         <div id="grav_nb">
         	<div class="total">
            <h3>PROJECTS</h3><br/>
            <p>6</p>
            </div>
            <div class="total">
            <h3>VISUALISATIONS</h3><br/>
            <p>6</p>
            </div>
            <div class="total">
            <h3>ANALYSIS</h3><br/>
            <p>6</p>
            </div>
            <div class="total">
            <h3>DOCUMENTS</h3><br/>
            <p>6</p>
            </div>
            <div class="total2">
            <h3>MESSAGES</h3><br/>
            <p>6</p>
            </div>         
         </div>
          
                 
        </div><!--fin div gravatar -->         
    	</div><!--fin div user_cortext --> 
        
        <div id="profil_projet">
        
        	<div class="proj"></div>
            <div class="proj"></div>
            <div class="proj"></div>
            <div class="proj"></div>
            <div class="proj"></div>
            <div class="proj"></div>
    
        </div><!--fin div profil_projet --> 
         

    </div><!--fin contenu central -->
       

<!--contenu colonne droite -->    	        
    <div id="sidebar-right">
    
    	<div id="barre-right">
    	<div id="sid1">
        <a href="#"><h2>create new project</h2></a>
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
        
   	<div id="logo"></div>
              
   </div> <!--fin barre<-->
   </div><!--fin colonne droite -->    	        
    
    </div><!--fin du contener-->       
	</div> <!--fin du conteneur principal (englobe menu)-->
</body>
</html>
