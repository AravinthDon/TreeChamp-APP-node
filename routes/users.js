var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/profile/:userid', function(req,res,next){
  res.render('profile');
}); 

router.get('/admin/:userid', function(req, res, next) {
  res.render('admin');
});
module.exports = router;
