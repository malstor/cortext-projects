<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cortext Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Plateforme Cortext Manager" />
<meta name="keywords" content="manager,corpus,texte" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />  
<link href="css/style-general-test.css" type="text/css" rel="stylesheet" />
<link href="css/style-projet.css" type="text/css" rel="stylesheet" />
<link href="css/style-menu-projet.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-left_projet.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-right_projet.css" type="text/css" rel="stylesheet" />
<link href="css/form-login.css" type="text/css" rel="stylesheet" />
<link href="css/bouton-style.css" type="text/css" rel="stylesheet" />
<link href="css/style-projet2.css" type="text/css" rel="stylesheet" />



<!-- The JavaScript -->
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
		<script type="text/javascript" src="lib/jquery.easing.1.3.js"></script>
        <script type="text/javascript">
            $(function() {
				/**
				* for each menu element, on mouseenter, 
				* we enlarge the image, and show both sdt_active span and 
				* sdt_wrap span. If the element has a sub menu (sdt_box),
				* then we slide it - if the element is the last one in the menu
				* we slide it to the left, otherwise to the right
				*/
                $('#sdt_menu > li').bind('mouseenter',function(){
					var $elem = $(this);
					$elem.find('img')
						 .stop(true)
						 .animate({
							'width':'170px',
							'height':'122px',
							'left':'0px'
						 },400,'easeOutBack')
						 .andSelf()
						 .find('.sdt_wrap')
					     .stop(true)
						 .animate({'top':'100px'},500,'easeOutBack')
						 .andSelf()
						 .find('.sdt_active')
					     .stop(true)
						 .animate({'height':'65px'},300,function(){
						var $sub_menu = $elem.find('.sdt_box');
						if($sub_menu.length){
							var left = '170px';
							if($elem.parent().children().length == $elem.index()+1)
								left = '-170px';
							$sub_menu.show().animate({'left':left},200);
						}	
					});
				}).bind('mouseleave',function(){
					var $elem = $(this);
					var $sub_menu = $elem.find('.sdt_box');
					if($sub_menu.length)
						$sub_menu.hide().css('left','0px');
					
					$elem.find('.sdt_active')
						 .stop(true)
						 .animate({'height':'0px'},300)
						 .andSelf().find('img')
						 .stop(true)
						 .animate({
							'width':'0px',
							'height':'0px',
							'left':'85px'},400)
						 .andSelf()
						 .find('.sdt_wrap')
						 .stop(true)
						 .animate({'top':'25px'},500);
				});
            });
        </script>

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
 
    
	<div id="container" class="logo">

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
    
    
    
    <div class="create">
    
    
           	<div id="logo-icon"></div>

	<div id="speech"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
    <ul id="sdt_menu" class="sdt_menu">
    

				<li class="project-bt">
					
						<a href="#">
						<img src="images/5.jpg" alt=""/>
						<span class="sdt_active"></span>
						<span class="sdt_wrap">
                        <span class="sdt_link">Projects</span>
						<span class="sdt_descr">CREATE A NEW PROJECT</span>
						</span>
					</a>
				</li>
                
               
				<li class="corpus-bt">
              
					<a href="#">
						<img src="images/6.jpg" alt=""/>
						<span class="sdt_active active"></span>
					<span class="sdt_wrap">
							<span class="sdt_link">Corpus</span>
							<span class="sdt_descr">ADD A NEW CORPUS</span>
						</span>
					</a>
				</li>
			</ul>
   </div>
    	<div class="projet_cortext">
        
         <h1><a href="cortext_index1.php">Algues Vertes</a></h1>	
         <span class="date">10.05.12</span>
 
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>
        </div><!--fin de derniere_actu-->
                      
        <div class="derniere_actu2">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Jean-philippe C<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>        
        </div>
        
     	<div class="derniere_actu">
       	
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>
		</div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Philippe B<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">15.05.12</div>
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title"><a href="#">augmentation des données</a></div>
        <div class="date_actu">14.05.12</div>
        </div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">co-occurences.pdf</a></div></div>
        <div class="date_actu">11.05.12</div>
        </div>
               
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
                
     	<div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-ontologie.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>

        </div>
        <div class="title"><a href="#">calcul de cartographie</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
        <div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-phase.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
        </div><!--fin div projet -->
           
        
        <div class="projet_cortext">
        <div class="titreprojet"></div>
         <h1><a href="cortext_index1.php">Voix du Nord</a></h1>
         <span class="date">10.05.12</span>
 
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>
        </div><!--fin de derniere_actu-->
              
        
        <div class="derniere_actu2">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Jean-philippe C<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>        
        </div>
        
        
     	<div class="derniere_actu">
       	
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>
		</div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Philippe B<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">15.05.12</div>        
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title"><a href="#">augmentation des données</a></div>
        <div class="date_actu">14.05.12</div>
        </div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">co-occurences.pdf</a></div></div>
        <div class="date_actu">11.05.12</div>
        </div>
                
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
                
     	<div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-ontologie.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>

        </div>
        <div class="title"><a href="#">calcul de cartographie</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
        <div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-phase.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
         
     
        </div><!--fin div projet --> 
          
        
        <div class="projet_cortext">
        <div class="titreprojet"></div>
	    <h1><a href="cortext_index1.php">Les économistes</a></h1>
		<span class="date">10.05.12</span>
 
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>
        </div><!--fin de derniere_actu-->
              
        
        <div class="derniere_actu2">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Jean-philippe C<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>
        </div>
        
        
     	<div class="derniere_actu">
       	
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>
		</div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Philippe B<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">15.05.12</div>
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title"><a href="#">augmentation des données</a></div>
        <div class="date_actu">14.05.12</div>
        </div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">co-occurences.pdf</a></div></div>
        <div class="date_actu">11.05.12</div>
        </div>
                
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
               
     	<div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-ontologie.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>

        </div>
        <div class="title"><a href="#">calcul de cartographie</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
        <div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-phase.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
    
        </div><!--fin div projet -->   
        
        
        <div class="projet_cortext">
        <div class="titreprojet"></div>
         <h1><a href="cortext_index1.php">Algues Vertes</a></h1> 
         <span class="date">10.05.12</span>
 
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>

        </div><!--fin de derniere_actu-->
              
        
        <div class="derniere_actu2">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Jean-philippe C<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>       
        </div>
               
     	<div class="derniere_actu">
       	
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">14.05.12</div>
		</div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Philippe B<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">Re : new project “algues vertes”</a></div>
        <div class="date_actu">15.05.12</div>
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title"><a href="#">augmentation des données</a></div>
        <div class="date_actu">14.05.12</div>
        </div>
        
     	<div class="derniere_actu2">
        
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation<br/>
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">co-occurences.pdf</a></div></div>
        <div class="date_actu">11.05.12</div>
        </div>
                
     	<div class="derniere_actu">
        
        <div class="img_actu"><img src="images/post_actu.png" alt="post" /></div>
        <div class="autor">
        Tam-Kien D<br/>
        <div class="min_autor">message posted by</div>
        </div>
        <div class="title"><a href="#">new project “algues vertes”</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
                
     	<div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-ontologie.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
     	<div class="derniere_actu">
        
		<div class="img_actu"><img src="images/script_actu.png" alt="post" /></div>
        <div class="autor">
        Script<br/>
        <div class="min_autor"></div>

        </div>
        <div class="title"><a href="#">calcul de cartographie</a></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
        <div class="derniere_actu2">
       	
		<div class="img_actu"><img src="images/visual_actu3.png" alt="post" /></div>
        <div class="autor">
        Visualisation <br/>       
        <div class="min_autor"></div>
        </div>
        <div class="title-pdf"><div class="pdf"><a href="#">tubes-phase.pdf</a></div></div>
        <div class="date_actu">10.05.12</div>
        </div>
        
    </div><!--fin div projet -->   

    </div><!--fin contenu central -->
       

<!--contenu colonne droite -->    	        
    <div id="sidebar-right">
    
    	<div id="barre-right">
    	<div id="sid1">

         
        </div>
        
    	<!--<div id="sid2">
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
       	</div>-->
                         
    </div> <!-- fin side2 -->   
        
<!--   	<div id="logo"></div>
-->              
   </div> <!--fin barre<-->
   </div><!--fin colonne droite -->    	        
    
    </div><!--fin du contener-->       
	</div> <!--fin du conteneur principal (englobe menu)-->
</body>
</html>
