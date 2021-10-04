var treeLocation = {};

var icon = {
    tree: "/images/tree.png"
};

function showTree() {
    // how to get tree data
    //var pathname = window.location.pathname;
  console.log(treeLocation);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: treeLocation,
    // scaleControl: false,
    // fullscreenControl: false,
    // zoomControl: false,
  });

  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: treeLocation,
    map: map,
    icon: icon['tree']
  });
}

function setData(lat,lng, treeid) {
    treeLocation['lat'] = lat;
    treeLocation['lng'] = lng;
    // treeid = treeid;
    // console.log("treeid: "+ treeid);

    // $("#all-updates").on('click', (e) => {
    //     window.location.href=`/updates/${treeid}`;
    // });
    
    // $("#update").on('click', (e) => {
    //     window.location.href=`/update/${treeid}`;
    // });
}


