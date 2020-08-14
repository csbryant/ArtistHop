<
$(document).ready(function () {
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

// Event listener for search bar
searchBtn.click(function (event) {
  event.preventDefault();
  
  getSim();
  artistInfo();
});


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
  });
}
  
  // Function for search bar
  function getSim() {
    var q = searchInput.val().trim();
    console.log(q);
    $.ajax({
      url: lastFMURL + getSimilarArtists + q + apiKey,
      method: "GET",
    }).then(function (artists) {
      console.log(artists.similarartists.artist)
      localStorage.setItem("similarArtists", JSON.stringify(artists.similarartists.artist));
      location.href = "searched.html"
    });
  }
  // Function to get artist info
  function artistInfo() {
    var q = searchInput.val().trim();
    $.ajax({
      url: lastFMURL + getArtistInfo + q + apiKey,
      method: "GET",
    }).then(function (artists) {
      console.log(artists)
      localStorage.setItem("artistName", JSON.stringify(artists.artist.name));
      localStorage.setItem("artistInfo", JSON.stringify(artists.artist.bio.summary));
    });
  }  
});

