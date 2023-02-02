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
