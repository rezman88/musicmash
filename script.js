const apiKey = "koyiY4a6cOCBRXLNERvKYy8umxP9bGSK";

$("#search-form").on("submit", function (event) {
  event.preventDefault();

  // //Call ticketmaster api using the attractions line of code.

  const userSelect = $("#search-input").val();
  const queryUrl =
    "https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=" +
    userSelect +
    "&apikey=" +
    apiKey;

  $.ajax({
    type: "GET",
    url: queryUrl,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json, "hi");
      // Parse the response.
      // Do other things.
    },
    error: function (xhr, status, err) {
      console.log(err);
      // This time, we do not end up here!
    },
  }).then(function (response) {
    console.log(response, "hi2");
    const nameID = response;
    console.log(nameID, "hi3");

    //create list

    nameID.forEach(function (element) {
      let eventDiv = $("<div>");
      let eventTitle = $(`<h1>${nameID._embedded.attractions}</h1>`);

      eventDiv.append(eventTitle);
      $(".articles").append(eventDiv);
      //
    });
  });
});





const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "df2546054bmshe9048d5ae9a1441p13d910jsn20aabd33d717",
		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
	}
};



var dataSearch

$.ajax(settings).done(function (response) {
	dataSearch = response;
  console.log(response);
  $("#best-albums").empty();
  $("#best-albums").append("<h2>Best tracks</h2>");
  for (let i = 0; i < dataSearch.data.length; i++) {
    var trackId = dataSearch.data[i].id;
    var trackTitle = dataSearch.data[i].title;
    var trackPreview = dataSearch.data[i].preview;
    var trackRank = dataSearch.data[i].rank;
    var trackAlbumId = dataSearch.data[i].album.id;
    var trackAlbumTitle = dataSearch.data[i].album.title
    var trackAlbumImage = dataSearch.data[i].album.cover_medium;
    $("#best-albums").append(`
      <p>Title: ${trackTitle} </p>
      <p>${trackPreview} </p>
      <p>Album: ${trackAlbumTitle} </p>
      <p><img src="${trackAlbumImage}" alt="${trackAlbumImage}"> </p>
    `);
  }
  
});




