function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}

$(function(){
  let showcomp = function(e){
    e.stopImmediatePropagation()
    $(".container").css('width',300)
    $(".comp").css('padding',10)
    $(".active-element").attr('class',"element unactive-element")
    var t = $(this)
    $(".cont-active").removeClass("cont-active");
    t.attr('class',"element active-element").parents(".cont").addClass("cont-active")
    $("#shadow").prop('checked',t.attr("as") === 'true' ? true:false)
    $("#horizontal-range").val(parseInt(t.attr('h'))+50)
    $("#vertical-range").val(parseInt(t.attr('v'))+50)
    $("#shadow-radius").val(t.attr('r'))
    $("#shadow-size").val(t.attr('s')) 
    $("#shadow-color").val(t.attr('c'))
    $("#border").prop('checked',t.attr('ab') === 'true' ? true:false)
    $("#b-width").val(t.attr('bw'))
    $("#line-style").val(t.attr('line'))
    $("#border-color").val(t.attr('bc'))
    $("#b-radius").val(t.attr('br'))
  }
  $("#add-section").click(function(){
    $(".active-element").attr("class","element unactive-element");
    $(".cont-active").removeClass("cont-active");
    $('<div class="cont cont-active"><div class="components"><div class="component plus"></div><div class="minus"></div><div class="close"></div></div><div class="section"><div class="element unactive-element"><div class="new"><di class="plus"></di></div></div></div></div>')
    .insertBefore("#add-section");
    $(".component").click(function(e){
      e.stopImmediatePropagation();
      $(this).parents(".cont").children(".section").append('<div class="element unactive-element"><div class="new"><di class="plus"></di></div></div>');
      $(".element").click(showcomp)
    })

    $(".minus").click(function(e){
      e.stopImmediatePropagation();
      $(this).parents(".cont").children(".section").children(".element").last().remove();
    })
    
    $(".close").click(function(e){
      e.stopImmediatePropagation();
      $(this).parents(".cont").remove();
    })  
    $(".element").click(showcomp)
  })
  $("#width").change(function(){
    console.log($(this).val())
    $(".active-element").width('100%')
  })
  $("#close-comp").click(function(e){
    e.stopImmediatePropagation();
    $(".container").css({'width':'0'});
    $(".active-element").attr('class',"element unactive-element");
    $(".cont-active").removeClass("cont-active");
    $(".comp").css('padding',0);
  })

  $("#img").click(function(){
    $(".active-element").html('<img src="img/landscape.png" class="n-el"/>');
    $(".custom-editor").css('display','none')
    $(".img-editor").css('display','block')
  })
  $("#text").click(function(){
    $(".active-element").html('<textarea oninput="auto_grow(this)" class="n-el" placeholder="Input text here"></textarea>');
  })
  $("#video").click(function(){
    $(".active-element").html('<div class="video n-el"><div><img src="img/play.png" alt="" srcset=""></div><video style="background-color: #ccc" src=""></video></div>');
  })
  $("#custom").click(function(){
    $(".active-element").html('<div class="custom-code n-el">Custom</div>')
    $(".custom-editor").css('display','block')
    $(".img-editor").css('display','none')
    $(".custom-code").click(function(){
      $("#customhtml").val($(this).html() === "Custom" ? "":$(this).html())
    })
  })
  $("#customhtml").keyup(function(){
    $(".active-element .custom-code").html(($(this).val() === "") ? "Custom":$(this).val());
  })
  $(".editor-view").click(function(){
    $(".editor").css('display','block')
  })
  $("#mt").change(function(){
    $(".active-element").css("margin-top",$(this).val() === '' ? 0:$(this).val()+"px")
  })
  $("#mb").change(function(){
    $(".active-element").css("margin-bottom",$(this).val() === '' ? 0:$(this).val()+"px")
  })
  $("#ml").change(function(){
    $(".active-element").css("margin-left",$(this).val() === '' ? 0:$(this).val()+"px")
  })
  $("#mr").change(function(){
    $(".active-element").css("margin-right",$(this).val() === '' ? 0:$(this).val()+"px")
  })
  var shadow = ()=>{
    var horizontal = parseInt($("#horizontal-range").val())-50,
    vertical = (parseInt($("#vertical-range").val())-50),
    radius = $("#shadow-radius").val() === '' ? 0:$("#shadow-radius").val(),
    size = $("#shadow-size").val() === '' ? 0:$("#shadow-size").val(),
    color = $("#shadow-color").val();
    $(".active-element").css('box-shadow', horizontal+"px "+vertical+"px "+radius+"px "+size+"px "+color)
    .attr({'as':true,'h':horizontal,'v':vertical,'r':radius,'s':size,'c':color});
  }
  $("#shadow").click(function(){
    var t = $(this)
    $(".shadow").change(function(){
      if($("#shadow").is(":checked")){
        t.prop('checked') ? shadow():false
      }
    })
    t.prop('checked') ? shadow():$(".active-element").css('box-shadow', 'none').attr('a',false)
  })

  var border = ()=>{
    var width = $("#b-width").val() === '' ? 0:$("#b-width").val(),
    lstyle = $("#line-style").val(),
    bcolor = $("#border-color").val();
    $(".active-element").css('border',width+'px '+lstyle+' '+bcolor).attr({'bw':width,'line':lstyle,'bc':bcolor}).attr('ab',true)
  }

  $("#border").click(function(){
    var t = $(this)
    $("#b-radius").change(function(){
      t.prop('checked') ? $(".active-element").css('border-radius', $(this).val()+'px').attr("br",$(this).val()):false
    })
    $(".border").change(function(){
      t.prop('checked') ? border():false
    })
    t.prop('checked') ? border():$(".active-element").css({'border-radius':'none','border':'none'}).attr('ab',false)
  })

  $("#advance").click(function(){
    $(".style-container").css('display','none');
    $(".advance-container").css('display','block');
    $(this).addClass('btn-active');
    $("#styling").removeClass("btn-active");
  })
  $("#styling").click(function(){
    $(".style-container").css('display','block');
    $(".advance-container").css('display','none');
    $(this).addClass('btn-active');
    $("#advance").removeClass("btn-active");
  })
  $(".transform").click(function(){
    $(".transform").removeClass("card-btn-active");
    $(this).addClass("card-btn-active");
  })
})