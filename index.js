'use strict';

var _ = require('lodash');
var ym = require('yandex-money-sdk');
var env = require('node-env-file');
var TelegramBot = require('node-telegram-bot-api');
var Store = require('./lib/db');
var Stat = require('./lib/stat');
var history = require('./lib/history');
var bar = require('./lib/bar');
var pie = require('./lib/pie');

env(__dirname + '/.env');

var TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
var PULLING_INTERVAL = process.env.PULLING_INTERVAL;
var YM_CLIENT_ID = process.env.YM_CLIENT_ID;
var YM_REDIRECT_URI = process.env.YM_REDIRECT_URI;
var YM_CLIENT_SECRET = process.env.YM_CLIENT_SECRET;
var SCOPE = ['account-info', 'operation-history', 'operation-details'];


var store = new Store();
var bot = new TelegramBot(TELEGRAM_TOKEN, {polling: {interval: PULLING_INTERVAL}});


function getKeyboard () {
	return {
		reply_markup: JSON.stringify({
			keyboard: [
				['🌓 категории расходов', '📊 доходы+расходы'],
				['❔ помощь']
			],
			resize_keyboard: true
		})
	};
};


function checkAuth(userId, callback){

	function findCallback(result){
		if (_.isEmpty(result) || _.isEmpty(result[0].token)) {

			if (_.isEmpty(result)) {
				store.insert({
					table: 'users',
					data: {
						uid: parseInt(userId),
						token: ''
					}
				});
			}

			var redirectUri = [YM_REDIRECT_URI, 'uid=' + userId].join('?');
			var url = ym.Wallet.buildObtainTokenUrl(YM_CLIENT_ID, redirectUri, SCOPE);

			var message = [
				'Привет!',
				'Меня зовут Маршал Ериксон и я помогу тебе присмотреть за тратами.',
				'Друзья меня знают, как гуру графиков [https://youtu.be/f_J8QU1m0Ng](https://youtu.be/f_J8QU1m0Ng)',
				'Чтобы начать мне нужно чтобы ты [разрешил мне посмотреть](' + url + ') историю твоих операций в Яндекс.Деньгах'
			];

			bot.sendMessage(userId, message.join('\n'), {parse_mode: 'Markdown'});

		} else {
			callback(result);
		}
	}

	store.find({
		table: 'users',
		data: {uid: userId},
		callback: findCallback
	});
}


function inout (msg) {
	var userId = msg.from.id;

	checkAuth(userId, function (user) {
		history(user, function (err, operations) {

			bot.sendMessage(userId, 'Сейчас я пришлю тебе два графика: за этот год и за этот месяц');

			var stat = new Stat(operations);

			var data = stat.getYearBar(stat.byYear());

			bar(userId, 'year', data.data, function (fname) {
				bot.sendPhoto(userId, fname, {
					caption: 'Синим я отметил твои доходы, а оранжевым расходы. '
							+ '\nЗа ' + data.year + ' год у тебя получилось:\n' + data.in
							+ ' рублей доходов \n' + data.out + ' рублей расходов'
				});

				data = stat.getMonthBar(stat.byMonth(operations));

				bar(userId, 'month', data.data, function (fname) {
					bot.sendPhoto(userId, fname, {
						caption: 'Синим я отметил твои доходы, а оранжевым расходы. '
							+ '\nЗа месяц ' + data.month + ' у тебя получилось:\n' + data.in
							+ ' рублей доходов \n' + data.out + ' рублей расходов'
					});
				});

			});

		});
	});
};

function typepie (msg) {
	var userId = msg.from.id;

	checkAuth(userId, function (user) {
		history(user, function (err, operations) {

			bot.sendMessage(userId, 'Сейчас я пришлю тебе два графика: за этот год и за этот месяц');

			var stat = new Stat(operations);

			var data = stat.getYearPie(stat.byYear());

			pie(userId, 'year', data, function (fname) {

				var notZero = _.filter(data, function (item) {
					return item.value > 0;
				});

				var texts = _.map(notZero, function (item) {
					return item.text;
				});

				texts.unshift('Это график за текущий год');

				bot.sendPhoto(userId, fname, {caption: texts.join('\n')});

				data = stat.getMonthPie(stat.byMonth(operations));

				pie(userId, 'month', data, function (fname) {

					notZero = _.filter(data, function (item) {
						return item.value > 0;
					});

					texts = _.map(notZero, function (item) {
						return item.text;
					});

					texts.unshift('Это график за текущий месяц');

					bot.sendPhoto(userId, fname, {caption: texts.join('\n')});
				});
			});

		});
	});
};


function help (msg) {
	var userId = msg.from.id;

	var cmds = [
		'Очень хороший вопрос!',
		'Я могу показать тебе то, как делятся твои траты по тому, на что ты тратишь.',
		'Пусть /typepie будет нашим кодовым словом для этого, но лучше используй кнопки',
		'',
		'Также я могу показать тебе как распределяются твои траты и доходы во времени.',
		'Для этого напиши мне /inuot, но лучше нажми кнопку',
		'',
		'А если ты напишешь /help я повторю этот рассказ снова и мне не надоест 😁'
	];

	var keyboard = getKeyboard(msg);

	bot.sendMessage(userId, cmds.join('\n'), keyboard);
}

function start (msg) {
	var userId = msg.from.id;
	checkAuth(userId, function (user) {
		var keyboard = getKeyboard(msg);
		bot.sendMessage(userId, 'https://youtu.be/f_J8QU1m0Ng', keyboard);
	});
};

bot.onText(/\/start/, start);

bot.onText(/\/help/, help);
bot.onText(/\/inout/, inout);
bot.onText(/\/typepie/, typepie);

bot.onText(/❔ помощь/, help);
bot.onText(/📊 доходы\+расход/, inout);
bot.onText(/🌓 категории расходов/, typepie);


bot.on('message', function (msg) {
	var userId = msg.from.id;
	var cmds = ['/help', '/start', '/inout', '/typepie'];
	var re = new RegExp(cmds.join("|"), "i");
	var re2 = new RegExp(['❔', '📊', '🌓'].join("|"));

	if (!msg.text.match(re) && !re2.test(msg.text)) {
		var keyboard = getKeyboard(msg);
		bot.sendMessage(userId, 'Щито? Я не пониль...', keyboard);
	}
});