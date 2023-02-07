/////////////////////////////////////////////////////////////////////////////////////
//This code is broken down into three sections: ticketmaster API, Deezer API music and Deezer API for artists.
//This will allow the user to discover information about the artist, events relating to the artist and finally a sample
//of their music.

//Ticketmaster API
//This section calls upon the Ticketmaster API which will output information about events relating to the
//artist inputted into the webpage search bar.

//Event Listener for button
//prevent default enabled to prevent form from submitting in order to reveal results.
$("#search-form").on("submit", function (event) {
  event.preventDefault();

  //Ticketmaster API key
  const apiKey = "koyiY4a6cOCBRXLNERvKYy8umxP9bGSK";

  //Creating variables tp store value from search bar
  const userSelect = $("#search-input").val();
  //URL endpoint including user's select option and apikey
  const queryUrl =
    "https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=" +
    userSelect +
    "&apikey=" +
    apiKey;

  //Call ticketmaster api using the attractions line of code.
  $.ajax({
    type: "GET",
    url: queryUrl,
    async: true,
    dataType: "json",
  }).then(function (response) {
    console.log(response, "hi2");
    const nameID = response._embedded.attractions;
    console.log(nameID, "hi3");

    //Remove results from webpage following refresh.
    $("#next-events").empty();
    //for loop to run through array
    for (let i = 1; i < nameID.length; i++) {
      const eventID = nameID[i];
      console.log(eventID, "yo");

      //Creating a div which will append the results later.
      let eventsList = $("<div>");

      //Creating a variable that targets the array's url and image fields. URL is wrapped
      //inside image for easy viewing.
      let eventsURL = $(
        `<a target="_blank" href="${eventID.url}"><img src="${eventID.images[0].url}"></a>`
      );
      console.log(eventID.images[0], "yo2");

      //Creating a variable that targets the array's event names and putting it into a h1 header.
      let eventsName = $(`<h1>"${eventID.name}"</h1>`);

      //Appending the data array's event name, url (including the image) to the eventsList div.
      eventsList.append(eventsName, eventsURL);
      //Appending the eventsList div to the div with the corresponding id.
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

  $.ajax(settings)
    .then(function (response) {
      dataSearch = response;
      var trackArtistId = dataSearch.data[0].artist.id;
      const artistSettings = {
        async: true,
        crossDomain: true,
        url: "https://deezerdevs-deezer.p.rapidapi.com/artist/" + trackArtistId,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "df2546054bmshe9048d5ae9a1441p13d910jsn20aabd33d717",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      var artistData;

      $.ajax(artistSettings).done(function (artistResponse) {
        $("#best-albums").empty();
        $("#best-albums").append("<h2>Best tracks</h2>");
        for (let i = 0; i < Math.min(5, dataSearch.total); i++) {
          var trackId = dataSearch.data[i].id;
          var trackTitle = dataSearch.data[i].title;
          var trackPreview = dataSearch.data[i].preview;
          var trackRank = dataSearch.data[i].rank;
          var trackAlbumId = dataSearch.data[i].album.id;
          var trackAlbumTitle = dataSearch.data[i].album.title;
          var trackAlbumImage = dataSearch.data[i].album.cover_medium;

          $("#best-albums").append(`
        <p>Title: ${trackTitle} </p>
        <audio controls>
          <source src="${trackPreview}" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
        <p>Album: ${trackAlbumTitle} </p>
        <p><img src="${trackAlbumImage}" alt="${trackAlbumImage}"> </p>
        `);

          artistData = artistResponse;
          console.log(artistResponse);
          var artistName = artistData.name;
          var artistImage = artistData.picture_medium;
          var artistFans = artistData.nb_fan;
    
          if (i == 0) {
            $("#artist-information").empty();
            $("#artist-information").append("<h2>Artist Information</h2>");
            $("#artist-information").append(`
            <p>Artist: ${artistName}</p>
            <p><img src="${artistImage}" alt="${artistImage}"> </p>
            <p>Fans: ${artistFans}</p>
          `);
          }
        }
      });
    });
});
