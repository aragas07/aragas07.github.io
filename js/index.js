const nav = document.getElementById("navigation"),
svg = document.getElementById("svg"),
home = document.getElementById('myinfo'),
about = document.getElementById('about'),
section = document.querySelectorAll("section");
var n1 = 0, str ='';
window.onscroll = function(){
    const text = document.querySelectorAll("text"),
    recttop = home.getBoundingClientRect(),
    rectbottom = about.getBoundingClientRect();
    
    document.querySelectorAll(".nav-items a").forEach(function(i){
        i.className="";
    })
    section.forEach(function(e){
        s = e.getBoundingClientRect();
        if(s.top < window.innerHeight/1.5 && s.top > -window.innerHeight/2 && e.id != "myinfo" && e.id != ""){
            console.log(e.id+" "+e.className);
            const theId = "a-"+e.id;
            const el = document.querySelector(`#${CSS.escape(theId)}`);
            el.className = "active";
        }
    })
    function view(top, bottom) {
        var compute = (rectbottom.top/recttop.bottom),
        per = compute * 100;
        n1 = 100-per;
        if(per >= 0){
            str = per+" "+n1+"";
            text.forEach(function (e){
                e.style.strokeDasharray = str;
                e.style.fill = 'rgba(204,204,204,'+(compute - (1 - compute))+')';
                if(per < 25){
                    e.style.opacity = compute+'';
                }else{
                    e.style.opacity = "1";
                }
            });
        }
    }
    view(recttop,rectbottom);
    if(document.documentElement.scrollTop > 150){
        nav.style.backgroundColor = "#1e1e27";
        nav.style.padding = "0";
    }else{
        nav.style.backgroundColor = "#50505000";
        nav.style.padding = "10px 0 0 0";
    }
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
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
