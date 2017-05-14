var express = require('express')
var app = express();

var MongoClient = require('mongodb').MongoClient;
var dbURL = process.env.MONGOLAB_URL;

app.set('port', (process.env.PORT || 8080));

MongoClient.connect((process.env.MONGOLAB_URL || 'mongodb://<username>:<password>@ds041939.mlab.com:41939/heroku_k8kcdx04'), function(err, db) {
	if(!err) {
		console.log("We are connected");
	}
	else if(err) {
		console.log(err);
	}

	var urls = db.collection('urls');

	app.get('/', function(req, res) {
		res.send(
			'<h1>URL Shortener Microservice API</h1>' +
			'<br>' +
			'<br>' +
			'To shorten a URL use:' +
			'<br>' +
			'<br>' +
			'https://gentle-tor-16236.herokuapp.com/shorten/[url to shorten]' +
			'<br>' +
			'<br>' +
			'This will return a JSON response with the original URL and the shortened URL' +
			'<br>' +
			'<br>' +
			'Valid URL format must start with "http://www" and end with ".com".' +
			'<br>' +
			'Example: ' +
			'<br>' +
			'<br>' +
			'<code>http://www.example.com</code>' +
			'<br>' +
			'<br>' +
			'<code>'
		);
	});

	app.get('/shorten/:url(*)', function(req, res) {
		var reqUrl = req.params.url;
		var isValidURL = validateURL(reqUrl);
		var shortUrl = Math.random().toString(36).slice(-5);
		var result;

		if(isValidURL) {
			isLongUrlStored(reqUrl, function(err, storedResult) {
				if(!storedResult) {
					result = {
						"originalURL": reqUrl,
						"shortURL": shortUrl
					};

					urls.insert(result, function(err, res) {
						if(err) {
							throw err;
						}
						console.log("Url inserted!");
					});
				}
				else {
					console.log("This Url is already stored");
					result = storedResult;
				}
				res.json(result);
			});

		}
		else {
			result = {
				"error": "URL is not in valid format https://www.example.com"
			};
			res.json(result);
		}
	});

	app.get('/:url(*)', function(req, res) {
		var shortUrlValue = req.params.url;

		urls.findOne({ "shortURL": shortUrlValue }, function(err, result) {
			if(err) {
				throw err;
			}

			if(result) {
				res.redirect(result.originalURL);
			}
			else {
				res.send("Error: This short URL does not exist!");
			}
		});
	});

	var isLongUrlStored = function(url, callback) {
		urls.findOne({ "originalURL": url }, function(err, result) {
			if(err) {
				callback(err);
			}

			if(result != null) {
				console.log("Short URL exists");
				callback(null, result);
			}
			else {
				console.log("Short URL does not exist");
				callback(null, false);
			}
		});
	}

	function validateURL(url) {
		var urlArr = url.split(".");

		if(urlArr[0] == "http://www" && urlArr[2] == "com") {
			return true;
		}
		else {
			return false;
		}
	}

	function generateShortUrl() {
		return Math.random().toString(36).slice(-5);
	}

	app.listen(process.env.PORT || 8080, function() {
		console.log("Server Listening on Port 8080");
	});

});
