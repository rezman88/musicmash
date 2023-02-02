const apiKey = "koyiY4a6cOCBRXLNERvKYy8umxP9bGSK";

$("#search-button").on("submit", function (event) {
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
});
// });
