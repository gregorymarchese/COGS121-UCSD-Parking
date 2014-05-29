//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();

//route files to load
var index = require('./routes/index');
var search = require('./routes/search');
var parking = require('./routes/parking');
var info = require('./routes/info');
var map = require('./routes/map');

//database setup - uncomment to set up your database
//var mongoose = require('mongoose');
//mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/DATABASE1);

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

//routes
app.get('/', index.view);
app.get('/search', search.view);
app.get('/parking', parking.view);
app.get('/info', info.view);
app.get('/map', map.view);
//app.get('/funcroute', funcroute.functname);
//res.json(data);
//route for json object will return json object with list of all different parking structures and 
//avgs chances for each strucutre

//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});