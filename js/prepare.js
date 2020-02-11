// window.onbeforeunload = function() {
//   window.scrollTo(0,0);
// }

document.onreadystatechange = function(){

  window.onload = setTimeout(function(){
    $(".loading_gx").fadeOut();
    $("body").css({overflowY:"auto"});
  }, 5000);
}

var a,
  video_length = 80,
  video,
  scroller = document.getElementById('mask'),
  text1 = document.getElementById('text1'),
  text2 = document.getElementById('text2'),
  an = document.getElementById('an'),
  button = document.getElementsByClassName('button');

var duration = 10;
var w,h,ratio,ratio_h,space_height,back1,back2,back3,back5,front1,front111,front2,front3,front8,front5,front6,front7,half_scatter_h,front9,front10,front11,credit;
var width_icon, height_icon, margin_icon, margin_icon_row, column;

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

w = $(window).width();
h = $(window).height();



function resize1(){

  w = $(window).width();
  h = $(window).height();
  ratio = w/100;
  ratio_h = h/100;
  if(w<1500){
    width_icon = 30;
    height_icon = 80;
  }else{
    width_icon = 30;
    height_icon = 50;
  }
  margin_icon = 5;
  


  
} /*RESIZE1 END*/
// resize1();

  front1 = $("#front1").offset().top - h * .4;
  front2 = $("#front2").offset().top - h * .8;
  front3 = $("#front3").offset().top - h * .8;
  front4 = $("#front4").offset().top - h * .8;
  front5 = $("#front5").offset().top - h * .8;
  front6 = $("#front6").offset().top - h * .8;
  front7 = $("#front7").offset().top - h * .8;
  front8 = $("#front8").offset().top - h * .8;
  front9 = $("#front9").offset().top - h * .8;
  front10 = $("#front10").offset().top - h * .8;
  front_sankey = $(".sankey").offset().top - h * .8;
  front_originals = $("#originals").offset().top - h * .5;
  if(w<640){
    front10 = $("#front10").offset().top - h ;
  }


  window.addEventListener("resize", resize1);


var cover = document.getElementById('cover');
var hand = document.getElementsByClassName('hand');


//scroll prep
var section = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
function changeSection(n){
  for(var i=0; i<=25; i++){
    if(i==n) {section[i]=1;} 
    else {section[i]=0}
  }
}


