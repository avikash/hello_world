/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * 
 */


document.addEventListener("deviceready", onDeviceReady, false);

//global var current tab
var current = 1;
var page;
var preX = 0;
var preY = 0;
var curX = 0;
var curY = 0;

function onDeviceReady() {
    page = 0;
    document.addEventListener('backbutton',back);
}

window.onload=function(){
(function(d){
 var
 ce=function(e,n){var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false},
 nm=true,sp={x:0,y:0},ep={x:0,y:0},
 touch={
  touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchmove:function(e){e.preventDefault();nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchend:function(e){if(nm){ce(e,'fc')}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))}};nm=true},
  touchcancel:function(e){nm=false}
 };
 for(var a in touch){d.addEventListener(a,touch[a],false);}
 pageload()
})(document);}


function pageload() {
    page = 1;
    var ss = screen.width;
    document.getElementById("tabContent2").setAttribute("style","left:"+(ss)+"px");
    document.getElementById("tabContent3").setAttribute("style","left:"+(ss*2)+"px");
    var list = document.getElementById("l1");
    document.getElementById("navSpan").setAttribute("style","width:"+list.offsetWidth+"px");
    
    document.body.addEventListener('swl',swipedL,false);
    document.body.addEventListener('swr',swipedR,false);
    
}



function swipedR(){    
    switch(current){
        case 1:{
                break;
        }
        case 2:{
                hover("l1",1);
                break;
        }
        case 3:{
                hover("l2",2);
                break;
        }
        default:{
                break;
        }
    }
}

function swipedL(){
    switch(current){
        case 1:{
                hover("l2",2);
                break;
        }
        case 2:{
                hover("l3",3);
                break;
        }
        case 3:{
                break;
        }
        default:{
                hover("l2",2);
                break;
        }
    }             
}

function touchScroll(){
    if (preX !== 0)
    {            
        var difX = curX - preX;
        var difY = curY - preY;

        if ((difY < 20) && (difY > -20))
        {
            if (curX > preX)
            {
                switch(current){
                    case 1:{
                            break;
                    }
                    case 2:{
                            hover("l1",1);
                            break;
                    }
                    case 3:{
                            hover("l2",2);
                            break;
                    }
                    default:{
                            break;
                    }
                }
            }
            else
            {
                switch(current){
                    case 1:{
                            hover("l2",2);
                            break;
                    }
                    case 2:{
                            hover("l3",3);
                            break;
                    }
                    case 3:{
                            break;
                    }
                    default:{
                            hover("l2",2);
                            break;
                    }
                }                    
            }
        }
        preX = 0;
        preY = 0;
        curX = 0;
        curY = 0;
    }
}

function back() {
    if (page === 1)
    {
        page = 0;
        window.location.replace("index.html");
        window.plugins.orientationLock.unlock();
    }
    else
    {
        if (page === 0)
        {
            navigator.app.exitApp();
        }
        else
        {
            if (page === 2)
            {
                page = 0;
                dismissVideo();
            }
        }
    }
}

function openSlideMenu() {
    if (document.getElementById("testDiv").style.left === "0px")
    {
        document.getElementById("testDiv").style.left = "-70px";
    }
    else
    {
        document.getElementById("testDiv").style.left = "0px";
    }
}

function showVideo(url) {
    page = 2;
    //document.getElementById("vidDiv").innerHTML = "<iframe id='vidPlayer' style='width: 90%;height: 90%; margin:10px;' src='http://www.youtube.com/embed/XGSy3_Czz8k'></iframe> <div id='closeBtn' onclick='dismissVideo()'>Close</div>";
    document.getElementById("vidDiv").className = "vidDivClass";
    //var test = setInterval(function(){document.getElementById("vidPlayer").src=url; clearInterval(test);},500);
    var test = setInterval(function(){document.getElementById("vidDiv").innerHTML = "<iframe id='vidPlayer' style='width: 90%;height: 90%; margin:10px;' src='"+url+"'></iframe> <div id='closeBtn' onclick='dismissVideo()'>Close</div>"; clearInterval(test);},700);
    
}

function dismissVideo() {
    document.getElementById("vidDiv").className = "vidDiv"; 
    //document.getElementById("vidPlayer").src="";
    document.getElementById("vidDiv").innerHTML = "";
}

function takePic() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
    destinationType: Camera.DestinationType.FILE_URI, targetWidth: 250, targetHeight: 250 });
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImg');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}



function hover(id,num) {
    if (num !== current)
    {
        var list = document.getElementById(id);
        var span = document.getElementById("navSpan");
        var rect = list.getBoundingClientRect();
        span.setAttribute("style","width:"+list.offsetWidth+"px; left:"+rect.left+"px");
        document.getElementById("l1").className = "";
        document.getElementById("l2").className = "";
        document.getElementById("l3").className = "";
        list.className = "active";

        //scroll to content
        var ss = screen.width;
        var scrollMult = (current - num);
        var amt2Scroll = ((ss)*scrollMult);
        
        var tab1 = document.getElementById("tabContent1");
        var tab2 = document.getElementById("tabContent2");
        var tab3 = document.getElementById("tabContent3");
        
        var t1x;
        var t2x;
        var t3x;
        
        switch(current)
        {
            case 1:{
                    t1x = 0;
                    t2x = ss;
                    t3x = (ss*2);
                    break;
            }
            case 2:{
                    t1x = -ss;
                    t2x = 0;
                    t3x = ss;
                    break;
            }
            case 3:{
                    t1x = -(ss*2);
                    t2x = -ss;
                    t3x = 0;
                    break;
            }
            default:{
                    break;
            }
        }     
                
                
        tab1.setAttribute("style","left:"+(t1x+amt2Scroll)+"px; width:"+ss+"px");
        tab2.setAttribute("style","left:"+(t2x+amt2Scroll)+"px; width:"+ss+"px");
        tab3.setAttribute("style","left:"+(t3x+amt2Scroll)+"px; width:"+ss+"px");

        current = num;
        page = 1;
    }
}

function openTestPage() {
    window.plugins.orientationLock.lock("portrait");
    window.location.replace("testPage.html");
}