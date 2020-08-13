$(document).ready(function () {
  var artistName = $(".artist-name");
  console.log(artistName)

  for (i = 0; i < artistName.length; i++) {
    $('artistName[i]').on("click", function () {
      var dataName = $(this).attr("data-id");
      console.log(dataName);
    });
  }
});
