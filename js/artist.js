$(document).ready(function () {
  var url2 = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";

  var similarArtists = [];

  if (localStorage.getItem("artistName") === null) {
    console.log("Local storage is null");
  } else var retName = JSON.parse(localStorage.getItem("artistName"));
  var retInfo = JSON.parse(localStorage.getItem("artistInfo"));
  var retArtists = JSON.parse(localStorage.getItem("similarArtists"));
  var retBanner = JSON.parse(localStorage.getItem("artistBanner"));
  $("#artist-name").text(retName);
  $("#bio").text(retInfo);
  // console.log(retArtists);
  $("#searched-artist").css("background-image", "url(" + retBanner + ")");

  for (var i = 0; i < retArtists.length; i++) {
    similarArtists.push(retArtists[i].name);
  }
  similarArtists.forEach(getImages);

  // Ajax called to get get top artist Images
  function getImages(parameter) {
    console.log("--->", parameter);
    $.ajax({
      url: url2 + encodeURIComponent(parameter),
      method: "GET",
    }).then(function (data) {
      console.log(data);
      var index = similarArtists.indexOf(parameter);
      console.log(data.artists[0].strArtistThumb);

      $("#artist" + index).css(
        "background-image",
        "url(" + data.artists[0].strArtistThumb + ")"
      );
      $("#name" + index).text(parameter);
    });
  }
});
