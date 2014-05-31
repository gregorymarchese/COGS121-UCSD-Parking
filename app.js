//dependencies for each module used
var express = require('express');
var app = express();
var http = require('http').Server(app);
//var server = http.createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var handlebars = require('express3-handlebars');
var dotenv = require('dotenv');
dotenv.load();
var geolib = require('geolib');




//route files to load
var index = require('./routes/index');
var search = require('./routes/search');
var parking = require('./routes/parking');
var info = require('./routes/info');
var map = require('./routes/map');


//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

var mysql = require('mysql');
var db = mysql.createConnection(
{
  host     : process.env.SQLHOST,
  user     : process.env.SQLUSER,
  password : process.env.SQLPASS,
  database : process.env.SQLDB
});
db.connect();

//routes
app.get('/', index.view);
app.get('/search', search.view);
app.get('/parking', parking.view);
app.get('/info', info.view);
app.get('/map', map.view);

//================================================================================================================================================================================================


//GET GENERAL INVENTORY LIST
	app.get('/inventory', function(req,res)
	{
		db.query('SELECT * FROM INVENTORY',function(err,rows,fields)
		{
			if(err)throw err;
			res.json(rows);
		});
	});

//GET INVENTORY FOR ONE LOT
	app.get('/inventory/:lot', function(req,res)
	{
		db.query('SELECT * FROM INVENTORY WHERE LOT LIKE "'+req.params.lot+'"',function(err,rows,fields)
		{
			if(err)throw err;
			res.json(rows);
		});
	});


//================================================================================================================================================================================================


//GET ALL OCCUPANCY
	app.get('/occupancy', function(req,res)
	{
		db.query('SELECT * FROM OCCUPANCY',function(err,rows,fields)
		{
			if(err)throw err;
			res.json(rows);
		});
	});

//GET OCCUPANCY FOR A LOT
	app.get('/occupancy/:lot', function(req,res)
	{
		db.query('SELECT * FROM OCCUPANCY WHERE LOT LIKE "'+req.params.lot+'"',function(err,rows,fields)
		{
			if(err)throw err;
			res.json(rows);
		});
	});

//GET OCCUPANCY FOR A LOT FOR A PERMIT
	app.get('/occupancy/:lot/:permit', function(req,res)
	{
		db.query('SELECT * FROM OCCUPANCY WHERE LOT LIKE "'+req.params.lot+'"'+' AND TYPE LIKE "'+req.params.permit+'"',function(err,rows,fields)
		{
			if(err)throw err;
			res.json(rows);
		});
	});

//GET OCCUPANCY FOR A LOT FOR A PERMIT AT A TIME
	app.get('/occupancy/:lot/:permit/:time', function(req,res)
	{
		db.query('SELECT LOT, TYPE, TIME'+req.params.time+' FROM OCCUPANCY WHERE LOT LIKE "'+req.params.lot+'"'+' AND TYPE LIKE "'+req.params.permit+'"',function(err,rows,fields)
		{
			if(err)throw err;
			res.json(rows);
		});
	});


//================================================================================================================================================================================================


//GET GENERAL CAMPUS PROJECTION
	app.get('/projected', function(req,res)
	{
		db.query('SELECT * FROM OCCUPANCY',function(err,rows,fields)
		{
			if(err)throw err;
			var mysum= 0;
				function makesum(i)
				{ 
	  				if (i < rows.length)
	  				{
	    				mysum = mysum
	    						+rows[i].TIME8
	    						+rows[i].TIME9
	    						+rows[i].TIME10
	    						+rows[i].TIME11
	    						+rows[i].TIME12
	    						+rows[i].TIME13
	    						+rows[i].TIME14
	    						+rows[i].TIME15
	    						+rows[i].TIME16
	    						+rows[i].TIME17;
	    				makesum(i+1);
	   				}
				}
				makesum(0);
			var returnJSON = [];
			var tempJSON = {};
	    		tempJSON.LOT = 'UCSD CAMPUS';
	    		tempJSON.TYPE = 'ALL PERMITS';
	    		tempJSON.SUM = mysum;
	    		tempJSON.AVG = (mysum/rows.length).toFixed(0);
	    		tempJSON.ROWS = rows.length;
	    		tempJSON.TIME = 'ALL HOURS';
	    		returnJSON.push(tempJSON);
			res.json(returnJSON);
		});
	});

//GET PROJECTION FOR A LOT
	app.get('/projected/:lot', function(req,res)
	{
		db.query('SELECT * FROM OCCUPANCY WHERE LOT LIKE "'+req.params.lot+'"',function(err,rows,fields)
		{
			if(err)throw err;
			var mysum= 0;
				function makesum(i)
				{ 
	  				if (i < rows.length)
	  				{
	    				mysum = mysum
	    						+rows[i].TIME8
	    						+rows[i].TIME9
	    						+rows[i].TIME10
	    						+rows[i].TIME11
	    						+rows[i].TIME12
	    						+rows[i].TIME13
	    						+rows[i].TIME14
	    						+rows[i].TIME15
	    						+rows[i].TIME16
	    						+rows[i].TIME17;
	    				makesum(i+1);
	   				}
				}
				makesum(0);
			var returnJSON = [];
			var tempJSON = {};
	    		tempJSON.LOT = rows[0].LOT;
	    		tempJSON.TYPE = 'ALL PERMITS';
	    		tempJSON.SUM = mysum;
	    		tempJSON.AVG = (mysum/rows.length).toFixed(0);
	    		tempJSON.ROWS = rows.length;
	    		tempJSON.TIME = 'ALL HOURS';
	    		returnJSON.push(tempJSON);
			res.json(returnJSON);
		});
	});

//GET PROJECTION FOR A LOT FOR A PERMIT
	app.get('/projected/:lot/:permit', function(req,res)
	{
		db.query('SELECT * FROM OCCUPANCY WHERE LOT LIKE "'+req.params.lot+'"'+' AND TYPE LIKE "'+req.params.permit+'"',function(err,rows,fields)
		{
			if(err)throw err;
			var mysum= 0;
				function makesum(i)
				{ 
	  				if (i < rows.length)
	  				{
	    				mysum = mysum
	    						+rows[i].TIME8
	    						+rows[i].TIME9
	    						+rows[i].TIME10
	    						+rows[i].TIME11
	    						+rows[i].TIME12
	    						+rows[i].TIME13
	    						+rows[i].TIME14
	    						+rows[i].TIME15
	    						+rows[i].TIME16
	    						+rows[i].TIME17;
	    				makesum(i+1);
	   				}
				}
				makesum(0);
			var returnJSON = [];
			var tempJSON = {};
	    		tempJSON.LOT = rows[0].LOT;
	    		tempJSON.TYPE = req.params.permit;
	    		tempJSON.SUM = mysum;
	    		tempJSON.AVG = (mysum/rows.length).toFixed(0);
	    		tempJSON.ROWS = rows.length;
	    		tempJSON.TIME = 'ALL HOURS';
	    		returnJSON.push(tempJSON);
			res.json(returnJSON);
		});
	});

//GET PROJECTION FOR A LOT, PERMIT AND TIME
	app.get('/projected/:lot/:permit/:time', function(req,res)
	{
		db.query('SELECT LOT, TYPE, TIME'+req.params.time+' AS COUNT FROM OCCUPANCY WHERE LOT LIKE "'+req.params.lot+'"'+' AND TYPE LIKE "'+req.params.permit+'"',function(err,rows,fields)
		{
			if(err)throw err;
			var mysum= 0;
				function makesum(i)
				{ 
	  				if (i < rows.length)
	  				{
	    				mysum = mysum+rows[i].COUNT;
	    				makesum(i+1);
	   				}
				}
				makesum(0);
			var returnJSON = [];
			var tempJSON = {};
	    		tempJSON.LOT = rows[0].LOT;
	    		tempJSON.TYPE = req.params.permit;
	    		tempJSON.SUM = mysum;
	    		tempJSON.AVG = (mysum/rows.length).toFixed(0);
	    		tempJSON.ROWS = rows.length;
	    		tempJSON.TIME = 'TIME'+req.params.time;
	    		returnJSON.push(tempJSON);
			res.json(returnJSON);
		});
	});


//================================================================================================================================================================================================


//FIND DISTANCE BETWEEN LAT/LONS
	app.get('/distance/:lat1/:lng1/:lat2/:lng2', function(req, res)
	{
	    var distance = geolib.getDistance({latitude: req.params.lat1, longitude: req.params.lng1 }, {latitude: req.params.lat2, longitude: req.params.lng2});
	    res.send('Distance from ' + req.params.lat1 + ',' + req.params.lng1 + ' to ' + req.params.lat2 + ',' + req.params.lng2 + ' is ' + distance + ' km');
	});

//FIND NEAREST PARKING GARAGE
	app.get('/nearest/:lat1/:lon1',function(req,res)
	{
		var spots =
		{
		    "Hopkins": {latitude: 32.883985, longitude: -117.239276},
		    "Gilman": {latitude: 32.877710, longitude: -117.233664},
		    "Pangea": {latitude: 32.884272, longitude: -117.242982},
		};
	    var nearest = geolib.findNearest({latitude: req.params.lat1, longitude: req.params.lon1 },spots,0,0);
	    res.send(nearest);
	});
//================================================================================================================================================================================================
app.get('/realtime', function(req, res)
{
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket)
{
  socket.on('realtime', function(msg)
  {
    io.emit('realtime', msg);
  });
});
//================================================================================================================================================================================================
//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.listen(app.get('port'), 
	function()
	{
	console.log('Express server listening on port ' + app.get('port'));
});