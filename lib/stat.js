'use strict';

var _ = require('lodash');
var bike = require('./bike');

var Stat = function (operations) {
	this.operations = operations;
};

Stat.prototype.byYear = function() {
	return _.groupBy(this.operations, function(item) {
		return item.datetime.substring(0,4);
	});
};

Stat.prototype.byMonth = function(operationsArray) {
	return _.groupBy(operationsArray, function(item) {
		return item.datetime.substring(0,7);
	});
};

Stat.prototype.getYearBar = function(groupedByYear) {

	var years = _.sortBy(_.keys(groupedByYear), function(num) { return num; });
	var year = _.head(years.reverse());

	var monthsGrouped = this.byMonth(groupedByYear[year]);
	var months = _.sortBy(_.keys(monthsGrouped), function(num) { return num; });

	var labels = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Девабрь'
	];

	var dataDef = {
		'01': 0,
		'02': 0,
		'03': 0,
		'04': 0,
		'05': 0,
		'06': 0,
		'07': 0,
		'08': 0,
		'09': 0,
		'10': 0,
		'11': 0,
		'12': 0
	};

	var dataInDiff = {};

	_.map(months, function (item) {
		var current = _.filter(monthsGrouped[item], function (item) {
			return item.direction === 'in';
		});

		var sum = 0;

		_.map(current, function (item) {
			sum += item.amount;
		});

		dataInDiff[item.substring(5,7)] = sum.toFixed(2);
	});

	var dataInMerged = _.merge(_.omit(dataDef, months), dataInDiff);
	var dataInKeys = _.sortBy(_.keys(dataInMerged), function(num) { return num; });

	var dataIn = _.map(dataInKeys, function (item) {
		return dataInMerged[item];
	});

	var dataOutDiff = {};

	_.map(months, function (item) {
		var current = _.filter(monthsGrouped[item], function (item) {
			return item.direction === 'out';
		});

		var sum = 0;

		_.map(current, function (item) {
			sum += item.amount;
		});

		dataOutDiff[item.substring(5,7)] = sum.toFixed(2);
	});

	var dataOutMerged = _.merge(_.omit(dataDef, months), dataOutDiff);
	var dataOutKeys = _.sortBy(_.keys(dataOutMerged), function(num) { return num; });

	var dataOut = _.map(dataOutKeys, function (item) {
		return dataOutMerged[item];
	});

	var data = {
		labels : labels,
		datasets : [
			{
				fillColor : "rgba(51, 51, 255,0.5)",
				strokeColor : "rgba(51, 51, 255,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : dataIn
			},
			{
				fillColor : "rgba(255, 102, 0,0.5)",
				strokeColor : "rgba(255, 102, 0,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : dataOut
			}
		]
	};

	return {
		data: data,
		in: _.sum(_.map(dataIn, function (item) {return parseFloat(item);})).toFixed(2),
		out: _.sum(_.map(dataOut, function (item) {return parseFloat(item);})).toFixed(2),
		year: year
	};
};


Stat.prototype.getMonthBar = function(groupedByMonth) {

	var months = _.sortBy(_.keys(groupedByMonth), function(num) { return num; });
	var month = _.head(months.reverse());

	var days = groupedByMonth[month];

	var groupedByDays = _.groupBy(days, function(item) {
		return item.datetime.substring(8, 10);
	});


	var dataDef = {};
	var labels = [];

	_.map(_.range(31), function (i) {
		var index = i + 1;
		index = index < 10 ? '0' + index : '' + index;
		dataDef[index] = 0;
		labels.push(index);
	});


	var daysKeys = _.sortBy(_.keys(groupedByDays), function(num) { return num; });

	var dataInDiff = {};

	_.map(daysKeys, function (item) {
		var current = _.filter(groupedByDays[item], function (item) {
			return item.direction === 'in';
		});

		var sum = 0;

		_.map(current, function (item) {
			sum += item.amount;
		});

		dataInDiff[item] = sum.toFixed(2);
	});

	var dataInMerged = _.merge(_.omit(dataDef, daysKeys), dataInDiff);
	var dataInKeys = _.sortBy(_.keys(dataInMerged), function(num) { return num; });

	var dataIn = _.map(dataInKeys, function (item) {
		return dataInMerged[item];
	});


	var dataOutDiff = {};
	_.map(daysKeys, function (item) {
		var current = _.filter(groupedByDays[item], function (item) {
			return item.direction === 'out';
		});

		var sum = 0;

		_.map(current, function (item) {
			sum += item.amount;
		});

		dataOutDiff[item] = sum.toFixed(2);
	});

	var dataOutMerged = _.merge(_.omit(dataDef, daysKeys), dataOutDiff);
	var dataOutKeys = _.sortBy(_.keys(dataOutMerged), function(num) { return num; });

	var dataOut = _.map(dataOutKeys, function (item) {
		return dataOutMerged[item];
	});

	var data = {
		labels : labels,
		datasets : [
			{
				fillColor : "rgba(51, 51, 255,0.5)",
				strokeColor : "rgba(51, 51, 255,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : dataIn
			},
			{
				fillColor : "rgba(255, 102, 0,0.5)",
				strokeColor : "rgba(255, 102, 0,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : dataOut
			}
		]
	};

	return {
		data: data,
		in: _.sum(_.map(dataIn, function (item) {return parseFloat(item);})).toFixed(2),
		out: _.sum(_.map(dataOut, function (item) {return parseFloat(item);})).toFixed(2),
		month: month
	};
};






Stat.prototype.getYearPie = function (groupedByYear) {
	var years = _.sortBy(_.keys(groupedByYear), function(num) { return num; });
	var year = _.head(years.reverse());
	var data = groupedByYear[year];

	var onlyOut = _.filter(data, function (item) {
		return item.direction === 'out';
	});

	var cats = bike;
	var values = {};
	var catp2p = _.filter(onlyOut, function (item) {
		return item.pattern_id === 'p2p';
	});

	values['1'] = _.sumBy(catp2p, 'amount');

	onlyOut = _.filter(onlyOut, function (item) {
		return item.pattern_id != 'p2p';
	});

	// Темная сторона силы
	_.map(onlyOut, function (item) {
		if (!_.isUndefined(item.pattern_id)) {

			var pcats = _.filter(cats, function (catItem) {
				return _.includes(catItem.csids, parseInt(item.pattern_id));
			});

			var cat = _.head(pcats);

			if (cat) {
				var key = cat.id + '';
				if (!values[key]) {
					values[key] = 0;
				}
				values[key] = values[key] += item.amount;
			} else {
				if(!values['0']) {
					values['0'] = 0;
				}
				values['0'] = values['0'] += item.amount;
			}
		} else {
			if(!values['0']) {
				values['0'] = 0;
			}
			values['0'] = values['0'] += item.amount;
		}
	});

	var result = [];

	_.map(cats, function (item) {
		var val = !_.isUndefined(values[item.id + '']) ? values[item.id + ''] : 0;


		result.push({
			value: val,
			color: item.color,
			text: item.text.replace('%s', val.toFixed(2) )
		});
	});

	return result;
};


Stat.prototype.getMonthPie = function (groupedByMonth) {
	var months = _.sortBy(_.keys(groupedByMonth), function(num) { return num; });
	var month = _.head(months.reverse());
	var data = groupedByMonth[month];

	var onlyOut = _.filter(data, function (item) {
		return item.direction === 'out';
	});

	var cats = bike;
	var values = {};
	var catp2p = _.filter(onlyOut, function (item) {
		return item.pattern_id === 'p2p';
	});

	values['1'] = _.sumBy(catp2p, 'amount');

	onlyOut = _.filter(onlyOut, function (item) {
		return item.pattern_id != 'p2p';
	});


	// Темная сторона силы
	_.map(onlyOut, function (item) {
		if (!_.isUndefined(item.pattern_id)) {

			var pcats = _.filter(cats, function (catItem) {
				return _.includes(catItem.csids, parseInt(item.pattern_id));
			});

			var cat = _.head(pcats);

			if (cat) {
				var key = cat.id + '';
				if (!values[key]) {
					values[key] = 0;
				}
				values[key] = values[key] += item.amount;
			} else {
				if(!values['0']) {
					values['0'] = 0;
				}
				values['0'] = values['0'] += item.amount;
			}
		} else {
			if(!values['0']) {
				values['0'] = 0;
			}
			values['0'] = values['0'] += item.amount;
		}
	});

	var result = [];

	_.map(cats, function (item) {
		var val = !_.isUndefined(values[item.id + '']) ? values[item.id + ''] : 0;

		result.push({
			value: val,
			color: item.color,
			text: item.text.replace('%s', val.toFixed(2) )
		});
	});

	return result;
};



















module.exports = Stat;