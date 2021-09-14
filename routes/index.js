var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var loggedin = false;
  res.render('index', { title: 'TreeChamp', loggedin: loggedin});
});


module.exports = router;
