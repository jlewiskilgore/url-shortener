var express = require('express')
var app = express();

var MongoClient = require('mongodb').MongoClient;
var dbURL = process.env.MONGOLAB_URL;

app.set('port', (process.env.PORT || 8080));

MongoClient.connect((process.env.MONGOLAB_URL || 'mongodb://localhost:27017/urldb'), function(err, db) {
	if(!err) {
		console.log("We are connected");
	}
	else if(err) {
		console.log(err);
	}

	var urls = db.collection('urls');

	app.get('/shorten/:url(*)', function(req, res) {
		var reqUrl = req.params.url;
		var isValidURL = validateURL(reqUrl);

		if(isValidURL) {
			var result = {
				"originalURL": reqUrl,
				"shortURL": null
			};

			urls.insert(result, function(err, res) {
				if(err) {
					throw err;
				}

				console.log("Url inserted!");
			});
		}
		else {
			var result = {
				"error": "URL is not in valid format https://www.example.com"
			};
		}

		res.json(result);
	});

	app.get('/:url(*)', function(req, res) {
		console.log("test");
		var redirectUrl = req.params.url;
		res.redirect(redirectUrl);
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