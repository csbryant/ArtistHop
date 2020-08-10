$(document).ready(function () {
  var searchInput = $("#searchInput");
  var searchBtn = $("#button-addon2");
  var imgDiv = $("#image");

  var queryURL =
    "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=";

  var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=10&format=json";

  searchBtn.click(function (event) {
    event.preventDefault();

    var q = searchInput.val().trim();
    console.log(q);

    $.ajax({
      url: queryURL + q + apiKey,
      method: "GET",
    }).then(function (response) {
      // Test to see what I'm retrieving from Last.fm
      console.log(response);
      //   for (var index = 0; index < 10; index++) {
      // var artistName = response.similarartists.artist[0].name;
      // console.log(response.similarartists.artist[index].image[2]["#text"]);
      //     var image = $("<img>").attr(
      //       "src",
      //       response.similarartists.artist[index].image[2]["#text"]
      //     );
      //     imgDiv.append(image);
      //   }
    });
    $.ajax({
      url: "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + q,
      method: "GET",
    }).then(function (result) {
      console.log(result);
      var artistName = result.artists[0].strArtist;
      var newH2 = $("<h2>").text(artistName);
      imgDiv.append(newH2);
      var artistImage = $("<img>").attr("src",result.artists[0].strArtistThumb);
      imgDiv.append(artistImage)
    });
  });
});