var express = require('express');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Meta = require(libs + 'model/meta');


router.get('/:path', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(123, req.params.path);
	var path = req.params.path
	
	
/*
	var meta = new Meta({
		_id : path ,
		options: {'foo':1}
	});

	meta.save(function (err) {
		if (!err) {
			log.info("New meta created with id: %s", meta.id);
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.json({ 
					error: 'Validation error' 
				});
			} else {
				res.statusCode = 500;
				res.json({ 
					error: 'Server error' 
				});
			}
			log.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
*/
	
	
	Meta.findById( path, function (err, meta) {
		if (!err) {
			console.log('no error', meta)
			return res.json(meta);
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});


module.exports = router;