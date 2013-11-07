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
// URL
var url = require('url');

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
	if( d.getDay()>=1 // Monday
		&& d.getDay()<=5 // Friday
		&& d.getHours()>=9 // 9am
		&& d.getHours()<17) // 5pm
	{
		var a = require('./menuOptions.js');	
		menuOptions = a.menuOptions;
		var openClosed = 'index';
	}
	else
	{
		var openClosed = 'closed';
		var menuOptions = [];
	}

	res.render(openClosed,{
		menu: menuOptions
	})
});

// Dial
app.get('/dial',function (req, res) {
	// Which key was pressed
	var keyPressed = req.query.Digits;

	var a = require('./menuOptions.js');	
	menuOptions = a.menuOptions;

	// If pressed 0
	if(keyPressed=='0')
	{
		res.render('record',{
			menu: menuOptions
		});
	}
	else
	{
		res.render('dial',{
			name: menuOptions[keyPressed].name,
			number: menuOptions[keyPressed].number
		});	
	}
});

// Start Listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});