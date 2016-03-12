'use strict';

var FILE = 'db.json';
var loki = require('lokijs');
var db = new loki(FILE);

function Store(){
	this.db = db;
}

Store.prototype.createTable = function(table) {
	this.db.addCollection(table);
	this.db.saveDatabase();
};

Store.prototype.insert = function(options) {
	var table = options.table;
	var data = options.data;

	var _this = this;

	this.db.loadDatabase(FILE, function () {
		var collection = _this.db.getCollection(table);
		collection.insert(data);
		_this.db.saveDatabase();
	});

};

Store.prototype.update = function(options) {
	var table = options.table;
	var data = options.data;
	var _this = this;

	this.db.loadDatabase(FILE, function () {
		var collection = _this.db.getCollection(table);
		collection.update(data);
		_this.db.saveDatabase();
	});
};

Store.prototype.find = function(options) {
	var table = options.table;
	var data = options.data;
	var callback = options.callback;

	var _this = this;

	this.db.loadDatabase(FILE, function () {
		var collection = _this.db.getCollection(table);
		var result = collection.find(data);
		callback(result);
	});
};


module.exports = Store;