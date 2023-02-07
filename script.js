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
  }).then(function (response) {
    console.log(response, "hi2");
    const nameID = response._embedded.attractions;
    console.log(nameID, "hi3");

    //create list
    $("#next-events").empty();
    for (let i = 1; i < nameID.length; i++) {
      const eventID = nameID[i];
      console.log(eventID, "yo");

      let eventsList = $("<div>");

      //let eventsImg = $(`<img src="${eventID.images[0].url}">`);
      let eventsURL = $(
        `<a target="_blank" href="${eventID.url}"><img src="${eventID.images[0].url}"></a>`
      );

      let eventsName = $(`<h1>"${eventID.name}"</h1>`);

      //eventsURL.wrap(eventsImg);

      eventsList.append(eventsName, eventsURL);
      $("#next-events").append(eventsList);
      //
    }

    // nameID.forEach(function (element) {
    //   let eventDiv = $("<div>");
    //   let eventTitle = $(`<h1>${nameID._embedded.attractions}</h1>`);

    //   eventDiv.append(eventTitle);
    //   $(".articles").append(eventDiv);
    //
  });

  /////////////////////////////////////////////////////////////////////////////
  //music column right side

  const settings = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + userSelect,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "df2546054bmshe9048d5ae9a1441p13d910jsn20aabd33d717",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  var dataSearch;

  $.ajax(settings).done(function (response) {
    dataSearch = response;
    console.log(response);
    $("#best-albums").empty();
    $("#best-albums").append("<h2>Best tracks</h2>");
    for (let i = 0; i < 1; i++) {
      var trackId = dataSearch.data[i].id;
      var trackTitle = dataSearch.data[i].title;
      var trackPreview = dataSearch.data[i].preview;
      var trackRank = dataSearch.data[i].rank;
      var trackAlbumId = dataSearch.data[i].album.id;
      var trackAlbumTitle = dataSearch.data[i].album.title;
      var trackAlbumImage = dataSearch.data[i].album.cover_medium;
      var trackArtistId = dataSearch.data[i].artist.id;

      const artistSettings = {
        async: true,
        crossDomain: true,
        url: "https://deezerdevs-deezer.p.rapidapi.com/artist/" + trackArtistId,
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "df2546054bmshe9048d5ae9a1441p13d910jsn20aabd33d717",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      var artistData;

      $.ajax(artistSettings).done(function (artistResponse) {
        artistData = artistResponse;
        console.log(artistResponse);
        var artistName = artistData.name;
        var artistImage = artistData.picture_medium;
        $("#best-albums").append(`
        <p>Title: ${trackTitle} </p>
        <audio controls>
          <source src="${trackPreview}" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
        <p>Album: ${trackAlbumTitle} </p>
        <p><img src="${trackAlbumImage}" alt="${trackAlbumImage}"> </p>
        `);
        $("#artist-information").append(`
        <p>Artist: ${artistName}</p>
        <p><img src="${artistImage}" alt="${artistImage}"> </p>
        `);
      });
    };
  });
});
