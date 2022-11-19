$(function(){
  $("footer div").each(function(){
    $(this).animate({width:$(this).attr("data-width")},1000);
  })
})