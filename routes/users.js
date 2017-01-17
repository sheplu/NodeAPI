var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');

var count = 0;

router.all('/*', function(req, res, next) {
	console.log("catch all");
	count++;
	console.log(count);
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token == "admin") {
		next();
	}
	else {
		res.json({message: 'Authentificate'});
	}
});

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
  		password: crypto.createHmac('sha256', 'test').update(req.body.password).digest('hex')
  	}).save(function(err, user) {
  		if (err) {
  			res.json(err);
  		}
  		res.json(user)
  	});
});

//LOGIN
router.post('/login', function(req, res, next) {
  	User.findOne({
  		mail: req.body.mail,
  		password: crypto.createHmac('sha256', 'test').update(req.body.password).digest('hex')
  	}).exec( function(err, user) {
  		if (err) {
  			res.json(err);
  		}
  		if (user) {
  			res.json(user);
  		}
  		else {
  			res.json("No user");
  		}
  	})
});

// list all users
router.get('/all', function(req, res, next) {
  User.find({}, function(err, users) {
  		if(err) throw err;
  		res.json(users);
  });
});

// list selected users with mail 
router.get('/:mail', function(req, res, next) {
  User.find({mail: req.params.mail}, function(err, users) {
  		if(err) throw err;
  		res.json(users);
  });
});

// find one user an remove 
router.delete('/:mail', function(req, res, next) {
	User.findOneAndRemove({mail: req.params.mail}, function(err, user) {
		if(err) {
			res.json(err);
		}
		res.json({message: "Delete"});
	})
});

// Update user
router.patch('/update', function(req, res, next) {
	User.findOneAndUpdate({
		mail: req.body.mail
	}, 
	{
		$set: req.body
	}, 
	{
		new: true
	}, 
	function(err, user) {
		if (err) {
			res.json(err)
		}
		res.json(user);
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