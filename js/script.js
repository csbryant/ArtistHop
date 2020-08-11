$(document).ready(function () {
  var searchInput = $("#searchInput");
  var searchBtn = $("#button-addon2");
  var imgDiv = $("#image");

  var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=";

  var getsimilarArtist = "artist.getsimilar&artist=";

  var gettopArtists = "chart.getTopArtists";

  var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=10&format=json";

  var topArtistsdiv = $("#top-artist");

  var arrOfPromises = [];
  
  var url = lastFMURL + gettopArtists + apiKey;
  var url2 = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" 

  arrOfPromises.push($.ajax({ url: url, method: "GET" }));
  arrOfPromises.push($.ajax({ url: url2 + encodeURIComponent(arrOfPromises[0].responseJSON.artists.artist[0].name), method: "GET" }));

  Promise.all(arrOfPromises).then(function (values) {

   

    console.log(encodeURIComponent(arrOfPromises[0].responseJSON.artists.artist[0].name))
    console.log(arrOfPromises[1])

  });
 
  

});
