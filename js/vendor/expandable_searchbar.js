$(document).foundation();

$(function() {
  $('.button-search')
    .bind('click', function(event) {
      $(".search-input").toggleClass("expand-search");

      // if the search input is expanded, focus on it
      if ($(".search-input").hasClass("expand-search")) {
        $(".search-input").focus();
      }
    })
});

