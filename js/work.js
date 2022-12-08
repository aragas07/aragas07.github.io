function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}

$(function(){
  $("#add-section").click(function(){
    $('<div class="cont"><div class="components"><div class="component plus"></div><div class="minus"></div><div class="close"></div></div><div class="section"><div class="element"><di class="plus"></di></div><div class="element"><di class="plus"></di></div></div></div>')
    .insertBefore("#add-section");
    $(".component").each(function(e){
      $(this).click(function(){
        $(".section").eq(e).append('<div class="element"><di class="plus"></di></div>');
      })
    })
    $(".minus").click(function(){
      $(".element").eq(0).remove();
    })
  })
  $(".component").click(function(){
    $(".section").eq(0).append('<div class="element"><di class="plus"></di></div>');
  })
  $(".minus").click(function(){
    $(".element").eq(0).remove();
  })
})