$(document).ready(function () {
  var searchInput = $("#searchInput");
  var searchBtn = $("#button-addon2");
  var imgDiv1 = $("#image1");
  var imgDiv2 = $("#image2");
  var imgDiv3 = $("#image3");
  var imgDiv4 = $("#image4");
  var imgDiv5 = $("#image5");
  var imgDiv6 = $("#image6");
  var imgDiv7 = $("#image7");
  var imgDiv8 = $("#image8");

  var createImg1 = $("<img>");
  var createImg2 = $("<img>");
  var createImg3 = $("<img>");
  var createImg4 = $("<img>");
  var createImg5 = $("<img>");
  var createImg6 = $("<img>");
  var createImg7 = $("<img>");
  var createImg8 = $("<img>");

  var createP1 = $("<p>");
  var createP2 = $("<p>");
  var createP3 = $("<p>");
  var createP4 = $("<p>");
  var createP5 = $("<p>");
  var createP6 = $("<p>");
  var createP7 = $("<p>");
  var createP8 = $("<p>");

  var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=";

  var getsimilarArtist = "artist.getsimilar&artist=";

  var gettopArtists = "chart.getTopArtists";

  var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=8&format=json";

  var topArtistsdiv = $("#top-artist");

  var url = lastFMURL + gettopArtists + apiKey;
  var url2 = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";

  searchBtn.click(function (event) {
    event.preventDefault();

    var q = searchInput.val().trim();
    console.log(q);
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[0].name),
      method: "GET",
    }).then(function (data) {
      createImg1.attr("src", data.artists[0].strArtistThumb);
      imgDiv1.append(createImg1);
      createP1.text(response.artists.artist[0].name);
      imgDiv1.append(createP1);
      // imgDiv1.attr("href", )
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[1].name),
      method: "GET",
    }).then(function (data) {
      createImg2.attr("src", data.artists[0].strArtistThumb);
      imgDiv2.append(createImg2);
      createP2.text(response.artists.artist[1].name);
      imgDiv2.append(createP2);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[2].name),
      method: "GET",
    }).then(function (data) {
      createImg3.attr("src", data.artists[0].strArtistThumb);
      imgDiv3.append(createImg3);
      createP3.text(response.artists.artist[2].name);
      imgDiv3.append(createP3);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[3].name),
      method: "GET",
    }).then(function (data) {
      createImg4.attr("src", data.artists[0].strArtistThumb);
      imgDiv4.append(createImg4);
      createP4.text(response.artists.artist[3].name);
      imgDiv4.append(createP4);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[4].name),
      method: "GET",
    }).then(function (data) {
      createImg5.attr("src", data.artists[0].strArtistThumb);
      imgDiv5.append(createImg5);
      createP5.text(response.artists.artist[4].name);
      imgDiv5.append(createP5);
    });
    $.ajax({ url: url, method: "GET" }).then(function (response) {
      
      $.ajax({
        url: url2 + encodeURIComponent(response.artists.artist[5].name),
        method: "GET",
      }).then(function (data) {
        createImg6.attr("src", data.artists[0].strArtistThumb);
        imgDiv6.append(createImg6);
        createP6.text(response.artists.artist[5].name);
        imgDiv6.append(createP6);
      });
    });
    $.ajax({ url: url, method: "GET" }).then(function (response) {
      
      $.ajax({
        url: url2 + encodeURIComponent(response.artists.artist[6].name),
        method: "GET",
      }).then(function (data) {
        createImg7.attr("src", data.artists[0].strArtistThumb);
        imgDiv7.append(createImg7);
        createP7.text(response.artists.artist[6].name);
        imgDiv7.append(createP7);
      });
    });
    $.ajax({ url: url, method: "GET" }).then(function (response) {
      
      $.ajax({
        url: url2 + encodeURIComponent(response.artists.artist[7].name),
        method: "GET",
      }).then(function (data) {
        createImg8.attr("src", data.artists[0].strArtistThumb);
        imgDiv8.append(createImg8);
        createP8.text(response.artists.artist[7].name);
        imgDiv8.append(createP8);
      });
    });
  });
});
