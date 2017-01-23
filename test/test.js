process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var User = require('../models/user');

var should = chai.should();

chai.use(chaiHttp);

describe('Test', function() {
	this.timeout(5000);
	it('should show index page / GET', function(done) {
		chai.request(server)
			.get('/')
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.html;
				done();
			})
	});
	it('should register one user in /registerP POST', function(done) {
		chai.request(server)
			.post('/registerP')
			.send({
				'username': "MG",
				'firstname': "Mac",
				'lastname': "Gyver",
				'mail': "mg@gmail.com", 
				'password': "aqwzsx"
			})
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('username');
				done();
			})
	});
})