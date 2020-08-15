// Variables to grab elements on the homepage
var searchInput = $("#searchInput");
var searchBtn = $("#button-addon2");
// API URL Variables
var lastFMURL = "https://ws.audioscrobbler.com/2.0/?method=";
var getSimilarArtists = "artist.getsimilar&artist=";
var getTopArtists = "chart.getTopArtists";
var getArtistInfo = "artist.getinfo&artist=";
var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=8&format=json";
var url = lastFMURL + getTopArtists + apiKey;
var url2 = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";
// Top Artist Variable
var topArtists = [];
var similarArtist = [];
// Event listener for search bar
// searchBtn.click(function (event) {
//   event.preventDefault();
//   location.href = "./artist.html";
//   getSim();
//   artistInfo();
// });
// Function for search bar
/* function getSim() {
  var q = searchInput.val().trim();
  console.log(q);
  $.ajax({
    url: lastFMURL + getSimilarArtists + q + apiKey,
    method: "GET",
  }).then(function (artists) {
    console.log(artists.similarartists.artist);
    localStorage.setItem(
      "similarArtists",
      JSON.stringify(artists.similarartists.artist)
    );
  });
} */
// Function to get artist info
/* function artistInfo() {
  var q = searchInput.val().trim();
  $.ajax({
    url: lastFMURL + getArtistInfo + q + apiKey,
    method: "GET",
  }).then(function (artists) {
    localStorage.setItem("artistName", artists.artist.name);
    localStorage.setItem("artistInfo", artists.artist.bio.summary);
  });
}
 */
//Ajax called to get Top Artist
$.ajax({
  url: url,
  method: "GET",
}).then(function (response) {
  console.log(topArtists);
  for (var i = 0; i < response.artists.artist.length; i++) {
    topArtists.push(response.artists.artist[i].name);
  }
  console.log(topArtists);
  topArtists.forEach(getImages);
});
//Ajax called to get get top artist Images
function getImages(parameter) {
  console.log("--->", parameter);
  $.ajax({
    url: url2 + encodeURIComponent(parameter),
    method: "GET",
  }).then(function (data) {
    console.log(data);
    var index = topArtists.indexOf(parameter);
    $("#image" + index).append(
      $("<img>").attr("src", data.artists[0].strArtistThumb)
    );
    $("#image" + index).attr("data-artist", parameter);
    $("#image" + index).append($("<p>").text(parameter));
    $("#image" + index).on("click", function () {
      console.log($(this).attr("data-artist"));
      similaartist($(this).attr("data-artist"));
    });
  });
}
//Ajax called to get similar Artist
function similaartist(parameter) {
  $.ajax({
    url: lastFMURL + getSimilarArtists + encodeURIComponent(parameter) + apiKey,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    for (var i = 0; i < data.similarartists.artist.length; i++) {
      similarArtist.push(data.similarartists.artist[i].name);
    }
    console.log(similarArtist);
    similarArtist.forEach(getsimilarImages);
  });
}
function getsimilarImages(parameter) {
  console.log("--->", parameter);
  $.ajax({
    url: url2 + encodeURIComponent(parameter),
    method: "GET",
  }).then(function (data) {
    console.log(data);
    var index = similarArtist.indexOf(parameter);
    $("#artistimage" + index).append(
      $("<img>").attr("src", data.artists[0].strArtistThumb)
    );
    $("#artistimage" + index).attr("data-artist", parameter);
    $("#artistimage" + index).append($("<p>").text(parameter));
    $("#artistimage" + index).on("click", function () {
      console.log($(this).attr("data-artist"));
      similaartist($(this).attr("data-artist"));
    });
  });
}
