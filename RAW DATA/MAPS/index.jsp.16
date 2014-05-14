
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
<title>UC San Diego :: MapLink</title>
<link rel="stylesheet" href="//www.ucsd.edu/common/cwp/active-cherry/base-min.css" />
<script src="//www.ucsd.edu/common/cwp/active-cherry/base-min.js"></script>
<script src="//www.ucsd.edu/common/_emergency-broadcast/message.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="webapp.name" content="Maplink" />
<meta name="webapp.url" content="/maps" />
<meta name="feedback.url" content="/cwp/feedback/maps/maplink" />
<meta name="display.search" content="none" />

<script>
<!-- redirect if user is on a smaller screen"; only on load -->

if (document.documentElement.clientWidth < 965) {
	// redirect if "traffic=1" is NOT passed
	if (document.URL.indexOf("ovrrdr=1") === -1 && document.URL.indexOf("traffic=1") === -1) {
		window.location="http://m.ucsd.edu/maps/";
	}
}

</script>

<link href="https://uxt.ucsd.edu/common/jquery-ui/1.8.6/jquery-ui-1.8.6.custom.min.css" media="all" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="prettyPhoto.css" />
<link type="text/css" rel="stylesheet" href="maplink.css" />

<style>
.concertina ul { padding: 0 0 0 1em; }
.concertina li { list-style-type: none; margin: 0; padding: 5px 0px; }
.concertina button { display: block; text-align: left; width: 99%; border: none; cursor: pointer; }
.concertina-reeds li { margin: 0 0.5em; }
.concertina-reeds li button { color: #016691; display: block; text-align-left; width: 99%; border: none; background: transparent; cursor: pointer; } 	
.concertina-hidden { display: none; visibility: hidden; cursor: pointer; }

.modaloverlay { width: 99%; height: 0%; z-index: 31337; overflow-y: auto; border: 1px solid; }
.closebutton { margin: 5px; float: right; }

#leftbar_footer { width: 100%; }
#tabs { overflow-y: auto; height: 90%; position: relative; }
#maplink { height: 100%; }
body #tdr_title_content { max-width: 98%; }


@media screen and (max-width: 980px) {

	.leftbar {
		width: 96%;
		height: 95%;
		float: left;
	}
	
	#leftbar_wrapper {
		width: 38%;
	}
	
	#map_container {
		width: 57%;
		height: 95%;
	}
	
	.leftbutton {
		width: 100%;
	}
	
	.rightbutton {
		float: inherit;
		clear: left;
	}
	
	#map_controls {
		margin-left: 4px;
	}
	
}

.button {
	*padding-left: 0;
	*padding-right: 0;
}

</style>



</head>
<body  >
	




<!-- env -->

<!-- emergency -->
<div id="uc-emergency"></div>
<!-- skip to content -->
<a class="skip-link" href="#tdr_content">Skip to content</a>
<!-- login -->

<div id="tdr_login" style="display: none"></div>
<script type="text/javascript">
(function($) {
    $(document).ready(function() {
        $.ajax({
            url: "https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?",
            dataType: 'jsonp',
            jsonpCallback: 'a4sso',
            success: function(data) {
                if (data.eduUcsdActLoggedin) {
                    var url = "<div id=\"tdr_login_content\">You are logged in | <a href=\"/security/logout?url=";
                    url += "http://www.ucsd.edu";
                    url += "\">Log Out</a></div>";
                    $("#tdr_login").empty();
                    $("#tdr_login").append(url);
                    $("#tdr_login").attr("style", "display:block");
                }
            },
            error: function(jqXHR, textStatus) {
                console.log("error trying to communicate with a4 sso: " + textStatus);
            }
        });
    });
})(jQuery);
</script>

	<!-- title -->
	<div id="tdr_title">
		<div id="tdr_title_content">
			<a id="tdr_title_ucsd_title" href="http://www.ucsd.edu">UC San Diego</a>
			<div id="tdr_title_page_title">
				<a href="/maps">Maplink </a>
			</div>
			<a id="tdr_title_search_link" class="search-button" style="display: none">Search</a>
            <a id="tdr_title_menu_link">Menu</a>
		</div>
	</div>
<div id="tdr_nav" style="display: ">
	<div id="tdr_nav_content">
		<ul id="tdr_nav_list">
			
		</ul>
	</div>
</div>
<div id="tdr_search" style="display: none">
	<div id="tdr_search_content">
		<form action="http://act.ucsd.edu/cwp/tools/search-redir" method="get">
			<label for="search-scope">Search</label> <select id="search-scope" name="search-scope">
				<option value="default_collection">All UCSD Sites</option>
				<option value="faculty-staff">Faculty/Staff Directory</option>
			</select> <label for="search-term" id="search-term-label">Search Term</label> <input type="search" id="search-term" name="search-term" size="20" /> <input type="submit" class="search-button" value="Search" />
		</form>
	</div>
</div>
<div id="tdr_crumbs" style="display: ">
	<div id="tdr_crumbs_content">
		<ul>
			
		</ul>
	</div>
</div>
<div id="fw_content" class="tdr_fonts itag_webapp">
	

<div id="maplink" style="">

	<div id="leftbar_wrapper" style="">
		<div id="leftbar" class="leftbar">
			<ul id="tabnav">
				<li><a id="placesTab" href="#tab1">Places</a></li>
				<li><a id="savedTab" href="#tab2">Marked</a></li>
				<!-- 
				<li><a id="transitTab" href="#tab3">Shuttles</a></li>
				 -->
			</ul>
			<div id="tabs" style="">
				<div id="tab1">
				
					<div id="leftbar_main">
					
						<div id="searchform" style="clear: both;">
							<h4>Search</h4>
							<p id="searchboxwrapper">
								<input type="text" id="map_search" name="map_search" title="Search locations" style="width: 163px;" />
								<button type="button" tabindex="0" id="searchboxclear" title="Clear search" title="Clear search" />
							</p>
							<button id="gosearch" class="button primary">Go</button>
							<br/><select id="regions" style="margin: 5px auto;"></select>
						</div>
							
						<div id="leftbar_results" style="clear: both;" class="linkstyled">
						</div>
				
						<div style="clear: both;">
							<h4 id="catlabel">Browse by Category</h4>
							
							<ul class="concertina" id="browse">
							</ul>
							
						</div>
					</div>
						
						
				
				</div>
				<div id="tab2">
					<div id="pin_panel_container" style="float: left; clear: left;">
						<ul id="pin_panel" class="linkstyled" title="List of saved locations"></ul>
					</div>
				</div>
				<!-- 
				<div id="tab3">
				</div>	
				 -->
			</div>
			
		</div>
	
		<div id="leftbar_overlay" class="modaloverlay" style="overflow-y: auto;">
			<div id="leftbar_overlay_content" style="margin: 5px 10px;"></div>
		</div>
	</div>
	
	<div id="clicker" style="">&laquo;</div>
	

	<div id="map_container" style="">
		<div id="map_controls" class="noprint" style="">
			<div class="leftbutton" style="">
				<input type="button" value="Traffic" id="trafficBtn" class="button" />
				<input type="button" value="Bike Routes" id="bikeBtn" class="button" />
				<input type="button" value="Link To Map" id="linkBtn" class="button" />
				<input type="button" value="Reset Map" id="panicBtn" class="button" />
			</div>
			<div style="" class="linkstyled rightbutton">
				<button id="printBtn" class="icon print" style="margin-right: 15px;">Printable</button>
				<button id="feedbackBtn" class="icon pencil" style="margin-right: 5px;">Comments</button>
			</div>
		</div>
		<div id="map_canvas" style="width: 100%; height: 99%;" tabindex="0">
		</div>
	</div>
	
	
</div>

<div id="dialog_details" tabindex="0">
</div>
<div id="dialog_access" tabindex="0">
</div>
<div id="dialog_misc" tabindex="0" style="display: none; min-width: 250px;">
<label for="mapUrl">Paste link in email or IM:</label>
<input type="text" id="mapUrl" size="40" value="" />
<button id="mapPreview" class="button">Preview map</button>&nbsp;<button id="mapClip" class="button">Copy to clipboard</button>
</div>

<div style="width: 100%; text-align: center; margin-top: 20px; font-size: 9px;">Copyright &copy; 2012 Regents of the University of California. <a href="http://www.ucsd.edu/_about/legal/index.html">Terms and conditions</a></div>


<script src="//uxt.ucsd.edu/common/jquery-ui/1.8.6/jquery-ui-1.8.6.custom.min.js" type="text/javascript"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?v=3.7&sensor=true&region=US&key=AIzaSyBasktLWuWer19i7JqKRbsFelS6E6euWJE">
</script>

<script type="text/javascript" src="jquery.cookie.js"></script>
<script type="text/javascript" src="jquery.prettyPhoto.js"></script>
<script type="text/javascript" src="jquery.pajinate.js"></script>
<script type="text/javascript" src="maplabel.js"></script>
<script type="text/javascript" src="markerclusterer.js"></script>
<script type="text/javascript" src="simpleiconoverlay.js"></script>
<!-- 
<script type="text/javascript" src="shuttlebus.js"></script>
 -->
<script type="text/javascript" src="concertina.js"></script>
<script type="text/javascript" src="maplink3.js"></script>


<!-- Put these here because they don't interact with anything in maplink3.js -->
<!-- Thus they logically belong here. So stick that in your best practices pipe and smoke it. -->




<script>

$("#clicker").click(function() {
	$("#maplink").toggleClass("hidebar");
	google.maps.event.trigger(map, "resize");
	if ($("#maplink").hasClass("hidebar")) {
		$("#clicker").html("&raquo;");
	} else {
		$("#clicker").html("&laquo;");
	}
});

if ($("#shuttles")) {
	$("#shuttles").change(function() {
		for (var i=0; i < busIcons.length; i++) {
			busIcons[i].setMap(null);
		}
		clearRoutes();
		window.clearInterval(busInterval);
		var val = $("#shuttles").val();
		if (val != "") {
			plotroutes(val);
			plotbus(true);
			busInterval = window.setInterval(plotbus, 30000);
		}
	});
}


leftbarTabs = $("#leftbar").tabs();
$("#leftbar_overlay").toggle(false);

// From someone on stackoverflow
$('#map_canvas').keyup(function(event) {
    var o = 128; // half a tile's width 
    switch(event.which) {
        case 37: // leftArrow
            map.panBy(-o,0);
            break;
        case 38: // upArrow
            map.panBy(0,-o);
            break;
        case 39: // rightArrow
            map.panBy(o,0);
            break;
        case 40: // downArrow
            map.panBy(0,o);
            break;
        case 109: // numpad -
        case 189: // -
            map.setZoom(map.getZoom()-1);
            break;
        case 107: // numpad +
        case 187: // =
            map.setZoom(map.getZoom()+1);
            break;
    }
});

</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-24480055-22']);
  _gaq.push(['_setDomainName', 'ucsd.edu']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>



</div>
<!-- footer -->
</body>
</html>