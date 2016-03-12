'use strict';

var ym = require("yandex-money-sdk");
var Store = require('./db');
var store = new Store();


module.exports = function (result, callback) {

	var options = {
		start_record: 0,
		records: 100,
		details: true
	};

	var api = new ym.Wallet(result[0].token);

	var all = [];

	function opHisComplete(err, data) {
		if(err) {
			callback(err, all);
		}

		all = all.concat(data.operations);

		if (data.next_record) {
			options.start_record = data.next_record;
			api.operationHistory(options, opHisComplete);
		} else {
			callback(undefined, all);
		}

	}

	api.operationHistory(options, opHisComplete);

};