<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cortext Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Plateforme Cortext Manager" />
<meta name="keywords" content="manager,corpus,texte" />  
<link href="css/reset.css" type="text/css" rel="stylesheet" />  
<link href="css/style-menu-accueil.css" type="text/css" rel="stylesheet" />
<link href="css/style-accueil2.css" type="text/css" rel="stylesheet" />
<link href="css/formulaire-accueil2.css" type="text/css" rel="stylesheet" />

</head>
<body onload="">
  	    
<!--    <div id="barre-top">
-->    
    <div id="menu"> 
    <a href="cortext_accueil.php"><img src="images/home2.png" alt="#" /></a>     
   
   </div> <!--fin de menu-->  
 
<!-- </div>--> <!--fin barre-top pour position:fixed-->
    
   <div class="effacement"></div>
 
    
	<div id="contener-accueil">


      <div id="login_accueil">
      
      <form class="member2" action="" method="post">
        <span class="phrase">Welcome to Cortext Manager - Apply for an account</span> <br/>
     
     	<label class="user2">username
        <input name="username" type="text" value="" />
        </label> <br /><br />
        
        
        <label class="first">first name
        <input name="first" type="text" value="" />
        </label> <br /><br />
        
        <label class="last">last name
        <input name="last" type="text" value="" />
        </label> <br /><br />
                      
        <label class="password2">password
        <input name="password" type="password" value="" />
        </label><br /><br />
        
       	<label class="institut">institution
        <input name="institut" type="text" value="" />
        </label><br /><br />  
        
        <label class="email">email 
        <input name="email" type="email" value="" />
        </label> <br /><br />
        
        <label class="text1">Purpose of use
		<textarea id="purpose" name="purpose1" cols="30" rows="4"></textarea>        
         </label><br /><br />
        
        <label class="text2">Related Project
		<textarea id="project" name="project1" cols="30" rows="4"></textarea>        
        </label> <br /><br />
        
        
        
        <input class="enter" type="submit" name="submit" value="create my account" />    
        </form>
 
      </div> 	        
    
    </div><!--fin du contener--> 
      
</body>
</html>
