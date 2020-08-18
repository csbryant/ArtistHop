$(document).ready(function () {
  // Variables for search bar
  var searchInput = $("#searchInput");
  var searchBtn = $("#button-addon2");

  // API URL Variables
  var audioDB = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";
  // var lastFMURL = "https://ws.audioscrobbler.com/2.0/?method=";

  // var getSimilarArtists = "artist.getsimilar&artist=";

  // var getTopArtists = "chart.getTopArtists";

  // var getArtistInfo = "artist.getinfo&artist=";

  // var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=8&format=json";

  // var url = lastFMURL + getTopArtists + apiKey;

  // Array to push json data into
  var similarArtists = [];

  // Event listener for search bar
  searchBtn.click(function (event) {
    event.preventDefault();
    var q = searchInput.val().trim();
    // artistInfo(q);
    getSim(q);
    artistBanner(q);
    tasteTube(q);
    $( document ).ajaxStop(function() {
      console.log("Wait")
    })
  });

  // Retrieves json data
  if (localStorage.getItem("artistName") === null) {
    console.log("Local storage is null");
  } else var retName = JSON.parse(localStorage.getItem("artistName"));
  var retInfo = JSON.parse(localStorage.getItem("artistInfo"));
  var retArtists = JSON.parse(localStorage.getItem("similarArtists"));
  var retBanner = JSON.parse(localStorage.getItem("artistBanner"));
  var retVideo = JSON.parse(localStorage.getItem("youTube"));

  // Sets elements on page
  $("#artist-name").text(retName);
  $(".artist-bio").text(retInfo);

  $("#searched-artist").css("background-image", "url(" + retBanner + ")");
  $("iframe").attr("src", "https://www.youtube.com/embed/" + retVideo);
  for (var i = 0; i < retArtists.length; i++) {
    similarArtists.push(retArtists[i].Name);
  }
  similarArtists.forEach(getImages);

  var similarartistcount = [];
  console.log(similarartistcount);
  
  // Ajax called to get artist Images
  function getImages(parameter) {
    console.log("--->", parameter);
    $.ajax({
      url: audioDB + encodeURIComponent(parameter),
      method: "GET",
    }).then(function (data) {

      var artistPic = data.artists[0].strArtistThumb;

      if (artistPic && similarartistcount.length <= 7) {
        console.log(data);
        var index = similarArtists.indexOf(parameter);
        similarartistcount.push(data.artists[0].strArtistThumb);

        // create the html for similar artists
        var similarArtistsGrid = $(".similar-artists-grid");

        var similarArtistsCell = $("<div>").addClass(
          "cell large-3 medium-4 small-6"
        );
        similarArtistsGrid.append(similarArtistsCell);
        var gridY = $("<div>").addClass("grid-y");
        similarArtistsCell.append(gridY);
        var gridXAlignCenter = $("<div>").addClass("grid-x align-center");
        gridY.append(gridXAlignCenter);
        var artistLink = $("<a>").addClass("artist-info");
        gridXAlignCenter.append(artistLink);
        var artistNameDiv = $("<div>").addClass("cell text-center artist-name");
        gridY.append(artistNameDiv);
        var h5 = $("<h5>");
        artistNameDiv.append(h5);

        // console.log(parameter, "---->", artistPic);
        $(artistLink).css(
          "background-image",
          "url(" + data.artists[0].strArtistThumb + ")"
        );
        $(artistLink).attr("data-artist", parameter);
        $(h5).text(parameter);
        $(".artist-info").on("click", function () {
          console.log($(this).attr("data-artist"));

          var imageClick = encodeURIComponent($(this).attr("data-artist"));
          getSim(imageClick);
          artistInfo(imageClick);
          artistBanner(imageClick);
          tasteTube(imageClick);
        });
      }

    });
  }

  // Get Similar Artist
  function getSim(event) {
    $.ajax({
      url: "https://tastedive.com/api/similar?limit=20&q=" + event,
      method: "GET",
      crossDomain: true,
      dataType: "jsonp",
    }).then(function (artists) {
      console.log(artists.Similar.Results);
      localStorage.setItem(
        "similarArtists",
        JSON.stringify(artists.Similar.Results)
      );
    });
  }

  // Function to get artist info
  // function artistInfo(parameter) {
  //   $.ajax({
  //     url: lastFMURL + getArtistInfo + parameter + apiKey,
  //     method: "GET",
  //   }).then(function (artists) {
  //     console.log(artists);
  //     localStorage.setItem("artistName", JSON.stringify(artists.artist.name));
  //   });
  // }

  // Saving artist banner
  function artistBanner(parameter) {
    $.ajax({
      url: audioDB + parameter,
      method: "GET",
    }).then(function (image) {
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
    });
  }

  // Tastedive to get YouTube video IDs
  function tasteTube(parameter) {
    $.ajax({
      url:
        "https://tastedive.com/api/similar?q=" +
        parameter +
        "&k=381507-MusicDas-C11G38P9&info=1&limit=1",
      method: "GET",
      crossDomain: true,
      dataType: "jsonp",
    }).then(function (videoID) {
      console.log(videoID.Similar.Info[0]);
      localStorage.setItem(
        "youTube",
        JSON.stringify(videoID.Similar.Info[0].yID)
      );
    // location.href = "searched.html";
    });
  }
  
});
