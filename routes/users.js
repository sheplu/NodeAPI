var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next) {
  	new User({
  		firstname: "Jean",
  		lastname: "Burellier",
  		mail: "aa@bb.cc"
  	}).save();

  res.send('create user');
});

// http://localhost:3000/users/newGET
//?firstname=Bob&lastname=Dylan&mail=bd@gmail.com
router.get('/newGET', function(req, res, next) {
	console.log("query" + req.query.firstname);
  	new User({
  		firstname: req.query.firstname,
  		lastname: req.query.lastname,
  		mail: req.query.mail
  	}).save();

  res.send('create user');
});

module.exports = router;
