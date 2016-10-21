var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Article
var Images = new Schema({
	kind: {
		type: String,
		enum: ['thumbnail', 'detail'],
		required: true
	},
	url: { type: String, required: true }
});

var Article = new Schema({
		_id: String,
		settings: Object
	},
	{strict: false});
	

/*
Article.path('title').validate(function (v) {
	return v.length > 5 && v.length < 70;
});
*/

module.exports = mongoose.model('Article', Article);