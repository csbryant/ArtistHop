$(document).ready(function () {
  // Variables for search bar
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

  // Array to push json data into
  var similarArtists = [];

  // Event listener for search bar
  searchBtn.click(function (event) {
    event.preventDefault();
    var q = searchInput.val().trim();
    artistInfo(q);
    getSim(q);
    artistBanner(q);
    tasteTube(q);
  });

  // Retrieves json data
  if (localStorage.getItem("artistName") === null) {
    console.log("Local storage is null");
  } else var retName = JSON.parse(localStorage.getItem("artistName"));
  var retInfo = JSON.parse(localStorage.getItem("artistInfo"));
  var retArtists = JSON.parse(localStorage.getItem("similarArtists"));
  var retBanner = JSON.parse(localStorage.getItem("artistBanner"));
  $("#artist-name").text(retName);
  var retVideo = JSON.parse(localStorage.getItem("youTube"));
  $("#bio").text(retInfo);
  // console.log(retArtists);
  $("#searched-artist").css("background-image", "url(" + retBanner + ")");
  $("iframe").attr("src", "https://www.youtube.com/embed/" + retVideo)
  for (var i = 0; i < retArtists.length; i++) {
    similarArtists.push(retArtists[i].name);
  }
  similarArtists.forEach(getImages);

  // Ajax called to get artist Images
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
      $("#artist" + index).attr("data-artist", parameter);
      $("#name" + index).text(parameter);
      $("#artist" + index).on("click", function () {
        console.log($(this).attr("data-artist"));

        var imageClick = encodeURIComponent($(this).attr("data-artist"));
        artistInfo(imageClick);
        getSim(imageClick);
        artistBanner(imageClick);
        tasteTube(imageClick);
      });
    });
  }

  // Function to get similar artists
  function getSim(event) {
    console.log(event);
    $.ajax({
      url: lastFMURL + getSimilarArtists + event + apiKey,
      method: "GET",
    }).then(function (artists) {
      // console.log(artists.similarartists.artist)
      localStorage.setItem(
        "similarArtists",
        JSON.stringify(artists.similarartists.artist)
      );
    });
  }
  // Function to get artist info
  function artistInfo(parameter) {
    $.ajax({
      url: lastFMURL + getArtistInfo + parameter + apiKey,
      method: "GET",
    }).then(function (artists) {
      console.log(artists);
      localStorage.setItem("artistName", JSON.stringify(artists.artist.name));
    });
  }
  // Saving artist banner
  function artistBanner(parameter) {
    $.ajax({
      url: url2 + parameter,
      method: "GET",
    }).then(function (image) {
      console.log(image.artists[0]);
      localStorage.setItem(
        "artistBanner",
        JSON.stringify(image.artists[0].strArtistThumb)
      );
      localStorage.setItem(
        "artistInfo",
        JSON.stringify(image.artists[0].strBiographyEN)
      );
      
    });
  }
  // Tastedive to get YouTube video IDs
  function tasteTube (parameter) {
    $.ajax({
      url: "https://tastedive.com/api/similar?q=" + parameter + "&k=381507-MusicDas-C11G38P9&info=1&limit=1",
      method: "GET",
      crossDomain: true,
      dataType: "jsonp",
    }).then(function (videoID) {
      console.log(videoID.Similar.Info[0]);
      localStorage.setItem("youTube", JSON.stringify(videoID.Similar.Info[0].yID))
      location.href = "searched.html";
    })
  }
});
