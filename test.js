var data = [
{ pattern_id: '3536',
    operation_id: '394465731590040018',
    title: 'Interzet',
    amount: 450,
    direction: 'out',
    datetime: '2012-07-01T13:50:15Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Интерзет\n \nРеквизиты платежа:\n \nCумма платежа: 450.00 RUB\nИдентификатор клиента: 334015\nНомер транзакции: 2000044871626\n \nЮр.лицо: ОАО "Петербургский социальный коммерческий банк"\nНомер договора: ЭК.294.2551\n' },
  { operation_id: '394465814332365012',
    title: 'Пополнение с банковской карты',
    amount: 450,
    direction: 'in',
    datetime: '2012-07-01T13:50:14Z',
    status: 'success',
    type: 'deposition',
    details: 'Пополнение с привязанной банковской карты для платежа в магазин, операция №394465731590040018' },
  { pattern_id: '928',
    operation_id: '394465382530070020',
    title: 'Теле2 (Россия): +7952 *** 3890',
    amount: 100,
    direction: 'out',
    datetime: '2012-07-01T13:43:35Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Tele2\n \nРеквизиты платежа:\n \nCумма платежа: 100.00 RUB\nТелефон: 9523803890\nНомер транзакции: 2000044871072\n' },
  { pattern_id: '1721',
    operation_id: '394402041155040005',
    title: 'ВКонтакте',
    amount: 100,
    direction: 'out',
    datetime: '2012-06-30T20:07:54Z',
    status: 'success',
    type: 'payment-shop',
    details: 'vkontakte.ru\n\nРеквизиты платежа:\n\nCумма платежа: 100 RUB\nИдентификатор клиента: 1600819057\n\nНомер транзакции: 2000044810350\n\nЮр.лицо: ООО "ВКонтакте"\nНомер договора: ЭК.11844.01\n' },
  { pattern_id: '928',
    operation_id: '394371613946070010',
    title: 'Натасла Теле2 (Россия): +7904 *** 4167',
    amount: 100,
    direction: 'out',
    datetime: '2012-06-30T11:40:40Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Tele2\n \nРеквизиты платежа:\n \nCумма платежа: 100.00 RUB\nТелефон: 9045184167\nНомер транзакции: 2000044763719\n' },
  { pattern_id: '2787',
    operation_id: '394189879563000007',
    title: 'Оплата Skype: c-basso',
    amount: 83.68,
    direction: 'out',
    datetime: '2012-06-28T09:11:45Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Номер транзакции: 2000044527385\nПополнение баланса в системе Skype\n \nЛогин в Skype: c-basso\n \nТовар: Skype Credit 2 евро\n' },
  { pattern_id: '1813',
    operation_id: '393593574069040003',
    title: '.masterhost',
    amount: 200,
    direction: 'out',
    datetime: '2012-06-21T11:33:11Z',
    status: 'success',
    type: 'payment-shop',
    details: '.masterhost\n\nРеквизиты платежа:\n\nCумма платежа: 200 RUB\nИдентификатор клиента: 255918\n\nНомер транзакции: 2000043785783\n\nЮр.лицо: ЗАО "МАСТЕРХОСТ"\nНомер договора: ЭК.10536.01\n' },
  { pattern_id: '928',
    operation_id: '393349547229040011',
    title: 'Натасла Теле2 (Россия): +7904 *** 4167',
    amount: 100,
    direction: 'out',
    datetime: '2012-06-18T15:45:58Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Tele2\n \nРеквизиты платежа:\n \nCумма платежа: 100.00 RUB\nТелефон: 9045184167\nНомер транзакции: 2000043459176\n',
    favourite: true },
  { pattern_id: '928',
    operation_id: '392846109026040009',
    title: 'Теле2 (Россия): +7952 *** 3890',
    amount: 29,
    direction: 'out',
    datetime: '2012-06-12T19:55:31Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Tele2\n \nРеквизиты платежа:\n \nCумма платежа: 29.00 RUB\nТелефон: 9523803890\nНомер транзакции: 2000042822706\n' },
  { pattern_id: '1721',
    operation_id: '392749388911040018',
    title: 'ВКонтакте',
    amount: 21,
    direction: 'out',
    datetime: '2012-06-11T17:03:18Z',
    status: 'success',
    type: 'payment-shop',
    details: 'vkontakte.ru\n\nРеквизиты платежа:\n\nCумма платежа: 21.00 RUB\nИдентификатор клиента: 150667775\n\nНомер транзакции: 2000042715486\n\nЮр.лицо: ООО "ВКонтакте"\nНомер договора: ЭК.11844.01\n' },
  { pattern_id: '3536',
    operation_id: '392111218387070012',
    title: 'Interzet',
    amount: 50,
    direction: 'out',
    datetime: '2012-06-04T07:47:07Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Интерзет\n \nРеквизиты платежа:\n \nCумма платежа: 50.00 RUB\nИдентификатор клиента: 334015\nНомер транзакции: 2000041852290\n \nЮр.лицо: ОАО "Петербургский социальный коммерческий банк"\nНомер договора: ЭК.294.2551\n' },
  { operation_id: '392057979074058008',
    title: 'Евросеть, пополнение',
    amount: 1000,
    direction: 'in',
    datetime: '2012-06-03T16:59:39Z',
    status: 'success',
    type: 'deposition',
    details: 'Евросеть, пополнение счета в Яндекс.Деньгах, платеж №1705356022' },
{   pattern_id: "6686",
    operation_id: "511026697550110003",
    title: "Перевод на карту",
    amount: 530,
    direction: "out",
    datetime: "2016-03-11T15:51:44Z",
    status: "success",
    type: "payment-shop",
    details: ""
    },
    {
      pattern_id: "p2p",
      operation_id: "510832207351050010",
      title: "Перевод для belevitin2009@yandex.ru",
      amount: 1.01,
      direction: "out",
      datetime: "2016-03-09T09:50:16Z",
      status: "success",
      type: "outgoing-transfer",
      message: "",
      details: "",
      recipient: "belevitin2009@yandex.ru",
      recipient_type: "email",
      amount_due: 1,
      fee: 0.01,
      comment: "Перевод от пользователя Яндекс.Денег",
      codepro: false
    },
    {
      pattern_id: "p2p",
      operation_id: "510612000612010010",
      title: "Перевод до востребования на +7 921 ***0059",
      amount: 10.3,
      direction: "out",
      datetime: "2016-03-06T20:40:00Z",
      status: "in_progress",
      type: "outgoing-transfer",
      message: "Отправлено с помощью @TeleYamBot",
      details: "Отправлено с помощью @TeleYamBot",
      recipient: "79219610059",
      recipient_type: "phone",
      amount_due: 10,
      fee: 0.3,
      comment: "",
      codepro: false,
      expires: "2016-03-13T20:40:00Z"
    },
    {
      pattern_id: "p2p",
      operation_id: "510611243494110018",
      title: "Перевод до востребования на +7 921 ***9226",
      amount: 10.3,
      direction: "out",
      datetime: "2016-03-06T20:27:23Z",
      status: "in_progress",
      type: "outgoing-transfer",
      message: "Отправлено с помощью @TeleYamBot",
      details: "Отправлено с помощью @TeleYamBot",
      recipient: "79219129226",
      recipient_type: "phone",
      amount_due: 10,
      fee: 0.3,
      comment: "",
      codepro: false,
      expires: "2016-03-13T20:27:23Z"
    },
    {
      pattern_id: "p2p",
      operation_id: "510584014320110004",
      title: "Перевод до востребования на movshin@gmail.com",
      amount: 10.3,
      direction: "out",
      datetime: "2016-03-06T12:53:34Z",
      status: "in_progress",
      type: "outgoing-transfer",
      message: "Отправлено с помощью @TeleYamBot",
      details: "Отправлено с помощью @TeleYamBot",
      recipient: "movshin@gmail.com",
      recipient_type: "email",
      amount_due: 10,
      fee: 0.3,
      comment: "",
      codepro: false,
      expires: "2016-03-13T12:53:34Z"
    },
    {
      pattern_id: "p2p",
      operation_id: "509137294844110016",
      title: "Перевод для belevitin2009@yandex.ru",
      amount: 10.05,
      direction: "out",
      datetime: "2016-02-18T19:01:35Z",
      status: "success",
      type: "outgoing-transfer",
      message: "Отправлено с помощью @TeleYamBot",
      details: "Отправлено с помощью @TeleYamBot",
      recipient: "belevitin2009@yandex.ru",
      recipient_type: "email",
      amount_due: 10,
      fee: 0.05,
      comment: "",
      codepro: false
    },
  { pattern_id: '3536',
    operation_id: '391777635161010012',
    title: 'Interzet',
    amount: 400,
    direction: 'out',
    datetime: '2012-05-31T11:07:26Z',
    status: 'success',
    type: 'payment-shop',
    details: 'Интерзет\n \nРеквизиты платежа:\n \nCумма платежа: 400.00 RUB\nИдентификатор клиента: 334015\nНомер транзакции: 2000041441861\n \nЮр.лицо: ОАО "Петербургский социальный коммерческий банк"\nНомер договора: ЭК.294.2551\n' }
];

var Stat = require('./lib/stat');
var stat = new Stat(data);

// stat.getMonthBar(stat.byMonth(data));

console.log(stat.getMonthPie(stat.byMonth(data)));