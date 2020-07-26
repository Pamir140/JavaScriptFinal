var heading = document.querySelector("#heading");
var section = document.querySelector("section");
var requestURL = "products.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  var products = request.response;
  console.log(products);
  var companyName = document.createElement("h1");
  companyName.textContent = products["companyName"];
  heading.appendChild(companyName);
  showtopDeals(products);
};

function showtopDeals(jsonObject) {
  var topDeals = jsonObject["topDeals"];
  for (var i = 0; i < topDeals.length; i++) {
    var article = document.createElement("article");
    article.setAttribute("class", "col-sm-4");
    var h2 = document.createElement("h2");
    h2.setAttribute("class", "text-primary");
    var description = document.createElement("p");
    description.textContent = topDeals[i].description;
    var img = document.createElement("img");
    img.setAttribute("height", "100px");
    img.setAttribute("width", "auto");
    h2.textContent = topDeals[i].name;
    img.setAttribute("src", "images/" + topDeals[i].image);

    article.appendChild(h2);
    article.appendChild(description);
    article.appendChild(img);
    section.appendChild(article);
  }
}

// here is reference for API that I have used
/*
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API*/

function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapLink =
      "https://maps.google.com/maps?q=" +
      latitude +
      ", " +
      longitude +
      "&z=15&output=embed&z=17";
    status.textContent =
      "latitude = " + latitude + ",  longitude = " + longitude;
    document
      .querySelector("#locateUrSelf")
      .setAttribute("src", mapLink.toString());
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Location tracking is not supported";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.watchPosition(success, error);
  }
}

window.onload = geoFindMe();
