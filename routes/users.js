var express = require('express');
var router = express.Router();

const request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile/:userid/:appid', function(req, res, next) {

  var profileurl = "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/profile.php";
  var userid = req.params.userid;
  var appid = req.params.appid;

  const options = {
    url: profileurl,
    method: "GET",
    headers: {
      Accept: "application/json",
      "uid": userid,
      "appid" : appid
    },
  };

  request(options, function (err, resp, body) {
    let json = JSON.parse(body);

    if(json["status"] == "Success") {
      userdata = json['data'];
      res.render('profile', {userFound: true, username: userdata['username']});
    } else {
      res.render('profile', {userFound: false });
    }
  });
});
router.get('/updates/:userid', function(req, res, next) {
  res.render('userupdates');
}); 
router.get('/admin/:userid', function(req, res, next) {
  res.render('admin');
});

router.get('/logout', function(req, res, next) {
  res.render('logout');
});
module.exports = router;
