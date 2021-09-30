var express = require("express");
var router = express.Router();

const request = require("request");


router.get("/", function (req, res, next) {
  var loggedin = true;
  

  res.render("index", { title: "TreeChamp", loggedin: loggedin });
});

router.get("/update/:treeid", function (req, res, next) { 
  
  res.render("update", {treeid: req.params.treeid});
});

router.post("/upload/:treeid", function(req, res, next) {

});

router.get("/updates/:treeid", function(req, res, next) {

  // Work on no updates
  // Implement authentication route

  var treeid = req.params.treeid;
  var updates;  

  const options = {
    url: `http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/update.php?treeid=${treeid}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      uid: 7,
      appid: "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn"
    },
  };

  request(options, function (err, resp, body) {
    var json = JSON.parse(body);
    

    // check if the status is success or error
    if(json['status'] == "Success") {
      updates = json['data'];
      res.render("updates", { "updatesFound": true, "updates" : updates, treeid: treeid });
      //console.log(updates);
    } else {
      res.render("updates", {"updatesFound": false, treeid: treeid})
    }
  }); 
});

router.get("/tree/:treeid", function (req, resp, next) {
  var treeid = req.params.treeid;
  var treedata;
  const options = {
    url: `http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/tree.php?treeid=${treeid}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
    },
  };

  request(options, function (err, res, body) {
    let json = JSON.parse(body);

    treedata = json['data'];
    console.log(treedata);
    resp.render("tree", {treedata: treedata, lat: treedata['Latitude'], long: treedata['Longitude'], treeid: treedata['ID']});
  });
});

module.exports = router;
