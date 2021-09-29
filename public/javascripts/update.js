var updateData = {};
var postURL =
  "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/update.php";

// set treeid
function setData(treeid) {
  updateData["treeid"] = treeid;
}

$("#submit").on("click", (e) => {
  updateData["uid"] = 7;
  updateData["appid"] =
    "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn";
  updateData["title"] = $("#title").val();
  updateData["description"] = $("#description").val();
  updateData["caption"] = $("#caption").val();
  updateData["issue"] = $("#issue").val();
  console.log(updateData);

  //   $.ajaxSetup({
  //     beforeSend: function (xhr) {
  //         xhr.setRequestHeader("uid", 7);
  //         xhr.setRequestHeader("appid", "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn");
  //       }
  // });
  $.ajax({
    type: "POST",
    url: postURL,
    cors: true,
    data: updateData,
    dataType: "json",
    beforeSend: function (xhr) {
    //   xhr.setRequestHeader("uid", 7);
    //   xhr.setRequestHeader(
    //     "appid",
    //     "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn"
    //   );
    // xhr.setRequestHeader("Access-Control-Request-Headers" , "access-control-allow-methods,access-control-allow-origin");
    },
    headers: {
    //"Access-Control-Request-Headers": "access-control-allow-methods,access-control-allow-origin,appid,uid",
      "Access-Control-Allow-Origin": "*",
        "uid" : '7',
        "appid" : "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn",
    },
    success: function (response) {
      console.log(response);
    },
    // headers : {
    //     'Access-Control-Allow-Headers': 'x-requested-with',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': "GET POST",
    //     'uid' : 7,
    //     'appid' : "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn"
    // }
    error: function (request, response, error) {
      console.log(request, response, error);
    },
  });
  // $.post(postURL, updateData, function(response) {
  //     console.log(response);
  // });
  e.preventDefault();
});

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "don-cloud-storage",
    uploadPreset: "treechamp",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      updateData["imgURL"] = result.info["secure_url"];
    }
  }
);

// document.getElementById("upload_widget").addEventListener("click", function() {
//     myWidget.open();
// }, false);

$("#upload_widget").on("click", (e) => {
  myWidget.open();
  e.preventDefault();
});
