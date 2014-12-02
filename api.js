/*! ICQ API - v - 2014-11-26
 */(function(mailru, $){
    $ = $ || {};
    /**
     * @global
     * @namespace
     * @alias mailru
     */
    var api = {},
        utils = {},
        callbacks = {},
        empty = function(){return false;},
        backButtonHandler = function(){return false;},
        defaultBackButtonHandler = function(){return false;},
        onPushCallback = function(){return false;},
        onPauseCallback = function(){return false;},
        onResumeCallback = function(){return false;},
        customBackButtonHandler = function(){return false;};

    function isValidParams(rules,params,errorCb) {
        function isPresent(param) {
            return param !== undefined && param !== null && param !== '' && !(typeof param == 'number' && isNaN(param));
        }

        function isUrl(url) {
            var parser = utils.parseURL(url);
            return parser.protocol;
        }

        if (arguments.length<3 && typeof params == 'function') {
            errorCb = params;
            params = undefined;
        }

        var rule, name, names, ruleList, param, i, l, n, valid = false;
        for (rule in rules) {
            if (!rules.hasOwnProperty(rule)) continue;
            names = rules[rule];
            ruleList = rule.split(',');
            if (!(names instanceof Array)) names = [names];
            for (n = 0; n < names.length; n++) {
                name = names[n];
                if (params) {
                    param = params[name];
                } else {
                    param = name;
                    name = 0;
                }
                for (i = 0; i < ruleList.length; i++) {
                    rule = ruleList[i];

                    if (rule !== 'required' && !isPresent(param)) {
                        continue;
                    }

                    switch(rule) {
                        case "string":
                            valid = typeof param === 'string';
                            break;

                        case "number":
                            valid = (typeof +param === 'number' && isNaN(+param) === false);
                            break;

                        case "required":
                            if (name.indexOf && ~name.indexOf('|')) {
                                param = name.split('|');
                                l = param.length;
                                while (l--) {
                                    if (valid = isPresent(params[param[l]])) {
                                        break;
                                    }
                                }
                            } else {
                                valid = isPresent(param);
                            }
                            break;

                        case "url":
                            valid = isUrl(param);
                            break;

                        case "function":
                            valid = typeof param === 'function';
                            break;
                    }
                    if (!valid) {
                        errorCb(rule,name,param);
                        return false;
                    }
                }
            }
        }

        return valid;
    }

    function prepareParams(params,cb,map,def,errorcb) {
        if (typeof def == 'function') {
            errorcb = def;
            def = undefined;
        }
        if (typeof params == 'function') {
            params = {callback: params};
        }
        params = params || {};
        params.callback = params.callback || cb;

        if (def) for (var i in def) {
            params[i] = params[i] || def[i];
        }

        if (!isValidParams(map,params,errorcb || error)) {
            return false;
        }
        return params;
    }

    function prepareFunc(map,method,def,prepare) {
        if (typeof def == 'function') {
            prepare = def;
            def = undefined;
        }
        if (typeof method == 'function') {
            prepare = method;
            method = undefined;
        }
        return function(params,cb){
            if (params = prepareParams(params,cb,map,def)) {
                prepare && prepare(params);
                method && api.invoke(method, {
                    params: params,
                    cb: params.callback
                });
            } else {
                return false;
            }
        }
    }

    function addCallback(callback) {
        var cbid = utils.randomId();

        api.callbacks[cbid] = function(data) {
            delete api.callbacks[cbid];

            try {
                data = JSON.parse(data.replace(/\n/g,'\\n'));
            } catch(e) {

            }

            if (callback) {
                callback.call(window, data);
            }
        };

        return 'mailru.callbacks["' + cbid + '"]';
    }

    function error(rule,name,param) {
        var err;
        if (api.isDev) {
            if (arguments.length == 1) {
                err = typeof rule == 'string'? new Error(rule) : rule;
            } else {
                if (rule == 'required') {
                    err = new Error(isNaN(name)? 'Param '+name.replace(/\|/g,' or ')+' is required' : 'Missing required argument');
                } else {
                    err = new TypeError((isNaN(name)? 'Param '+name : 'Argument')+' must be a '+rule+', but is '+typeof(param));
                }
            }

            throw err;
        } else {
            return false;
        }
    }

    function saveCall(f,args,th) {
        try {
            return f.apply(th||this,args||[]);
        } catch (err) {
            error(err);
        }
    }

    utils.randomize = function() {
        return Math.floor(Math.random() * 10000);
    };
    utils.randomId = function() {
        return 'ID'+Math.random().toString(32).substring(2);
    };
    utils.parseURL = function(url) {
        var parser = document.createElement('a');
        parser.href = url;
        return parser;
    };
    utils.makeGet = function(obj) {
        if ('param' in $) {
            return $.param(obj);
        }

        var r = [];
        for (var k in obj) {
            if (!obj.hasOwnProperty(k)) continue;
            r[r.length] = k + '=' + encodeURIComponent(obj[k]);
        }
        return r.join('&');
    };

    if (mailru && mailru.invokeMessengerAPI) {
        window.oldMailru = mailru;

        api.invoke = function (methodName, data) {
            if (data && typeof data.cb == 'function')
                mailru.invokeMessengerAPI(methodName, JSON.stringify(data.params), addCallback(data.cb));
            else
                mailru.invokeMessengerAPI(methodName, JSON.stringify(data && data.params));
        };

        backButtonHandler = api.backButtonHandler = function() {
            var preventDefaultHandle = saveCall(customBackButtonHandler);
            if (!preventDefaultHandle) {
                mailru.backButtonHandler();
            }
            return preventDefaultHandle;
        };

        defaultBackButtonHandler = function() {
            mailru.backButtonHandler();
        }
    } else {
        api.invoke = function (methodName, data) {
            data = data || {};

            if (window.console) {
                window.console.log(methodName, data.params,addCallback(data.cb));
            }
            data.cb && data.cb({
                callbackTest: 'passed'
            });
        };
    }

    api.onPushData = function(d) {
        saveCall(onPushCallback,[d]);
    };

    api.onPause = api.onStop = function() {
        saveCall(onPauseCallback);
    };

    api.onResume = api.onStart = function() {
        saveCall(onResumeCallback);
    };

    api.utils = utils;
    api.callbacks = {};

    /**
     * @namespace
     */
    api.app = {};
    /**
     * @namespace
     */
    api.device = {};
    /**
     * @namespace
     */
    api.message = {};
    /**
     * @namespace
     */
    api.users = {};
    /**
     * @namespace
     */
    api.friends = {};
    /**
     * @namespace
     */
    api.photos = {};

    /**
     * Закрывает приложение и возвращает пользователя в предыдущий контекст (каталог приложений/сообщение)
     * @function close
     * @memberof mailru.app
     * @param {boolean} [force] - если передано значение true происходит форсированное закрытие приложение,
     * можно использовать в случае, если обычное закрытие по какой-то причине не работает.
     */
    api.app.close = function(force) {
        if (force) {
            api.invoke('app.close');
        } else {
            defaultBackButtonHandler();
        }
    };
    /**
     * Объект для работы с экранной клавиатурой
     * @namespace keyboard
     * @name keyboard
     * @memberof mailru.app
     */
    api.app.keyboard = {};
    /**
     * Скрывает экранную клавиатуру
     * @function hide
     * @memberof mailru.app.keyboard
     */
    api.app.keyboard.hide = function() {
        api.invoke('keyboard.hide');
    };
    /**
     * Показывает экранную клавиатуру
     * @function show
     * @memberof mailru.app.keyboard
     */
    api.app.keyboard.show = function() {
        api.invoke('keyboard.show');
    };

    /**
     * Устанавливает или сбрасывает обработчик нажатия кнопки Back
     * @function back
     * @memberof mailru.app
     * @param {function|boolean} handler -  функция, которая будет вызвана при нажатии кнопки Back
     * если handler возвращает true - стандартное поведение при клике на Back будет игнорироваться.
     * Если в качестве параметра handler передано значение boolean равное false, то текущий, установленный обработчик
     * кнопки Back будет удален.
     * @return {boolean} Если false значит метод выполнен с ошибками.
     */
    /**
     * При вызове без параметров имитирует нажатие на кнопку Back
     * @function
     * @name back(2)
     * @memberof mailru.app
     * @return {boolean} =false Возвращает значение, которое вернул обработчик нажатия кнопки Back
     */
    api.app.back = api.customBackButtonHandler = function(handler) {
        if (handler === false) handler = function(){return false};
        if (handler) {
            if (isValidParams({
                    'required,function': handler
                }, function(){
                    error.apply(null,arguments);
                })) {
                customBackButtonHandler = handler;
                return true;
            } else {
                return false;
            }
        } else {
            return backButtonHandler();
        }
    };
    /**
     * Устанавливает обработчик данных уведомления, который вызывается при получении нового уведомления
     * при активном экране с приложением
     * @function onPush
     * @memberof mailru.app
     * @param {function} cb - обработчик данных, пришедших в пуше
     * @param {object} cb.data - данные, которые были переданы в параметре data при отправке уведомления
     * @return {boolean} Если false значит метод выполнен с ошибками.
     */
    api.app.onPush = api.app.setOnPushDataCallback = function(cb) {
        if (cb === false) cb = function(){};
        if (isValidParams({
                'required,function': cb
            }, function(){
                error.apply(null,arguments);
            })) {
            onPushCallback = cb;
            return true;
        } else {
            return false;
        }
    };
    /**
     * Устанавливает обработчик состояния активности приложения.
     * Приложение является активным, когда показывается пользователю.
     * Если открывается диалог через api, пользователь сворачивает клиент, etc - приложение уходит в бэкграунд и вызывается onPause.
     * После возвращения пользователя в приложение - вызывается [onResume]{@link mailru.app.onResume}
     * @function onPause
     * @memberof mailru.app
     * @param {function} cb - обработчик состояния активности приложения.
     * @return {boolean} Если false значит метод выполнен с ошибками.
     */
    api.app.onPause = function(cb) {
        if (cb === false) cb = function(){};
        if (isValidParams({
                'required,function': cb
            }, function(){
                error.apply(null,arguments);
            })) {
            onPauseCallback = cb;
            return true;
        } else {
            return false;
        }
    };
    /**
     * Устанавливает обработчик состояния активности приложения.
     * Приложение является активным, когда показывается пользователю.
     * Если открывается диалог через api, пользователь сворачивает клиент, etc - приложение уходит в бэкграунд и вызывается [onPause]{@link mailru.app.onPause}.
     * После возвращения пользователя в приложение - вызывается onResume
     * @function onResume
     * @memberof mailru.app
     * @param {function} cb - обработчик состояния активности приложения.
     * @return {boolean} Если false значит метод выполнен с ошибками.
     */
    api.app.onResume = function(cb) {
        if (cb === false) cb = function(){};
        if (isValidParams({
                'required,function': cb
            }, function(){
                error.apply(null,arguments);
            })) {
            onResumeCallback = cb;
            return true;
        } else {
            return false;
        }
    };
    api.app.loaded = function() {
        try {
            api.invoke('app.loaded');
        } catch (e) {}
    };

    /**
     * Открывает приложение
     * @function open
     * @memberof mailru.app
     * @param {{}} params
     * @param {url} [params.url]
     * @param {url} [params.icon]
     * @param {string} [params.title]
     * @param {string} params.id|app_id
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.app.open = prepareFunc({
        'url': ['url','icon'],
        'string': ['title','id','app_id'],
        'required': 'id|app_id'
    }, 'load.app');

    /**
     * @callback mailru.device~callback
     * @param {{}} result - Состояние ориентации устройства
     * @param {string} result.orientation - текущая ориентация, может иметь значения landscape, или portrait.
     * @param {boolean} result.lock - блокировка смены ориентации - false -  меняется в зависимости от положения устройства, true - не меняется.
     */
    /**
     * Возвращает ориентацию и блокировку смены ориентации
     * @function orientation
     * @memberof mailru.device
     * @param {mailru.device~callback} callback - принемает состояние ориентации устройства.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    /**
     * Устанавливает ориентацию и блокировку смены ориентации
     * @function
     * @name orientation(2)
     * @variation 2
     * @memberof mailru.device
     * @param {{}} params
     * @param {string} [params.orientation] - новая ориентация, может иметь значения landscape, или portrait.
     * @param {boolean} [params.lock] - блокировка смены ориентации - false -  меняется в зависимости от положения устройства, true - не меняется.
     * @param {mailru.device~callback} [params.callback] - принемает состояние ориентации устройства.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.device.orientation = prepareFunc({
        'string': 'orientation',
        'function': 'callback'
    },'device.orientation');

    /**
     * Выполняет запрос на отправку сообщения пользователю из контакт-листа юзера.
     * Обязательным параметром является один из params.text, params.url, params.title, params.image.
     * @function send
     * @memberof mailru.message
     * @param {{}} params
     * @param {string} params.text - текст сообщения
     * @param {url} params.url|image - ссылка на картинку
     * @param {string} params.title - заголовок сообщения
     * @param {string} [params.uin] - uin получателя, если передан - будет предвыбран на экране выбора получателей
     * @param {object} [params.data] - данные, которые приложение получит при открытии
     * @param {{text: string}} [params.fallback]
     * @param {string} [params.fallback.text] - текст, который увидит пользователь клиента, не поддерживающего сообщения из приложений (старые клиенты)
     * @param {bool} [params.only_compatible] - фильтрация списка получателей, если не передан uin. only_compatible=0 - показываются все получатели, only_compatible=1 - показываются только получатели, которые поддерживают приложения хотя бы на одном инстансе. необязательный параметр
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.message.send = prepareFunc({
        'required': 'text|url|title|image',
        'string': ['text','title','uin'],
        'url': ['url','image'],
        'function': 'callback'
    },'message.send',function(params){
        if (typeof params.data === 'object') {
            params.data = utils.makeGet(params.data);
        }
    });
    /**
     * Открытие диалога с пользователем
     * @function openChat
     * @memberof mailru.message
     * @param {{uin: string}} params
     * @param {string} params.uin
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.message.openChat = prepareFunc({
        'string': 'uin'
    },'message.openChat');

    /**
     * @callback mailru.users~callback
     * @param {object} result - Информация о пользователе
     * @param {string} result.first_name - имя
     * @param {string} result.last_name - фамилия
     * @param {string} result.nick - ник
     * @param {number} result.sex - пол --- 0 - мужской, 1 - женский, 2 - не задан
     * @param {date} result.birthday - дата рождения в формате dd.mm.yyyy
     * @param {object} result.avatars
     * @param {url} result.avatars.big - ссылка на аватарку
     * @param {url} result.avatars.small - ссылка на аватарку
     * @param {number} result.online - статус пользователя - 0 - оффлайн, 1 - в сети
     * @param {string} result.uin - uin
     * @param {number} result.contacts_count - кол-во контактов в кл,
     * @param {number} result.apps_support - флаг поддержки клиентом приложений
     */
    /**
     * Возвращает инфо по текущему пользователю
     * @function getInfo
     * @memberof mailru.users
     * @param {mailru.users~callback} callback - принемает информацию о пользователе.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    /**
     * Возвращает инфо по указанному uin.
     * @function
     * @name getInfo(2)
     * @variation 2
     * @memberof mailru.users
     * @param {{}} params
     * @param {string} [params.uin] - uin пользователя, по которому нужно получить информацию.
     * @param {mailru.users~callback} params.callback - принемает информацию о пользователе.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.users.getInfo = prepareFunc({
        'required,function': 'callback',
        'string': 'uin'
    },'users.getInfo');

    /**
     * @callback mailru.users~callback2
     * @param {{}} result - Текущие гео-данные пользователя
     * @param {{lat: float, lon: float}} result.location - текущие координаты формата {lat: float, lon: float}
     * @param {string} result.status - статус выполнения [success/fail]
     */
    /**
     * Возвращает текущие гео-данные пользователя.
     * @function getLocation
     * @memberof mailru.users
     * @param {mailru.users~callback2} callback - принемает информацию о пользователе.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.users.getLocation = prepareFunc({
        'required,function': 'callback'
    },'users.getLocation');

    /**
     * @callback mailru.friends~callback2
     * @param {{}} result
     * @param {string} result.status - статус выполнения [success/already/error/fail],
     * success - успешное добавление, already - uin уже есть в контакт-листе,
     * fail - пользователь отказался добавлять переданый uin,
     * error - ошибка в процессе выполнения вызова
     */
    /**
     * Запрос на добавление в контакт-лист.
     * показывает диалог добавления пользователя в контакт лист.
     * @function add
     * @memberof mailru.friends
     * @param {{}} params
     * @param {string} params.uin - uin пользователя, которого нужно добавить в друзья активному пользователю.
     * @param {mailru.friends~callback2} [params.callback] - функция для обработки результата.

     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.friends.add = prepareFunc({
        'required,string': 'uin',
        'function': 'callback'
    },'friends.add');

    /**
     * @callback mailru.friends~callback
     * @param {object} result
     * @param {(Object[])} result.users - информация о выбранных пользователях
     * @param {string} result.users.first_name - имя
     * @param {string} result.users.last_name - фамилия
     * @param {string} result.users.nick - ник
     * @param {number} result.users.sex - пол --- 0 - мужской, 1 - женский, 2 - не задан
     * @param {date} result.users.birthday - дата рождения в формате dd.mm.yyyy
     * @param {object} result.users.avatars
     * @param {url} result.users.avatars.big - ссылка на аватарку
     * @param {url} result.users.avatars.small - ссылка на аватарку
     * @param {number} result.users.online - статус пользователя - 0 - оффлайн, 1 - в сети
     * @param {string} result.users.uin - uin
     * @param {number} result.users.contacts_count - кол-во контактов в кл,
     * @param {number} result.users.apps_support - флаг поддержки клиентом приложений
     * @param {string} result.status - статус выполнения [success/error/fail]
     */
    /**
     * Показывает диалог выбора пользователей из контакт-листа. после выбора и закрытия диалога приложение получает список выбранных пользователей
     * @function pick
     * @memberof mailru.friends
     * @param {mailru.friends~callback} callback - принемает информацию о пользователях.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    /**
     * Позволяет задать параметры фильтрации для выбора пользователей из контакт-листа.
     * @function
     * @name pick(2)
     * @memberof mailru.friends
     * @variation 2
     * @param {{}} params
     * @param {number} [params.limit] - ограничение кол-ва выбираемых людей. необязательный параметр. по умолчанию - нет ограничения
     * @param {boolean} [params.only_compatible] - фильтрация списка получателей, если не передан uin. only_compatible=0 - показываются все получатели, only_compatible=1 - показываются только получатели, которые поддерживают приложения хотя бы на одном инстансе. необязательный параметр
     * @param {mailru.friends~callback} params.callback - принемает информацию о выбранных пользователях.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.friends.pick = prepareFunc({
        'number': 'limit',
        'required,function': 'callback'
    },'friends.picker',{limit:0});

    /**
     * Запрос на получение данных о пользователях из контакт-листа юзера.
     * Метод возвращает uin'ы и минимальную инфу о пользователях из кл текущего пользователя.
     * @function getInfo
     * @memberof mailru.friends
     * @param {mailru.friends~callback} callback - принемает информацию о пользователях.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    /**
     * Метод возвращает uin'ы и минимальную инфу о пользователях из кл текущего пользователя.
     * Позволяет задать параметры фильтрации
     * @function
     * @name getInfo(2)
     * @variation 2
     * @memberof mailru.friends
     * @param {{}} params
     * @param {number} [params.offset=0] - задает смещение в выборке, нужно если у пользователя контактов больше, чем лимит
     * @param {number} [params.limit=500] - задает лимит кол-ва получаемых контактов
     * @param {boolean} [params.extended=false] - не обязательный параметр. если передан true - возвращает полный набор полей о пользователях, но будет происходить долгий сетевой запрос, если false - будет возвращен урезанный набор полей - nick, online, uin, avatars
     * @param {mailru.friends~callback} params.callback - принемает информацию о пользователях.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.friends.getInfo = prepareFunc({
        'number': ['limit','offset'],
        'required,function': 'callback'
    },function(params){
        api.invoke('friends.getInfo'+(params.extended? 'Extended' : ''), {
            params: params,
            cb: function(data){
                try{
                    data = JSON.parse(data.replace(/\n/g,'\\n'));
                } catch(e){

                }
                params.callback(data);
            }
        });
    },{limit: 100, offset: 0});

    /**
     * @callback mailru.photos~callback
     * @param {{}} result
     * @param {string_base64[]} result.photos - массив выбранных изображений в формате base64
     * @param {string} result.status - статус выполнения [success/error/fail]
     */
    /**
     * Показывает диалог выбора фото из галереи телефона/снять новое фото. после выбора фото и закрытия диалога приложение получает фото в формате base64. если возможен - нативный мультивыбор
     * @function get
     * @memberof mailru.photos
     * @param {mailru.photos~callback} callback - функция для обработки результата.
     * @return {undefined|boolean} Если false значит метод выполнен с ошибками.
     */
    api.photos.get = prepareFunc({
        'required,function': 'callback'
    },'photos.get');

    window.mailru = api;
})(window.mailru, window.$);
