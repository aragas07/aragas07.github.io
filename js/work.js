$(document).ready(function(){
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