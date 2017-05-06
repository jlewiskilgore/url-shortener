var express = require('express')
var app = express();

app.get('/', function(req, res) {
	var isValidURL = validateURL('http://www.google.com');
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