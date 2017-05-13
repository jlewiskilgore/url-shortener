# FCC Backend API Project - URL Shortener Microservice

This is microservice API to create a shorted URL of a
given URL. This shortened URL will redirect to the original URL.

Requirements:

1. The user can pass a URL as a parameter and will receive
and shortened URL in the JSON response.

2. If the user passes an invalid URL that doesn't follow the 
expected format "https://www.example.com", the JSON response
will contain an error instead.

3. If the user visites the shortened URL, it will redirect
to the original link.

-----

## Example:

To visit the app's instruction page:

`https://gentle-tor-16236.herokuapp.com/`


To get a new shortened URL:

`https://gentle-tor-16236.herokuapp.com/shorten/[original URL]`

This will return JSON in the form:

`{"originalURL": reqUrl, "shortURL": shortUrl};`
