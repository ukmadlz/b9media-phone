/***
	Primary App file
	----------------
	Author: Mike Elsmore <mike@elsmore.me> @ukmadlz
***/

/* Initial Requires for Express */
// Express
var express = require('express');
var app = express();
// Jade
var jade = require('jade');
// Stylus
var stylus = require('stylus');
// Nib
var nib = require('nib');

/* Set Up App */
process.env.TZ = 'Europe/London';
var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
))
app.use(express.static(__dirname + '/public'));
app.use(express.logger());

// Index
app.get('/', function (req, res) {

	// Check that the office is open
	var d=new Date();
	if(d.getDay()>=1 && d.getDay()<=5 && d.getHours()>=9 && d.getHours()<17)
	{
		require('./menuOptions.js');	
		console.log(d.getDay());
		console.log(d.getHours());
		var openClosed = 'index';
	}
	else
	{
		var openClosed = 'closed';
	}

	res.render(openClosed,{
		title : 'Home'
	})
})

// Start Listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});