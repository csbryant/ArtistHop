$(document).ready(function () {
  // Variables to grab elements on the homepage
  var searchInput = $("#searchInput");
  var searchBtn = $("#button-addon2");
  
  // API Variables
  var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=";

  var getSimilarArtists = "artist.getsimilar&artist=";

  var getTopArtists = "chart.getTopArtists";

  var getArtistInfo = "artist.getinfo&artist="

  var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=8&format=json";

  var url = lastFMURL + getTopArtists + apiKey;
  var url2 = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";

// Global variable for search field
 

  // Event listener for search bar
  searchBtn.click(function (event) {
    event.preventDefault();
    artistInfo();
    getSim();
    
  });

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
