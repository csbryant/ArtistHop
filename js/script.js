$(document).ready(function () {
  var searchInput = $("#searchInput");
  var searchBtn = $("#button-addon2");
  var imgDiv1 = $("#image1");
  var imgDiv1 = $("#image1");
  var imgDiv1 = $("#image1");
  var imgDiv1 = $("#image1");
  var imgDiv1 = $("#image1");
  var imgDiv1 = $("#image1");
  var imgDiv1 = $("#image1");
  var imgDiv1 = $("#image1");  

  var createImg = $("<img>");

  var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=";

  var getsimilarArtist = "artist.getsimilar&artist=";

  var gettopArtists = "chart.getTopArtists";

  var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=10&format=json";

  var topArtistsdiv = $("#top-artist");

  var url = lastFMURL + gettopArtists + apiKey;
  var url2 = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";

  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[0].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[1].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[2].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[3].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[4].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[5].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[6].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
  $.ajax({ url: url, method: "GET" }).then(function (response) {
    console.log(response);
    $.ajax({
      url: url2 + encodeURIComponent(response.artists.artist[7].name),
      method: "GET",
    }).then(function (data) {
      createImg.attr("src", data.artists[0].strArtistThumb);
      imgDiv.append(createImg);
    });
  });
});
