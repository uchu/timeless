var express = require('express');
var router = express.Router();
var fs = require('fs');
var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);
var parser = require('xml2json');
var db = require(libs + 'db/mongoose');
var Article = require(libs + 'model/article');


/* Tmp */
router.get('/', function (req, res) {
	res.json({
	  msg: 'API is running'
	});
});

/* Import settings file and replace existing data */
router.get('/commands/import', function (req, res) {
  var json ={};
	fs.readFile( 'xmldata/Vstplugins.settings', 'utf8', function ( err, xml ) {
		if ( err ) {
			return console.log( err );
		}
		json = JSON.parse( parser.toJson( xml ) );
		var articleId = '1';

		Article.findById( articleId, function ( err, article ) {
			if ( !article ) {
				res.statusCode = 404;
				log.error( 'Article with id: %s Not Found', articleId );
				var article = new Article({
					_id:1,
					settings: json.Settings.Section
				});
			} else {
 				article.settings = json.Settings.Section;
			}
	
			article.save(function (err) {
				if (!err) {
					log.info( 'Article created/updated with id: %s', article.id);
					return res.json({ 
						status: 'OK', 
						msg:article.id
					});
				} else {
					res.statusCode = 500;
					res.json({ 
						error: 'Server error' 
					});
					log.error( 'Internal error(%d): %s', res.statusCode, '0' );
				}
			});
		});
	});
});


module.exports = router;
