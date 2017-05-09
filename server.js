var express = require('express')
var app = express();

var MongoClient = require('mongodb').MongoClient;
var dbURL = process.env.MONGOLAB_URL;

app.set('port', (process.env.PORT || 8080));

MongoClient.connect((process.env.MONGOLAB_URL || 'mongodb://localhost:27017/urldb'), function(err, db) {
	if(!err) {
		console.log("We are connected");
		db.close();
	}
	else if(err) {
		console.log(err);
	}

	app.get('/:url(*)', function(req, res) {
		var reqUrl = req.params.url;
		var isValidURL = validateURL(reqUrl);
		console.log(isValidURL);

		if(isValidURL) {
			var result = {
				"originalURL": null,
				"shortenedURL": null
			};
		}
		else {
			var result = {
				"error": "URL is not in valid format https://www.example.com"
			};
		}

		res.json(result);
	});

	function validateURL(url) {
		var urlArr = url.split(".");

		if(urlArr[0] == "http://www" && urlArr[2] == "com") {
			return true;
		}
		else {
			return false;
		}
	}

	app.listen(process.env.PORT || 8080, function() {
		console.log("Server Listening on Port 8080");
	});

});