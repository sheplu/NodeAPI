var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
		firstname: String,
		lastname: String,
		mail: {
			type: String,
			unique: true
		},
		password: String
});

module.exports = mongoose.model('User', User);