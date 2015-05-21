function init(o){world=document.querySelector(".world"),worldBg=document.querySelector(".world-bg"),worldBg.style.backgroundImage="url("+URLS.bg+")",globe=document.querySelector(".world-globe"),globeContainer=document.querySelector(".world-globe-doms-container"),globePole=document.querySelector(".world-globe-pole"),globeHalo=document.querySelector(".world-globe-halo"),globeHalo.style.backgroundImage="url("+URLS.halo+")",regenerateGlobe(),world.ondragstart=function(){return!1},world.addEventListener("mousedown",onMouseDown),world.addEventListener("mousemove",onMouseMove),world.addEventListener("mouseup",onMouseUp),world.addEventListener("touchstart",touchPass(onMouseDown)),world.addEventListener("touchmove",touchPass(onMouseMove)),world.addEventListener("touchend",touchPass(onMouseUp)),loop()}function touchPass(o){return function(e){e.preventDefault(),o.call(this,{pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY})}}function onMouseDown(o){isMouseDown=!0,dragX=o.pageX,dragY=o.pageY,dragLat=config.lat,dragLng=config.lng}function onMouseMove(o){if(isMouseDown){var e=o.pageX-dragX,t=o.pageY-dragY;config.lat=clamp(dragLat+.5*t,-90,90),config.lng=clampLng(dragLng-.5*e,-180,180)}}function onMouseUp(o){isMouseDown&&(isMouseDown=!1)}function regenerateGlobe(){var o,e,t,n;for(globeDoms=[];o=globeContainer.firstChild;)globeContainer.removeChild(o);var r=config.segX,s=config.segY,a="url("+URLS.diffuse+")",i=1600/r|0,l=800/s|0;vertices=[];var c,g=268,d=0,p=2*Math.PI,f=0,u=Math.PI;for(n=0;s>=n;n++){for(c=[],t=0;r>=t;t++){var m=t/r,h=.05+n/s*.9,b={x:-g*Math.cos(d+m*p)*Math.sin(f+h*u),y:-g*Math.cos(f+h*u),z:g*Math.sin(d+m*p)*Math.sin(f+h*u),phi:d+m*p,theta:f+h*u};c.push(b)}vertices.push(c)}for(n=0;s>n;++n)for(t=0;r>t;++t)o=document.createElement("div"),e=o.style,e.position="absolute",e.width=i+"px",e.height=l+"px",e.overflow="hidden",e[PerspectiveTransform.transformOriginStyleName]="0 0",e.backgroundImage=a,o.perspectiveTransform=new PerspectiveTransform(o,i,l),o.topLeft=vertices[n][t],o.topRight=vertices[n][t+1],o.bottomLeft=vertices[n+1][t],o.bottomRight=vertices[n+1][t+1],e.backgroundPosition=-i*t+"px "+-l*n+"px",globeContainer.appendChild(o),globeDoms.push(o)}function loop(){requestAnimationFrame(loop),render()}function render(){!config.autoSpin||isMouseDown||isTweening||(config.lng=clampLng(config.lng-.2)),rX=config.lat/180*Math.PI,rY=(clampLng(config.lng)-270)/180*Math.PI,globePole.style.display=config.isPoleVisible?"block":"none",globeHalo.style.display=config.isHaloVisible?"block":"none";var o=Math.pow(config.zoom,1.5);pixelExpandOffset=1.5+-1.25*o,o=1+3*o,globe.style[transformStyleName]="scale3d("+o+","+o+",1)",o=1+.3*Math.pow(config.zoom,3),worldBg.style[transformStyleName]="scale3d("+o+","+o+",1)",transformGlobe()}function clamp(o,e,t){return e>o?e:o>t?t:o}function clampLng(o){return(o+180)%360-180}function transformGlobe(){var o,e,t,n,r,s,a,i,l,c,g,d;if(tick^=1){sinRY=Math.sin(rY),sinRX=Math.sin(-rX),sinRZ=Math.sin(rZ),cosRY=Math.cos(rY),cosRX=Math.cos(-rX),cosRZ=Math.cos(rZ);var p=config.segX,f=config.segY;for(n=0;f>=n;n++)for(c=vertices[n],t=0;p>=t;t++)rotate(l=c[t],l.x,l.y,l.z);for(n=0;f>n;n++)for(t=0;p>t;t++)o=globeDoms[t+p*n],r=o.topLeft,s=o.topRight,a=o.bottomLeft,i=o.bottomRight,expand(r,s),expand(s,a),expand(a,i),expand(i,r),e=o.perspectiveTransform,e.topLeft.x=r.tx,e.topLeft.y=r.ty,e.topRight.x=s.tx,e.topRight.y=s.ty,e.bottomLeft.x=a.tx,e.bottomLeft.y=a.ty,e.bottomRight.x=i.tx,e.bottomRight.y=i.ty,e.hasError=e.checkError(),(e.hasError=e.checkError())||e.calc()}else for(g=0,d=globeDoms.length;d>g;g++)e=globeDoms[g].perspectiveTransform,e.hasError?e.style[transformStyleName]="translate3d(-8192px, 0, 0)":e.update()}function goTo(o,e){var t=o-config.lat,n=e-config.lng,r=Math.sqrt(t*t+n*n);isTweening=!0,TweenMax.to(config,.01*r,{lat:o,lng:e,ease:"easeInOutSine"}),TweenMax.to(config,1,{delay:.01*r,zoom:1,ease:"easeInOutSine",onComplete:function(){isTweening=!1}})}function rotate(o,e,t,n){x0=e*cosRY-n*sinRY,z0=n*cosRY+e*sinRY,y0=t*cosRX-z0*sinRX,z0=z0*cosRX+t*sinRX;var r=1+z0/4e3;x1=x0*cosRZ-y0*sinRZ,y0=y0*cosRZ+x0*sinRZ,o.px=x1*r,o.py=y0*r}function expand(o,e){var t=e.px-o.px,n=e.py-o.py,r=t*t+n*n,s;return 0===r?(o.tx=o.px,o.ty=o.py,e.tx=e.px,void(e.ty=e.py)):(s=pixelExpandOffset/Math.sqrt(r),t*=s,n*=s,e.tx=e.px+t,e.ty=e.py+n,o.tx=o.px-t,void(o.ty=o.py-n))}!function(){for(var o,e=function(){},t=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],n=t.length,r=window.console=window.console||{};n--;)o=t[n],r[o]||(r[o]=e)}();var config={percent:0,lat:0,lng:0,segX:14,segY:12,isHaloVisible:!0,isPoleVisible:!0,autoSpin:!0,zoom:.15,skipPreloaderAnimation:!1,goToBristol:function(){goTo(51.45,2.5833)}},imgs,preloader,preloadPercent,globeDoms,vertices,world,worldBg,globe,globeContainer,globePole,globeHalo,pixelExpandOffset=1.5,rX=0,rY=0,rZ=0,sinRX,sinRY,sinRZ,cosRX,cosRY,cosRZ,dragX,dragY,dragLat,dragLng,isMouseDown=!1,isTweening=!1,tick=1,URLS={bg:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_bg.jpg",diffuse:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_diffuse.jpg",halo:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_halo.png"},transformStyleName=PerspectiveTransform.transformStyleName;init();