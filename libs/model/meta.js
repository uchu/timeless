var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Meta = new Schema({
	_id: String,
	options: Object
},
{strict: false});


module.exports = mongoose.model('Meta', Meta);