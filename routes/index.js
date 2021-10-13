var express = require("express");
var router = express.Router();

const request = require("request");

router.get("/", function (req, res, next) {
  var loggedin = true;

  res.render("index", { title: "TreeChamp", loggedin: loggedin });
});

router.get("/update/:treeid", function (req, res, next) {
  res.render("update", { treeid: req.params.treeid });
});

// router.post("/upload/:treeid", function(req, res, next) {

// });
router.get("/update/details/:updateid", function (req, res, next) {
  var updateid = req.params.updateid;

  const options = {
    url: `http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/update.php?updateid=${updateid}`,
    method: "GET",
    headers: {
      uid: 7,
      appid: "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn",
    },
  };

  request(options, function (err, resp, body) {
    var json = JSON.parse(body);

    // check if the status is success or error
    if (json["status"] == "Success") {
      update = json["data"];
      //console.log(update);
      var imgURL;
      var post = false;
      var posts = update["posts"];
      if (posts[0]) {
        post = true;
        imgURL = posts[0]["imgURL"];
        console.log(imgURL);
      }

      res.render("udetails", {
        updateFound: true,
        title: update["title"],
        description: update["description"],
        issue: update["issue"],
        date: update["dateadded"],
        solved: update["solved"],
        post: post,
        imgURL: imgURL,
      });

      //console.log(updates);
    } else {
      res.render("udetails", { updateFound: false });
    }
  });
});

router.get("/updates/:treeid?", function (req, res, next) {
  // Work on no updates
  // Implement authentication route

  var usertype = req.query.status;
  var treeid = req.params.treeid;
  var updates;
  //console.log(usertype);
  const options = {
    url: `http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/update.php?treeid=${treeid}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      uid: 7,
      appid: "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn",
    },
  };
  //console.log(usertype);
  request(options, function (err, resp, body) {
    var json = JSON.parse(body);

    // check if the status is success or error
    if (json["status"] == "Success") {
      updates = json["data"];
      //console.log(updates);
      res.render("updates", {
        updatesFound: true,
        updates: updates,
        treeid: treeid,
        usertype: usertype,
      });
      //console.log(updates);
    } else {
      res.render("updates", { updatesFound: false, treeid: treeid });
    }
  });
});

router.get("/updates/all/:usertype", function (req, res, next) {
  var usertype = req.params.usertype;
  const options = {
    url: `http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/update.php`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      uid: 18,
      appid: "ZBF80gjSMQkKeycwXHBUM7d1GfIYp22yAk2t23Hr6X44CfmSpbadoplp6QAbfOZO",
    },
  };

  request(options, function (err, resp, body) {
    var json = JSON.parse(body);
    console.log("here");
    // check if the status is success or error
    if (json["status"] == "Success") {
      console.log("here");
      updates = json["data"];

      var report = {};
      report.totalupdates = updates.length;
      //console.log(report.totalupdates);
      report.totalissues = 0;
      report.issuesolved = 0;
      report.unsolvedissues = 0;

      var nupdates = [];
      var unsolvedIssues = [];
      console.log(unsolvedIssues.length);
      var solvedIssues = [];
      // Gathering report
      updates.forEach((update) => {
        if (update.issue == true) {
          report.totalissues += 1;
          //nissues.push(update);
        }

        if (update.issue == true && update.solved == true) {
          report.issuesolved += 1;
          solvedIssues.push(update);
        }

        if (update.issue == true && update.solved == false) {
          report.unsolvedissues += 1;
          unsolvedIssues.push(update);
        }

        if (update.issue == false) nupdates.push(update);
      });

      //report.unsolvedissues = report.totalissues-report.solvedIssues;
      console.log(report.unsolvedissues);
      //console.log(report);
      //console.log("unsolved issues: "+ unsolvedIssues.length);
      //console.log(updates);
      res.render("report", {
        updatesFound: true,
        updates: nupdates,
        report: report,
        solvedIssues: solvedIssues,
        unsolvedIssues: unsolvedIssues,
        usertype: usertype,
      });

      //res.render("updates", { updatesFound: false});
      //console.log(updates);
    } else {
      res.render("updates", { updatesFound: false, treeid: treeid });
    }
  });

  //res.render("updates", {updatesFound: false});
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

    treedata = json["data"];
    //console.log(treedata);
    resp.render("tree", {
      treedata: treedata,
      lat: treedata["Latitude"],
      long: treedata["Longitude"],
      treeid: treedata["ID"],
    });
  });
});

module.exports = router;
