$(document).ready(function () {
    /**
     * set headers ajax
     * https://stackoverflow.com/questions/3258645/pass-request-headers-in-a-jquery-ajax-get-call
     * 
     */
    // url for fetching the trees
    var url =
      "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/search.php";
    
    // Map variable
    const map;
  
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
  
      getTrees(coord);
    }
  
    // Error callback function for the geolocation api
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    // Initialize and add the map
    function buildMap(userLocation, treeData) {
      
      let icons = {
          man: "https://maps.google.com/mapfiles/kml/shapes/man.png"
      }
      // create the map
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: userLocation,
        scaleControl: false,
        fullscreenControl: false,
        zoomControl: false
      });
  
      // The marker, positioned at current Location
      new google.maps.Marker({
        position: userLocation,
        map: map,
        icon: icons['man']
      });
  
      //let markerCount = 1;
      // loop through the treeData and build markers
      for (let i = 0; i <= treeData.length; i++) {
        if ((tree = treeData[i])) {
          //console.log("TreeID: " + tree['ID'] + " Lat: " + tree['Latitude'] + " Long:" + tree['Longitude']);
          let latLng = new google.maps.LatLng(
            tree["Latitude"],
            tree["Longitude"]
          );
          let treeMarker = new google.maps.Marker({
            position: latLng,
            map: map,
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
              `<div>`+
            `<div>` +
            `<footer class="card-footer">`+
              `<a href="#" class="card-footer-item">Update</a>` +
              `<a href="#" class="card-footer-item">Open</a>` +
              `<a href="#" class="card-footer-item">See all Updates</a>`+
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
    function getTrees(coord) {
      var sendData = {
        latitude: coord["latitude"],
        longitude: coord["longitude"],
        surround: 200,
      };
      // console.log("Sending Request..." );
      // console.log(sendData);
      $.getJSON(url, sendData, function (data, textStatus, jqXHR) {
        //console.log(data);
        var userLocation = { lat: coord.latitude, lng: coord.longitude };
        buildMap(userLocation, data);
        //console.log(data);
      });
    }
  
    // function to get the geolocation api
    function getLocation(success, error, options) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  
    getLocation(success, error, options);
  });
  