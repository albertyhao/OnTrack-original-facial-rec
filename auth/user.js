var mongoose = require('mongoose');

var model = mongoose.model('user', new mongoose.Schema({
	userName: {type: String, unique: true}
	, password: {type: String}
  , salt: {type: String}
	, avatar: {type: String}
}));

exports.getModel = function() {
	return model;
}
