var express = require('express')
var app = express();

app.get('/', function(req, res) {
	var result = {
		"originalURL": null,
		"shortenedURL": null
	};

	res.json(result);
})

app.listen(process.env.PORT || 8080, function() {
	console.log("Server Listening on Port 8080");
})