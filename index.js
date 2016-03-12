'use strict';

var _ = require('lodash');
var env = require('node-env-file');
var TelegramBot = require('node-telegram-bot-api');

env(__dirname + '/.env');

var bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});


bot.on('message', function (msg) {
	var fromId = msg.from.id;
	bot.sendMessage(fromId, 'hodor');
});