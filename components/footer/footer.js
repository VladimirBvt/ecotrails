$(".button-footer").hover(
    function () {
      $(".button-footer").css("background", "#f28123");
      $(".callback-img-color").css("fill", "white");
      $(".button-text").css("color", "white");
    },
    function () {
      $(".button-footer").css("background", "#f3f6ed");
      $(".callback-img-color").css("fill", "black");
      $(".button-text").css("color", "black");
    }
  );
  