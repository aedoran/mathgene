var fs = require('fs');
var util = require('util');
var geocoder = require('geocoder');

var DATA = {
	name : "tree",
	children : []
};

var HASH = {};
var count = 0;
var INSERTED = {};

for (var a=0; a<=300;a++) {

	var data = fs.readFileSync('/tmp/mathgene'+a,'ascii');
	var p = JSON.parse(data);
	//console.log(p);
	for (var b=0; b<p.length; b++) {
		if (!HASH[p[b].school]) { count++ }
		HASH[p[b].school] = {}
	}

}


var done = function() {
	if (geocoded == count) {
		console.log(HASH);
		fs.writeFile(__dirname +'/schoolcode.json',JSON.stringify(HASH), function(err) {
				if (err) { console.log(err); }
		});
	}
}

var geocoded = 0;
var timecount = 0;
for (var a in HASH) {
	if (a) {
			timecount++;
			(function(t) {
				setTimeout(function() {

					geocoder.geocode(t, function(err,data) {
						if (err) {
							console.log("ERR",err);
						} else {


							console.log(t,data.status);
							if (data.status == "OK") {
								HASH[t] = data.results[0].geometry.location;
							}

						}
						geocoded++;
						console.log(count,geocoded);
						done();
					});

				},timecount * 1000);
			})(a);
	} else {
		geocoded++;
	}

}
