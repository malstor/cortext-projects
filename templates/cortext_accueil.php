<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cortext Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Plateforme Cortext Manager" />
<meta name="keywords" content="manager,corpus,texte" />  
<link href="css/reset.css" type="text/css" rel="stylesheet" />  
<link href="css/style-menu-accueil.css" type="text/css" rel="stylesheet" />
<link href="css/style-accueil.css" type="text/css" rel="stylesheet" />
<link href="css/formulaire-accueil.css" type="text/css" rel="stylesheet" />

</head>
<body onload="">
  	    
<!--    <div id="barre-top">
-->    
    <div id="menu"> 
    <a href="#"><img src="images/home2.png" alt="#" /></a>      
   </div> <!--fin de menu-->  
 
<!-- </div>--> <!--fin barre-top pour position:fixed-->
    
	<div class="effacement"></div>
     
	<div id="contener-accueil">


	<div id="accueil" class="b<?php echo rand(1, 3);?>">
	<div id="wel"> 
    <h1>Welcome to Cortext Manager<img src="images/logo-petit.png" alt="#" /></h1>
    </div>
    </div>
            
    <div id="login_accueil">
      
		<form class="member" action="cortext_projet.php" method="post">
        <span class="sign">sign in</span>
         <br/>
     	<label class="user">username
        <input name="username" type="text" value="" />
        </label> <br /><br />
        <label class="password">password
        <input name="password" type="password" value="" />
        </label>
        <input class="enter" type="submit" name="submit" value="login" />    
        </form>
    
    </div>

    <div id="login_accueil2">
      
      	<form class="member2" action="cortext_accueil2.php" method="post">
        <span class="phrase">apply for an account</span> <br/>
                     
        <label class="first">first name
        <input name="first" type="text" value="" />
        </label> <br /><br />
        
        <label class="last">last name
        <input name="last" type="text" value="" />
        </label> <br /><br />
        
        <label class="email">email 
        <input name="email" type="mail" value="" />
        </label> <br /><br />
        
        <label class="password2">password
        <input name="password" type="password" value="" />
        </label>
        <input class="enter2" type="submit" name="submit" value="sign up"/>   
        </form>
	
     </div> 	        
    
    </div><!--fin du contener--> 
      
</body>
</html>
