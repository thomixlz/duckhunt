// Carousel trouvé sur github ce rapprochant le plus des icons de jeux ps5//
// Source = https://codepen.io/dobladov/pen/kXAXJx //
// Source = by DobladoV // 

// Code CAROUSSEL // 

function moveToSelected(element) {

    if (element == "next") {
      var selected = $(".selected").next();
    } else if (element == "prev") {
      var selected = $(".selected").prev();
    } else {
      var selected = element;
    }
  
    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
  
    $(selected).removeClass().addClass("selected");
  
    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");
  
    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");
  
    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
  
  }
  
  // Eventos teclado
  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          moveToSelected('prev');
          break;
  
          case 39: // right
          moveToSelected('next');
          break;
  
          default: return;
      }
      e.preventDefault();
  });
  
  $('#carousel > div').click(function() {
    moveToSelected($(this));
  });
  
  $('#prev').click(function() {
    moveToSelected('prev');
  });
  
  $('#next').click(function() {
    moveToSelected('next');
  });

  
// Code image background changement// 

$("#sackboy").on("click", function() {
    $("body").css("background-image", "url(assets/img/ps5/bg-sackboy.png)");
});

$("#spider-man").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/bg-spider-man.png)");
});

$("#demon").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/bg-demons-souls.png)");
});

$("#dirt").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/bg-dirt-5.png)");
});

$("#yakuza").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/bg-yakuza.png)");
});

$("#xi").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/bg-XIII.png)");
});

$("#watch").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/bg-watch-dogs.png)");
});

$("#rps").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/rps.gif)");
});

$("#shot").on("click", function() {
  $("body").css("background-image", "url(assets/img/ps5/shot.gif)");
});