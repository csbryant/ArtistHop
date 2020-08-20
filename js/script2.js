$(document).ready(function () {
  // Variables for search bar
  var searchInput = $("#searchInput");
  var searchBtn = $("#button-addon2");

  // API URL Variables
  var lastFMURL = "https://ws.audioscrobbler.com/2.0/?method=";
  var getTopArtists = "chart.getTopArtists";
  var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=8&format=json";
  var url = lastFMURL + getTopArtists + apiKey;
  var url2 = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";

  // Top Artist Variable
  var topArtists = [];

  // Event listener for search bar
  searchBtn.click(function (event) {
    event.preventDefault();
    var q = searchInput.val().trim();
    artistBanner(q);
  });

  //Ajax called to get Top Artist
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    // console.log(topArtists);
    for (var i = 0; i < response.artists.artist.length; i++) {
      topArtists.push(response.artists.artist[i].name);
    }
    // console.log(topArtists);
    topArtists.forEach(getImages);
  });

  //Ajax called to get get top artist Images
  function getImages(parameter) {
    // console.log("--->", parameter);
    $.ajax({
      url: url2 + encodeURIComponent(parameter),
      method: "GET",
    }).then(function (data) {
      // console.log(data);
      var index = topArtists.indexOf(parameter);
      $("#image" + index).append(
        $("<img>").attr("src", data.artists[0].strArtistThumb)
      );
      $("#image" + index).attr("data-artist", parameter);
      $("#image" + index).append($("<p>").text(parameter));
      $("#image" + index).on("click", function () {
        // console.log($(this).attr("data-artist"));
        var imageClick = encodeURIComponent($(this).attr("data-artist"));
        artistBanner(imageClick);
      });
    });
  }

  // Saving artist banner
  function artistBanner(artistName) {
    $.ajax({
      url: url2 + artistName,
      method: "GET",
    }).then(function (image) {
      if (image.artists === null){
        location.href = "index.html";
      } else {
        console.log(image.artists[0]);
        localStorage.setItem(
          "artistName",
          JSON.stringify(image.artists[0].strArtist)
          );
          localStorage.setItem(
            "artistBanner",
            JSON.stringify(image.artists[0].strArtistThumb)
            );
            localStorage.setItem(
              "artistInfo",
              JSON.stringify(image.artists[0].strBiographyEN)
              );
              getSim(artistName);
            }
    });
  }

  // Get Similar Artist
  function getSim(artistName) {
    $.ajax({
      url: "https://tastedive.com/api/similar?limit=20&q=" + artistName,
      method: "GET",
      crossDomain: true,
      dataType: "jsonp",
    }).then(function (artists) {
      // console.log(artists.Similar.Results);
      localStorage.setItem(
        "similarArtists",
        JSON.stringify(artists.Similar.Results)
      );
      tasteTube(artistName);
    });
  }

  // Gets a YouTube video ID
  function tasteTube(artistName) {
    $.ajax({
      url:
        "https://tastedive.com/api/similar?q=" +
        artistName +
        "&k=381507-MusicDas-C11G38P9&info=1&limit=1",
      method: "GET",
      crossDomain: true,
      dataType: "jsonp",
    }).then(function (videoID) {
      // console.log(videoID.Similar.Info[0]);
      localStorage.setItem(
        "youTube",
        JSON.stringify(videoID.Similar.Info[0].yID)
      );
      location.href = "searched.html";
    });
  }
});
