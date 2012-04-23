<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Cortext Manager</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="Plateforme Cortext Manager" />
<meta name="keywords" content="manager,corpus,texte" />  
<link href="css/reset.css" type="text/css" rel="stylesheet" />  
<link href="css/style-general.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-left.css" type="text/css" rel="stylesheet" />
<link href="css/sidebar-right.css" type="text/css" rel="stylesheet" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/mootools/1.2.1/mootools-yui-compressed.js"></script>
<!--[if IE]><script type="text/javascript" src="/js/excanvas.js"></script><![endif]-->
<script type="text/javascript" src="js/Rectangle.js"></script>
<script type="text/javascript" src="js/ProgressBar.js"></script>


<script type="text/javascript">

window.addEvent('domready', function() {
	
// ------------------------- barre de progression pour "sidebar-right" --------------------

function script_progress_bar(name, div, a){
	var div_prog = document.createElement("div");
	div_prog.id = name+"_progressbar";
	document.getElementById(div).appendChild(div_prog);

	var pb = new ProgressBar({
		id: name+"_progressbar_canvas",
		injectInto: div_prog.id,
		width: 240,
		height: 10
	}).set(a);
	
}

for(var i = 1; i < 4; i++){
	script_progress_bar("container"+i, "container"+i, Math.floor(Math.random() * 100) );
}

// ------------------------- barre de progression pour "sidebar-left" essai pour créer 2 div--------------------

function user_progress_bar(name, div, a, b){
	var div_prog = document.createElement("div");
	div_prog.id = name+"_progressbar";
	document.getElementById(div).appendChild(div_prog);
	

	var pb = new ProgressBar({
		id: name+"_progressbar_canvas",
		injectInto: div_prog.id,
		width:240,
		height: 10
	}).set(a);
	
	
	
var pb = new ProgressBar({
		id: name+"_progressbar_canvas2",
		injectInto: div_prog.id,
		width: 280,
		height:10,
		progressbarGradientColors: ["#8C5DA3"]
	}).set(b);

		
}

for(var i = 1; i < 5; i++){
    var a = Math.floor(Math.random() * 50);
    var b = Math.floor(Math.random() * 50);
 
    user_progress_bar("contain"+i, "contain"+i, a+b, a);
}	



});








//bill
//pb4 = new ProgressBar({
//		id: "myProgBar4",
//		injectInto: "container4",
//		width: 245,
//		height: 8,
//		progressbarGradientColors: ["#8C5DA3"]
		//progressbarGradientColors: ["#FFF", "#F36"]
	//}).set(75);
//	
//pb5 = new ProgressBar({
//		id: "myProgBar5",
//		injectInto: "container5",
//		width: 245,
//		height: 8,
		//progressbarGradientColors: ["#8C5DA3"]
	//}).set(55);	
	
// bob
//pb6 = new ProgressBar({
//		id: "myProgBar6",
//		injectInto: "container6",
//		width: 245,
//		height: 8,
//		progressbarGradientColors: ["#8C5DA3"]
//		//progressbarGradientColors: ["#FFF", "#F36"]
//	}).set(45);
//	
//pb7 = new ProgressBar({
	//	id: "myProgBar7",
//		injectInto: "container7",
//		width: 245,
//		height: 8,
//		//progressbarGradientColors: ["#8C5DA3"]
//	}).set(15);		
//	
//	
//	// john
//pb8 = new ProgressBar({
//		id: "myProgBar8",
//		injectInto: "container8",
//		width: 245,
//		height: 8,
//		progressbarGradientColors: ["#8C5DA3"]
//		//progressbarGradientColors: ["#FFF", "#F36"]
//	}).set(15);
//	
//pb9 = new ProgressBar({
//		id: "myProgBar9",
//		injectInto: "container9",
//		width: 245,
//		height: 8,
//		//progressbarGradientColors: ["#8C5DA3"]
//	}).set(5);	
//	
//	// admin
//pb8 = new ProgressBar({
//		id: "myProgBar10",
//		injectInto: "container10",
//		width: 245,
//		height: 8,
//		progressbarGradientColors: ["#8C5DA3"]
//		//progressbarGradientColors: ["#FFF", "#F36"]
//	}).set(26);
//	
//pb9 = new ProgressBar({
//		id: "myProgBar11",
//		injectInto: "container11",
//		width: 245,
//		height: 8,
//		//progressbarGradientColors: ["#8C5DA3"]
//	}).set(22);	

	


</script>

</head>
<body>
  	
    <div id="menu"><img src="images/home.png" alt="#" /> 
    
    <ul>
    <li class="menu1"><a href="#"> algues vertes</a></li>
    <li class="menu2"><a href="#"> tam kien duong</a></li>
    </ul></div>
    
    
    
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
<!--         <div class="barre-progress"></div>
-->			<div id="contain1"></div>       
<!--<div id="container5"></div>
-->  
         <span class="name">bob</span>
         <div id="contain2"> </div>       
<!--    <div id="container7"></div>     <div class="barre-progress"></div>
-->         
         <span class="name">john</span> 
         <div id="contain3"> </div>      
<!--  <div id="container9"></div>        <div class="barre-progress"></div>
-->         
         <span class="name">admin</span>
        <div id="contain4"> </div>      
<!--     <div id="container11"></div>     <div class="barre-progress"></div>
-->		</div>
        
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
        <div id="container1"></div>      
<!--       <div class="barre"></div>
-->       <span class="an3">tam kien duong</span>            
    </div>
 
    <div id="analysis2">
    	<span class="an1">analysis.py</span>
       	<span class="an2">10.03.2012</span> 
        <div id="container2"></div>           
<!--        <div class="barre"></div>
-->        <span class="an3">tam kien duong</span>        
    </div>
    
       <div id="analysis3">
       <span class="an1">analysis.py</span>
       	<span class="an2">10.03.2012</span>
        <div id="container3"></div>      
<!--       <div class="barre"></div>
-->       <span class="an3">tam kien duong</span>           
       </div>

       
    </div>
    
    <img src="images/logo.png" alt="" />
    
    
    </div>
      






	</div>

</body>
</html>
