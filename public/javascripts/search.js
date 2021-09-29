/**
 * set headers ajax
 * https://stackoverflow.com/questions/3258645/pass-request-headers-in-a-jquery-ajax-get-call
 *
 */

// url for fetching the trees
const searchURL =
  "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/search.php";

// Co ordinates for belfast
const belfast = { lat: 54.59771792303645, lng: -5.9300474334489905 };

const icons = {
  man: "https://maps.google.com/mapfiles/kml/shapes/man.png",
  tree: "/images/tree.png",
};
// For stroing the map
var basicMap;
/**
 * Callback function for google maps API
 */
function initialize() {
  basicMap = buildMap();
  // console.log("It worked", map);

  // Get trees around belfast
  getTrees(belfast, 1000);

  // // Get the user location
  // getLocation(success, error, options);
}

// options for geolocation api
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
// Success callback function for the geolocation api
function success(pos) {
  var coord = {};
  coord["latitude"] = pos.coords.latitude;
  coord["longitude"] = pos.coords.longitude;
  // set userLocation
  var userLocation = { lat: coord.latitude, lng: coord.longitude };

  // Add User Marker
  addUserMarker(userLocation, basicMap);

  // get Trees around the user
  getTrees(userLocation, 200);
}
// Error callback function for the geolocation api
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

/**
 * returns a map centered on Belfast
 * Belfast: { lat: 54.59771792303645, lng: -5.9300474334489905 }
 * @returns google.maps.Map
 */
function buildMap() {
  return new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: belfast,
    scaleControl: false,
    fullscreenControl: false,
    zoomControl: false,
  });
}

function addUserMarker(userLocation, map) {
  // The marker, positioned at current Location
  new google.maps.Marker({
    position: userLocation,
    map: map,
    icon: icons["man"],
  });

  // Pan the center of the map to user Location
  map.panTo(userLocation);
  // Zoom to the user
  map.setZoom(18);
}

/**
 * Add Tree Markers to the map
 *
 * @param {*} treeData
 * @param {*} map
 */
function addTreeMarkers(treeData, map) {
  //let markerCount = 1;
  // loop through the treeData and build markers
  for (let i = 0; i <= treeData.length; i++) {
    if ((tree = treeData[i])) {
      //console.log("TreeID: " + tree['ID'] + " Lat: " + tree['Latitude'] + " Long:" + tree['Longitude']);
      let latLng = new google.maps.LatLng(tree["Latitude"], tree["Longitude"]);
      let treeMarker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: icons["tree"],
      });
      //markerCount++;
      // let treeInfoNode =
      //   `<div id = "treeInfoNode">` +
      //   `<table>` +
      //   `<tr> <td> Species Type</td> <td> ${tree["SpeciesType"]}` +
      //   `<tr> <td> Age</td> <td> ${tree["Age"]}` +
      //   `<tr> <td> Condition</td> <td> ${tree["Condition"]}` +
      //   `</table>` +
      //   `<p> <a href="http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/app/update.php?treeid=${tree['ID']}">Update</a></p>` +
      //   `<p> <a href="http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/app/tree.php?treeid=${tree['ID']}">Open</a> </p> <div>`;
      let treeInfoNode =
        `<div class= "card">` +
        `<div class="card-content">` +
        `<div class="content">` +
        `<table>` +
        `<tr> <td> Species Type</td> <td> ${tree["SpeciesType"]}` +
        `<tr> <td> Age</td> <td> ${tree["Age"]}` +
        `<tr> <td> Condition</td> <td> ${tree["Condition"]}` +
        `</table>` +
        `<div>` +
        `<div>` +
        `<footer class="card-footer">` +
        `<a href='/update/${tree["ID"]}' class="card-footer-item">Update</a>` +
        `<a href='/tree/${tree["ID"]}' class="card-footer-item">More Details</a>` +
        `<a href='/updates/${tree["ID"]}' class="card-footer-item">See all Updates</a>` +
        `</footer>` +
        `<div>`;
      // Create the infoWindows
      let treeInfoWindow = new google.maps.InfoWindow({
        content: treeInfoNode,
      });
      treeMarker.addListener("click", () => {
        treeInfoWindow.open({
          anchor: treeMarker,
          map,
          shouldFocus: true,
        });
      });
    }
  }
  //console.log("Markers: " + markerCount);
}

// get the Trees from the treechamp api
function getTrees(coord, surround) {
  // console.log("Getting Trees...");
  var sendData = {
    latitude: coord["lat"],
    longitude: coord["lng"],
    surround: surround,
  };
  // console.log("Sending Request..." );
  // console.log(sendData);
  $.getJSON(searchURL, sendData, function (data, textStatus, jqXHR) {
    //console.log(data);

    addTreeMarkers(data, basicMap);
    //console.log(data);
  });
}
// function to get the geolocation api
function getLocation(success, error, options) {
  //console.log("Getting location...");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

$("#showNearbyTrees").on("click", (e) => {
  getLocation(success, error, options);
  e.preventDefault();
});

$("#login").on("click", (e) => {
  window.location.href = "/user/login";
});

$("#register").on("click", (e) => {
  window.location.href = "/user/register";
  e.preventDefault();
});


