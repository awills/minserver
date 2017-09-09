
	gridtransid=function(){return 'gridtransform'} ;
	actiontransid=function(){return 'actiontransform'} ;
	changeIds=function(id, newid){window[id].id=newid} ;
	
	var
	tmpl="<div id='grid&bullets;' class='grid lh1 mauto hoverbg'>  <div class='whitespace'>  <div class='hidden' style='height:25%;'></div>  <div class='content'>  <div id='action&bullets;' class='rel'>  <div class='lh4p pb0 position right zi1 hidden hoverstay'> <div class='ip'> <div class='ip'>  <div class='fattenall'> <div class='ip'> <div class='ip'>  <div class='fattenlr'> <p class='ip noov'> <a class='lh4m mtb0 lh5p lh1r button hoverborder' href='#'><span class='iplr'><span class='iplr'>Like</span></span></a><a class='lh4m mtb0 lh5p lh1r button ihidden hoverborder' href='#'><span class='iplr'><span class='iplr'>Email</span></span></a><a class='lh4m mtb0 lh5p lh1r button hoverborder ihidden' href='#'><span class='iplr'><span class='iplr'>Comment</span></span></a><a class='lh4m mtb0 lh5p lh1r button hoverborder fr' href='#'><span class='iplr'><span class='iplr'>Save it</span></span></a> </p> </div>  <!--likes&comments to be hovers-->  </div> </div> </div>  </div> </div> </div>  </div>  <div class='lh4p'> <div class='ip'> <div class='ip'>  <div class='lh4p pb0'> <div class='ip'> <div class='ip'>  <div class='fattenlr'> <div class='ip'> <div class='ip'> <div class='ip'> <div class='ip'> <div class='ip'>  <div class='rel tc bglighter'> <div id='gid&bullets;' class='hide'>grid&bullets;</div><div id='aid&bullets;' class='hide'>action&bullets;</div> <a class='fill zoomincursor' onmouseover='changeIds(aid&bullets;.textContent, actiontransid())' onmouseout='changeIds(actiontransid(), aid&bullets;.textContent);' onclick='changeIds(gid&bullets;.textContent, gridtransid());'></a> <a class='fill zoomoutcursor ihidden' onclick='changeIds(gridtransid(), gid&bullets;.textContent);'></a>  <img style='height:&scaleheight;' class='scalewidth gifloader' src='&graphic;' align='absmiddle' width='&width;' height='&height' />  </div>  </div> </div> </div>  </div> </div> </div>  </div> </div> </div>  <div class='lh4p fattentop'> <div class='ip'> <div class='ip'>  <div class='lh4p hidden'> <div class='ip'> <div class='ip'>  <div>  <table cellpadding='0' cellspacing='0'> <tr> <td> <a> <img class='ppic' src='&userpic;' align='absmiddle'/> </a> </td> <td> <span class='lh4p'></span> </td> <td style='width:100%;'> <span class=''>Shared &timing; ago by User</span> <br/> <b>&fullname;</b> </td> <td> <a class='lh5p lh1r button b0 bglight' href='&visitsite;' target='#'><span class='iplr'><span class='iplr'>Read</span></span></a> </td> </tr> </table>  </div>  </div> </div> </div>  <div class='lh4p'> <div class='ip'> <p class='ip'>&desc;</p> <p class='ip color3'> &homepage;<span class='iplr'><span class='ipl'></span></span><span class='icon'>&nbsp;</span><span class='iplr'>&visits;</span> </p> </div> </div>  <div class='lh4p unhidden'> <div class='ip'> <div class='ip color3'>  <div>  <table cellpadding='0' cellspacing='0'> <tr> <td> <a> <img class='ppicbase' src='&userpic;' align='absmiddle'/> </a> </td> <td> <span class='lh4p'></span> </td> <td style='width:100%;'> <b>&username;</b> </td> </tr> </table>  </div>  </div> </div> </div>  </div> </div> </div>  </div> </div> </div>  </div><!--content-->  <div class='hidden' style='height:50%;'></div>  </div><!--whitespace--> </div><!--grid-->" ;
	
	var
	minhome ,
	fc=1 ,
	fname="homecontent.html#review" ;

	minhome=minsrv(fname, tmpl, function(s){
	
		s.grid("") ;
		
		// eop
		
		if(s.type=="resize") return ;

		s.anchor.href=fname.split('.').join(fc+'.') ;
		fc++ 
		
	}) ;
	
	minsrv("blank.html#title", "&text;", function(s){
		
		if(s.type=="resize") return ;
		
		window.targ1=s.target ;
		
		s.preventDefault() ;
		s.overwrite() ;
		
		switch(s.anchor.pathname.split('/').reverse()[0]){
			
			case "popular.html":
				s.serve(fname="popularcontent.html#review", fc=1, minhome) ;
			break;
			case "newest.html":
				s.serve(fname="newestcontent.html#review", fc=1, minhome)
			break;
			case "mydets.html":
				s.serve(fname="mydetscontent.html#review", fc=1, minhome)
			return
			break;
			case "likes.html":
				s.serve(fname="likescontent.html#review", fc=1, minhome)
			break;
		}
		
	}) ;
