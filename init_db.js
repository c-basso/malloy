'use strict';

var Store = require('./lib/db');
var store = new Store();

store.createTable('users');

// store.insert({
// 	table: 'users',
// 	data: {
// 		uid: 58373175,
// 		token: ''
// 	}
// });


// store.update({
// 	table: 'users',
// 	data: {
// 		uid: 58373175,
// 		token: 'hodor'
// 	}
// });

// store.find({
// 	table: 'users',
// 	data: {uid: 58373175},
// 	callback: function (result) {
// 		console.log(result);
// 	}
// });


