
var searchInput = $("#searchInput");
var searchBtn = $("#button-addon2");
var imgDiv = $("#image");

var queryURL =
  "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=";

var apiKey = "&api_key=6c1bc3108e57d5a4c6eca326981bfaa6&limit=10&format=json";

searchBtn.click(function () {
  var q = searchInput.val().trim();
  console.log(q);

  $.ajax({
    url: queryURL + q + apiKey,
    method: "GET",
  }).then(function (response) {
    // Test to see what I'm retrieving from Last.fm
    // console.log(response);
    for (var index = 0; index < 10; index++) {
      console.log(response.similarartists.artist[index].name);
      console.log(response.similarartists.artist[index].image[2]["#text"]);
      var image = $("<img>").attr(
        "src",
        response.similarartists.artist[index].image[2]["#text"]
      );
      imgDiv.append(image);
    }
  });
});