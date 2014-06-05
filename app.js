//=========================================================================================	UI/SOCKETS
	var express = require('express');
	var app = express();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var path = require('path');
	var handlebars = require('express3-handlebars');
	var dotenv = require('dotenv');
	dotenv.load();

//=========================================================================================	TEXT NOTIFICATIONS
	var schedule = require('node-schedule');
	var client= require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_SECRET);
	var geolib = require('geolib');

//=========================================================================================	APP ENGINE
	app.engine('handlebars', handlebars());
	app.set('view engine', 'handlebars');
	app.set('views', __dirname + '/views');
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.bodyParser());

//=========================================================================================	MYSQL
	var mysql = require('mysql');
	var db = mysql.createConnection(
	{
	  host     : process.env.SQLHOST,
	  user     : process.env.SQLUSER,
	  password : process.env.SQLPASS,
	  database : process.env.SQLDB
	});
	db.connect();

//=========================================================================================	ROUTES
	var error = require('./routes/error');
	var map = require('./routes/map');
	app.get('/', map.view);
	app.get('/error', error.view);

//================================================================================================================================================================================================
// INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY	INVENTORY
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
// OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY	OCCUPANCY
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
// PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION	PROJECTION
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
	    		tempJSON.LOT = req.params.lot ;
	    		tempJSON.TYPE = req.params.permit;
	    		tempJSON.SUM = mysum;
	    		var avg;
	    		if (isNaN((mysum/rows.length).toFixed(0)))
	    		{
	    			avg = 0;
	    		}
	    		else
	    		{
	    			avg = (mysum/rows.length).toFixed(0);
	    		}
	    		tempJSON.AVG = avg;
	    		tempJSON.ROWS = rows.length;
	    		tempJSON.TIME = 'TIME'+req.params.time;
	    		returnJSON.push(tempJSON);
			res.json(returnJSON);
		});
	});

	app.get('/geo', function(req,res)
	{
		db.query('SELECT * FROM GEO',function(err,rows,fields)
		{
			if(err)throw err;
			var mysum= 0;
			var returnJSON = [];
				function makeJSON(i)
				{ 
	  				if (i < rows.length)
	  				{
	  					var tempJSON = {};
	  					tempJSON.LOT = rows[i].LOT ;
	  					tempJSON.LAT = rows[i].LAT;
	  					tempJSON.LON = rows[i].LON;
	  					returnJSON.push(tempJSON);
	    				makeJSON(i+1);
	   				}
				}
			makeJSON(0);
			res.json(returnJSON);
		});
	});


//================================================================================================================================================================================================
//GEO	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	GEO 	
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
//REALTIME 	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME	REALTIME 		
//================================================================================================================================================================================================
app.get('/realtime', function(req, res)
{
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket)
{
  socket.on('realtime', function(msg)
  {
    socket.broadcast.emit('realtime', msg);
    console.log(msg);
  });
});



//================================================================================================================================================================================================
//TEXT MESSAGE		TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE	TEXT MESSAGE
//================================================================================================================================================================================================
app.post('/registernotification', function(req, res)
{
	var date = new Date();
    var future =  new Date(date.getFullYear(), date.getMonth(), date.getDate(), req.body.hour,req.body.min ,0,0);
	if(req.body.num.length != 12 )
	{
		res.json({ status: "bad phone" });
	}
	if(req.body.message.length <= 0 )
	{
		res.json({ status: "bad message" });
	}
	if(req.body.hour > 24 || req.body.hour < 0)
	{
		res.json({ status: "bad hours" });
	}
	if(req.body.min > 60 || req.body.min < 0)
	{
		res.json({ status: "bad minutes" });
	}
	var statusToSend = "empty";
    var job = schedule.scheduleJob(future,function()
    {
			client.sendMessage
			({
		    	to:req.body.num,
		    	from: '+15672085000',
		    	body: req.body.message
			}, 
			function(err, responseData)
			{
		    if (!err)
		    {
		        statusToSend = "success";
		    }
	    	else
	    	{
	    		statusToSend = "error";
	    	}
    	})
	});
	res.json({ status: "scheduled" });
});
//================================================================================================================================================================================================
//LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER	LAUNCHER
////================================================================================================================================================================================================
//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.listen(app.get('port'), 
	function()
	{
	console.log('Express server listening on port ' + app.get('port'));
});