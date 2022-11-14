const header = document.getElementById("header"),
svg = document.getElementById("svg"),
home = document.getElementById('myinfo'),
about = document.getElementById('about'),
section = document.querySelectorAll("section");
var n1 = 0, str ='';
let bo = true;

const canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');

$(document).ready(function(){
    setTimeout(() => {
        $("#header").css("opacity",'1');
    }, 10);
    $("#myCanvas").tagcanvas({
      textColour: "#08fdd8",
      outlineColour: "transparent",
      reverse: false,
      depth: 0.7,
      maxSpeed: 0.03,
      weight: true,
    }, "tags");
    $("#myCanvasContainer");
  })
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
window.onscroll = function(){
    const text = document.querySelectorAll("text"),
    recttop = home.getBoundingClientRect(),
    rectbottom = about.getBoundingClientRect();
    
    if(this.screen.width < 641) bo = false;
    else bo = true;
    section.forEach(function(e){
        s = e.getBoundingClientRect();
        if(s.top < window.innerHeight/1.5 && s.top > -window.innerHeight/2 && e.id != "myinfo" && e.id != ""){
            const theId = "a-"+e.id;
            const el = document.querySelector(`#${CSS.escape(theId)}`);
            document.querySelectorAll(".nav-items a").forEach(function(i){
                i.className = '';
            })
            el.className = "active";
        }
    })
    function view(top, bottom) {
        var compute = (rectbottom.top/recttop.bottom),
        per = compute * 100;
        reverse = 100-per;
        var getHalf = per - reverse;
        if(getHalf >= 0){
            str = getHalf+" "+(100 - getHalf);
            var opacity = getHalf/100;
            text.forEach(function (e){
                e.style.strokeDasharray = str;
                console.log(opacity - (1 - (opacity)));
                e.style.fill = 'rgba(204,204,204,'+(opacity - (1 - opacity))+')';
                if(opacity < 1){
                    e.style.opacity = opacity+'';
                }else{
                    e.style.opacity = "1";
                }
            });
        }
    }
    view(recttop,rectbottom);
    if(document.documentElement.scrollTop > 150){
        header.style.backgroundColor = "#1e1e27";
        if(bo) header.style.padding = "0";
    }else{
        header.style.backgroundColor = "#50505000";
        if(bo) header.style.padding = "10px 0 0 0";
    }
}
let spots = [];
let hue = 0;
const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 3; i++){
        spots.push(new Particle());
    }
});

window.addEventListener("touchmove", e => {
    [...e.changedTouches].forEach(touch => {
        mouse.x = touch.pageX;
        mouse.y = touch.pageY;
        for(let i = 0; i < 3; i++){
            spots.push(new Particle());
        }
    })
});

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'hsl('+hue+', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillstyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handlerParticle(){
    for(let i = 0; i < spots.length; i++){
        spots[i].update();
        spots[i].draw();
        ctx.beginPath();
        ctx.strokeStyle = spots[i].color;
        ctx.moveTo(spots[i].x-1, spots[i].y-1);
        ctx.lineTo(spots[i].x, spots[i].y);
        ctx.stroke();
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handlerParticle();
    hue++;
    requestAnimationFrame(animate);
}

animate();

const menuBtn = document.querySelector(".menu-btn"),
navigation = document.querySelector(".nav-items"); 
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if(!menuOpen){
        menuBtn.classList.add('open');
        navigation.classList.add('nav-items-show');
        menuOpen = true;
    }else{
        menuBtn.classList.remove('open');
        navigation.classList.remove('nav-items-show');
        menuOpen = false;
    }
})

// const script = document.createElement("script");
// script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
// document.head.appendChild(script);
// const aboutjs = document.createElement("script");
// aboutjs.src = 'js/about.js';
// document.body.appendChild(aboutjs);