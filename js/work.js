const delta = 6;
let startX;
let startY;
let moved = false;
window.addEventListener('mousedown', function (event) {
  startX = event.pageX;
  startY = event.pageY;
  console.log(startY);
  moved = true;
});

window.addEventListener('mousemove',(e)=>{
    console.log(moved);
})