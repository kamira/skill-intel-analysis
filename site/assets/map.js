/* 地理熱度圖。陸塊多邊形與熱度核心沿用 CHG-20260828-02 的實作。 */
"use strict";
(function(g){
var IA=g.IA, esc=IA.esc;
var LAND=[
[[-168,66],[-166,60],[-158,56],[-152,58],[-145,60],[-136,58],[-130,52],[-124,46],[-122,37],[-117,32],[-113,28],[-106,23],[-97,20],[-92,16],[-86,13],[-83,9],[-79,9],[-83,15],[-87,20],[-91,25],[-95,29],[-88,30],[-82,26],[-80,32],[-75,36],[-70,42],[-66,45],[-60,47],[-56,52],[-64,56],[-76,57],[-78,62],[-85,63],[-95,62],[-92,68],[-105,69],[-120,70],[-133,69],[-141,70],[-156,71]],
[[-45,60],[-38,65],[-30,68],[-22,71],[-20,76],[-25,81],[-35,83],[-50,82],[-58,79],[-55,72],[-52,66],[-48,61]],
[[-79,9],[-72,12],[-64,11],[-60,8],[-52,5],[-50,0],[-44,-2],[-38,-5],[-35,-8],[-38,-13],[-39,-18],[-45,-23],[-48,-25],[-53,-33],[-57,-35],[-62,-39],[-63,-42],[-66,-46],[-69,-52],[-75,-53],[-73,-45],[-74,-38],[-72,-30],[-70,-23],[-71,-18],[-77,-8],[-80,-4],[-81,2],[-77,7]],
[[-17,15],[-16,20],[-12,25],[-6,30],[0,32],[10,34],[20,32],[28,31],[33,31],[36,26],[38,18],[43,12],[48,11],[51,11],[45,5],[42,0],[41,-5],[40,-12],[35,-19],[33,-26],[28,-31],[25,-34],[19,-35],[15,-27],[12,-18],[13,-10],[9,-1],[9,4],[3,6],[-4,5],[-9,5],[-13,9],[-16,12]],
[[-10,37],[-9,43],[-2,43],[0,49],[-5,50],[1,51],[4,53],[8,54],[10,58],[14,56],[18,59],[21,60],[25,65],[21,70],[28,71],[40,68],[55,68],[68,68],[75,73],[90,75],[105,77],[113,74],[130,72],[142,72],[160,70],[172,67],[180,66],[180,60],[170,60],[163,57],[156,52],[144,45],[140,42],[132,42],[130,42],[129,38],[127,35],[126,34],[126,37],[124,39],[121,39],[122,31],[121,25],[110,21],[105,10],[103,2],[97,8],[95,16],[92,21],[88,21],[80,15],[77,8],[73,20],[68,24],[62,25],[57,25],[50,29],[44,29],[40,24],[35,28],[36,36],[30,40],[26,40],[23,38],[19,40],[13,38],[12,45],[7,44],[3,43],[-3,36]],
[[-5,50],[-3,54],[-5,58],[-2,58],[0,53],[1,51]],[[-10,52],[-6,52],[-6,55],[-10,55]],[[-24,64],[-14,65],[-15,66],[-22,66]],
[[129,32],[132,33],[136,35],[140,36],[141,40],[145,44],[143,44],[139,38],[135,34],[131,31]],
[[120,22],[122,25],[121,25],[120,22]],[[120,18],[124,18],[126,13],[126,7],[122,6],[119,11]],
[[95,5],[100,0],[106,-6],[104,-6],[98,2]],[[109,2],[117,4],[118,-1],[114,-4],[110,-3]],[[105,-6],[114,-8],[114,-7],[105,-5]],
[[131,-1],[141,-3],[150,-9],[141,-9],[133,-4]],
[[113,-22],[114,-26],[115,-34],[118,-35],[129,-32],[135,-35],[140,-38],[147,-38],[150,-37],[153,-28],[146,-19],[142,-11],[137,-12],[132,-11],[126,-14],[121,-20]],
[[166,-46],[170,-44],[173,-41],[175,-37],[177,-38],[174,-41],[171,-45]],[[43,-12],[50,-15],[47,-25],[44,-20]],
[[80,6],[82,7],[81,9]],[[-84,22],[-77,20],[-74,20],[-79,23]]];

var RAMP=[[20,25,34],[58,48,80],[122,53,80],[184,86,60],[224,145,60],[247,212,107]];
function rampAt(t){t=Math.max(0,Math.min(1,t));var s=(RAMP.length-1)*t,i=Math.min(RAMP.length-2,Math.floor(s)),f=s-i,a=RAMP[i],b=RAMP[i+1];
  return [Math.round(a[0]+(b[0]-a[0])*f),Math.round(a[1]+(b[1]-a[1])*f),Math.round(a[2]+(b[2]-a[2])*f)];}
function inPoly(x,y,p){var h=false;for(var i=0,j=p.length-1;i<p.length;j=i++){var xi=p[i][0],yi=p[i][1],xj=p[j][0],yj=p[j][1];
  if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))h=!h;}return h;}
var LAT_TOP=82,LAT_BOT=-58,STEP=2,SIGMA=8,DOTS=null,markers=[];

g.drawGeoMap=function(cvs,tip,COUNT){
  var ctx=cvs.getContext("2d");
  var MARKS=g.GEO.filter(function(c){return COUNT[c[0]];}).map(function(c){
    return {n:c[0],lon:c[1][0],lat:c[1][1],w:COUNT[c[0]]};});
  function buildDots(){
    var d=[];
    for(var lat=LAT_TOP;lat>=LAT_BOT;lat-=STEP) for(var lon=-180;lon<=180;lon+=STEP){
      var land=false;
      for(var p=0;p<LAND.length;p++){ if(inPoly(lon,lat,LAND[p])){land=true;break;} }
      if(!land) continue;
      var h=0;
      for(var k=0;k<MARKS.length;k++){var c=MARKS[k],dx=(lon-c.lon)*Math.cos(lat*Math.PI/180),dy=lat-c.lat;
        h+=c.w*Math.exp(-(dx*dx+dy*dy)/(2*SIGMA*SIGMA));}
      d.push({lon:lon,lat:lat,h:h});
    }
    var m=d.reduce(function(x,o){return Math.max(x,o.h);},0)||1;
    d.forEach(function(o){o.t=Math.pow(o.h/m,.62);});
    return d;
  }
  function draw(){
    var W=Math.max(360,cvs.parentElement.clientWidth-20),
        H=Math.round(W*(LAT_TOP-LAT_BOT)/360), dpr=g.devicePixelRatio||1;
    cvs.width=W*dpr; cvs.height=H*dpr; cvs.style.width=W+"px"; cvs.style.height=H+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,W,H);
    if(!DOTS) DOTS=buildDots();
    var px=function(lon){return (lon+180)/360*W;}, py=function(lat){return (LAT_TOP-lat)/(LAT_TOP-LAT_BOT)*H;};
    var cell=W/180*STEP*.42;
    DOTS.forEach(function(o){
      var c=rampAt(o.t);
      ctx.fillStyle="rgba("+c[0]+","+c[1]+","+c[2]+","+(0.30+o.t*0.70).toFixed(3)+")";
      ctx.beginPath(); ctx.arc(px(o.lon),py(o.lat),Math.max(.7,cell),0,6.2832); ctx.fill();
    });
    markers=MARKS.map(function(c){
      var x=px(c.lon),y=py(c.lat),r=Math.min(10,3.2+Math.sqrt(c.w)*1.15);
      ctx.beginPath(); ctx.arc(x,y,r,0,6.2832);
      ctx.strokeStyle="rgba(240,162,75,.85)"; ctx.lineWidth=1.1; ctx.stroke();
      ctx.fillStyle="rgba(240,162,75,.14)"; ctx.fill();
      return {x:x,y:y,r:Math.max(r,7),n:c.n,w:c.w};
    });
  }
  cvs.addEventListener("mousemove",function(e){
    var b=cvs.getBoundingClientRect(),mx=e.clientX-b.left,my=e.clientY-b.top,hit=null;
    for(var i=0;i<markers.length;i++){var m=markers[i];
      if((mx-m.x)*(mx-m.x)+(my-m.y)*(my-m.y)<=m.r*m.r){hit=m;break;}}
    if(hit){ tip.classList.add("on"); tip.style.left=hit.x+"px"; tip.style.top=hit.y+"px";
      tip.querySelector(".n").textContent=hit.n;
      tip.querySelector(".d").textContent=hit.w+" 條關聯鏈"; }
    else tip.classList.remove("on");
  });
  cvs.addEventListener("mouseleave",function(){tip.classList.remove("on");});
  draw();
  var rt; g.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(draw,140);});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(draw);
  return draw;
};
})(window);
