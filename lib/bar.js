var Canvas = require('canvas');
var Chart = require('nchart');
var fs = require('fs');


module.exports = function (userId, type, data, callback) {

	var canvas = new Canvas(1024, 768);
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	new Chart(ctx).Bar(data);

	canvas.toBuffer(function (err, buf) {
		if (err) throw err;

		var fname = __dirname + '/attach/' + userId + '_'+ type + '_bar.png';

		fs.writeFile(fname, buf, function () {
			callback(fname);
		});
	});
};
