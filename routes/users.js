var express = require('express');
var router = express.Router();

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
router.get('/profile/:userid', function(req,res,next){
  res.render('profile');
}); 

router.get('/admin/:userid', function(req, res, next) {
  res.render('admin');
});

router.get('/logout', function(req, res, next) {
  
});
module.exports = router;
