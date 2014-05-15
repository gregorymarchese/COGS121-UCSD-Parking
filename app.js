var express = require('express');
var partials = require('express-partials');
var app = express();
var passport = require('passport');
var http = require('http');
var util = require('util');
var path = require('path');


var port = process.env.PORT || 3000;


var dotenv  = require('dotenv');
	dotenv.load();



// configure Express
app.configure(function()
{
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(partials()); 
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res)
{
	res.render('index', { user: req.user});
});



function ensureAuthenticated(req, res, next)
{
	if (req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/');
}
app.listen(port);