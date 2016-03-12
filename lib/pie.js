'use strict';

var Canvas = require('canvas');
var Chart = require('nchart');
var fs = require('fs');


module.exports = function (userId, type, data, callback) {

		var canvas = new Canvas(900, 900)
		var ctx = canvas.getContext('2d')

		new Chart(ctx).Pie(data, {
			scaleShowValues: true,
			scaleFontSize: 24
		});

		canvas.toBuffer(function (err, buf) {
			if (err) throw err;

			var fname = __dirname + '/attach/' + userId + '_'+ type + '_pie.png';

			fs.writeFile(fname, buf, function () {
				callback(fname);
			});
		});
};
