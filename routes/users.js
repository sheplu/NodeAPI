var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// REGISTER
router.post('/register', function(req, res, next) {
  	new User({
  		firstname: req.body.firstname,
  		lastname: req.body.lastname,
  		mail: req.body.mail,
  		password: crypto.createHmac('sha1', 'test').update(req.body.password).digest('hex')
  	}).save(function(err, user) {
  		if (err) {
  			res.json("error");
  		}
  		res.json(user)
  	});
});

router.get('/new', function(req, res, next) {
  	new User({
  		firstname: "Jean",
  		lastname: "Burellier",
  		mail: "aa@bb.cc"
  	}).save();

  res.send('create user');
});

router.get('/all', function(req, res, next) {
  User.find({}, function(err, users) {
  		if(err) throw err;
  		res.json(users);
  });
});

router.get('/one', function(req, res, next) {
  User.find({firstname: "Jean"}, function(err, users) {
  		if(err) throw err;
  		res.json(users);
  });
});

router.post('/newPOST', function(req, res, next) {
  	new User({
  		firstname: req.body.firstname,
  		lastname: req.body.lastname,
  		mail: req.body.mail
  	}).save();

  res.send('create POST user');
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

  res.send('create GET user');
});

module.exports = router;
