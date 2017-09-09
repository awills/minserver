/*
	05-04-17
	github.com/awills/minserver.git
*/
/*
	Copyright 2017 Abraham Williams

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
(function(){
	
	var
	ael=function(type, f, el){
		
		var
		t ;
		
		el[(t=window.attachEvent || window.document.attachEvent)? 'attachEvent': 'addEventListener']((t? 'on': '')+type, f, false)
	} ;
	
	var
	func=[] ;
	
	var
	onEOP=function(f){
		
		if(f){
			
			func.push(f) ;
			return
		}
		
		var
		scrolly=window.document.body.scrollTop ,
		innerh=window.document.body.clientHeight ,
		pageh=window.document.body.scrollHeight ;
		
		var
		t ;
		
	/*	unmiss*/
		if((t=pageh-scrolly)==innerh++ || t==innerh){
			
			var
			l=func.length ,
			a=0 ;
			
			for(; a<l; a++) func[a]() ;
		}
	} ;
	
	ael('scroll', function(){onEOP()}, window) ;
	
	var
	autoa=function(el, gw, gh, c){
		
		var
		resize=function(w, h){
			
			el.style.width=w ;
			el.style.height=h
		} ;
		
		var
		position=function(i, x, y){
			
			el.children[i].style.left=x+'px' ;
			el.children[i].style.top=y+'px'
		} ;
		
		var
		sizeof=function(i, p){
			return el.children[i][{width:'offsetWidth', height:'offsetHeight'}[p]]
		} ;
		
		var
		l=el.children.length ,
		a ,
		b ,
		loaf ,
		oat=gw ,
		h=[] ;
		
		for(a=0; a<c; a++){
			
			loaf=gw ;
			
			for(b=a; b<l; b+=c){
				
				position(b, oat, loaf) ;
				loaf+=sizeof(b, 'height')+gh ;
				h[a]=loaf
			}
			
		/*	[].push*/
			oat+=sizeof(0, 'width')+gw
		}
		
		h.sort(function(a, b){if (a > b) return 1; if (a < b) return -1; return 0}).reverse() ;
		resize(oat, h[0])
	} ;
	
	var
	autog=function(maxw, w, c){
		return (w>maxw)? 0: (maxw-w)/(c+1)
	} ;
	
	var
	autow=function(minw, g, c){
		return minw*c+g*(c+1)
	} ;
	
	var
	autoc=function(minw, maxw, g, minc, maxc){
		
		var
		c=parseInt(maxw/minw) ,
		w=minw*c+g*(c+1) ,
		tm ;
		
		while(w>maxw){
			c-- ;
			w=minw*c+g*(c+1)
		}
		
		return c=(c>=(tm=maxc) || c<=(tm=minc))? tm: c ;
	} ;
	
	var
	exports=function(collection, el, html){
		
		var
		decode=function(s, attrsrc, trackel){
			
			var
			opendelim='&' ,
			closedelim=';' ,
			l=attrsrc.attributes.length ,
			a=0 ,
			t ;
			
		/*	id*/
			s=s.split(opendelim+'bullets'+closedelim).join(trackel.children.length) ;
			
			for(; a<l; a++){
				
				if({'null':1}[attrsrc.getAttribute(t=attrsrc.attributes[a].nodeName)]) continue ;
				s=s.split(opendelim+t+closedelim).join(attrsrc.getAttribute(t))
			}
			
			return s
		} ;
		
		var
		append=function(s, el){
			el.innerHTML+=s
		} ;
		
		var
		l=collection.length ,
		a=0 ;
		
		for(a; a<l; a++) append(decode(html, collection[a], el), el) ;
		
		return l
	} ;
	
	var
	oWidth=function(el, bool){
		
		if(bool) el.style.width="" ;
		return el? el.offsetWidth: 0 ;
	} ;

/*	pub*/
	minref={
		init:function(name, html){
			
			var
			that ,
			restore ,
			func ;
			
		/*	trunc*/
			if((that=this)[name].overwrite) window[window[name].location.hash.split('#').join('')].innerHTML="" ;
			this[name].overwrite=false ;
			
			var
			ini={
				exports:exports(window[name].document.images, restore=window[window[name].location.hash.split('#').join('')], html) ,
				imports:restore.children.length ,
				type:that.type ,
				anchor:that[name].anchor ,
				width:0 ,
				minwidth:0 ,
				maxwidth:0 ,
				capacity:0 ,
				mincapacity:1 ,
				maxcapacity:100 ,
				gutter:0 ,
				gutterwidth:0 ,
				gutterheight:0 ,
				flag:0
			} ;
			
			ini.serve=function(href, bool, id){
				
				// prev type 'click'
				that.type='load' ;
				
				that[id].anchor.href=href || that[id].anchor.href ;
				that[id].overwrite=!!bool ;
				
				if(that[id]) that[id].anchor.click() ;
			} ;
			
			ini.target=function(e){
				
				that.type=e.type ;
				(that[name].anchor=e.target || e.srcElement).target=name 
			} ;
			
			ini.preventDefault=function(){
				that[name].preventDefault=true
			} ;
			
			ini.overwrite=function(){
				that[name].overwrite=true
			} ;
			
			ini.set=function(p, v){
				this[p]=(v==undefined)? this[p]: isNaN(v)? v: v*1
			} ;
			
			ini.grid=function(p, v){
				
				this.set(p, v) ;
				
				this.flag=1 ;
				this.minwidth=oWidth(restore.firstChild) ;
				this.maxwidth=oWidth(restore, true) ;
				this.capacity=autoc(this.minwidth, this.maxwidth, this.gutterwidth, this.mincapacity, this.maxcapacity) ;
				this.width=autow(this.minwidth, this.gutterwidth, this.capacity) ;
				this.gutter=autog(this.maxwidth, this.width, this.capacity) ;
				
				return this[p]
			} ;
			
			(func=function(){
				
				that[name].callback(ini) ;
				if(ini.flag && ini.imports) autoa(restore, ini.gutterwidth, ini.gutterheight, ini.capacity) ;
				
			})() ;
			
			if(ini.type=='load') ael(ini.type='resize', func, window) ;
		}
	} ;
	
	var
	x=0 ;
	
/*	pub*/
	minsrv=function(href, html, f){
		
		var
		a ,
		i ;
		
		minref[i='i'+x+'frame']={
			preventDefault:false ,
			overwrite:false ,
			callback:f || function(){}
		} ;
		
		document.write("<a id=\""+(a='a'+x+++'nchor')+"\" href=\""+href+"\" target=\""+i+"\"></a>") ;
		document.write("<iframe style=\"display:none;\" name=\""+i+"\" onload=\"minref.init('"+i+"', &quot;"+html+"&quot;)\"></iframe>") ;
		
		(minref[i].anchor=window[a]).click() ;
		
		onEOP(function(){
			
			if(!minref[i].preventDefault) window[a].click() ;
			minref.type='eop'
		}) ;
		
		minref.type='load' ;
		return i
	}
	
})() ;