var updateData = {};
var postURL =
  "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/update.php";

// set treeid
function setData(treeid) {
  updateData["treeid"] = treeid;
}

$("#submit").on("click", (e) => {
  updateData["uid"] = window.sessionStorage.getItem("userid");
  updateData["appid"] = window.sessionStorage.getItem("appid");

  var title = $("#title").val();
  var description = $("#description").val();

  if (title && description) {
    updateData["title"] = title;
    updateData["description"] = description;

    updateData["caption"] = $("#caption").val();
    updateData["issue"] = $("#issue").val();

    $.ajax({
      type: "POST",
      url: postURL,
      data: updateData,
      headers: {
        //"Access-Control-Request-Headers": "access-control-allow-methods,access-control-allow-origin,appid,uid",
        uid: window.sessionStorage.getItem("userid"),
        appid: window.sessionStorage.getItem("appid"),
      },
      success: function (response) {
        console.log(response);
        $("#upload-success").addClass("is-active");
      },
      error: function (request, response, error) {
        console.log(request, response, error);
      },
    });

  } else {
    $(".help").toggle();
  }

  /**
   * Testing the dummy route
   */

  // $.ajax({
  //   url: "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/dummy.php",
  //   method: 'POST',
  //   data: {},
  //   headers : {
  //     "uid" : 7,
  //     "appid" : "s"
  //   },
  //   success: function(response) {
  //     console.log(response);
  //   }
  // });
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
      //console.log("Done! Here is the image info: ", result.info);
      updateData["imgURL"] = result.info["secure_url"];

      // update the image on the display
      $("#upload_widget").attr("src", updateData["imgURL"]);
      $("#image-delete").addClass("has-background-danger");
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

$("#image-delete").on("click", (e) => {
  $("#upload_widget").attr("src", "/images/addimage.png");
  $("#image-delete").removeClass("has-background-danger");
  // delete the image URL in the updateData if available
  if (updateData["imgURL"]) {
    delete updateData.imgURL;
  }

  e.preventDefault();
});

$("#cancel-upload").on("click", (e) => {
  window.location.href = "/";
  e.preventDefault();
});

$("#upload-modal-close").on("click", (e) => {
  window.location.href = "/";
  e.preventDefault();
});

$("#upload-modal-another").on("click", (e) => {
  window.location.reload();
  e.preventDefault();
});
