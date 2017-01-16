var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
		firstname: String,
		lastname: String,
		mail: String
});

module.exports = mongoose.model('User', User);