'use strict';

var Store = require('./lib/db');
var store = new Store();

// store.createTable('users');

// store.insert({
// 	table: 'users',
// 	data: {
// 		id: 1,
// 		name: 'hodor'
// 	}
// });

// store.find({
// 	table: 'users',
// 	data: {name: 'hodor'},
// 	callback: function (result) {
// 		console.log(result);
// 	}
// });
