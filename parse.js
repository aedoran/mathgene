var fs = require('fs');
var util = require('util');

var DATA = {
	name : "tree",
	children : []
};

var HASH = {};

var INSERTED = {};

for (var a=0; a<=355;a++) {

	var data = fs.readFileSync(__dirname + '/data/mathgene'+a,'ascii');
	var p = JSON.parse(data);
	//console.log(p);
	for (var b=0; b<p.length; b++) {
		HASH[p[b].id] = p[b];
	}

}


var buildDesc = function(p,level) {
	if (p && p.name) {
		var obj = {'children':[]};
		obj['name'] = p.name;
		obj['school'] = p.school;
		obj['dissertation'] = p.dissertation;
		obj['year'] = p.year;

		if (p.descendents && p.descendents.length && level > 0) {

			for (var a=0;a<p.descendents.length;a++) {
				if (HASH[p.descendents[a].id]) {
					var c = buildDesc(HASH[p.descendents[a].id],level-1);
					if (c) {
						obj.children.push(c);
					}
					//obj.children.push(buildDesc(HASH[p.descendents[a].id]));
				}
			}
		}
		INSERTED[a] = {};
		return obj;
	}
}


module.exports = {
	get : function(id,depth) {
		DATA.children = [];
		DATA = buildDesc(HASH[id],depth);
		return DATA;
	}
}


