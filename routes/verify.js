var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function(user) {
	return jwt.sign(user, config.secretKey);
};

exports.verifyUser = function(req, res, next) {
	console.log("test");
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				res.json("error");
			}
			else {
				console.log("decoded" + decoded);
				req.decoded = decoded;
				next();
			}
		})
	}
	else {
		res.json({message: "no token"});
	}
};