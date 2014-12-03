/**
 * Created by auglev on 28.11.14.
 */





function populateDummies() {

    console.log("IndxpopulateDummies");



    feedsProvider = [{feedId: "fffid1"}, {feedId: "fffid2"}];


    articleFeedsProvider = {"fffid1": ["e43be6adac2dfd0688359e787eb7b413","aid2","aid3","aid4","aid5","aid6","aid7","aid8"]};


    domainsProvider = [{"id":"5460df3e822e0b0c3dae45e7","name":"4pda.ru","image":"2a59a3c62662d1bb7bfcb1364f080142"},{"id":"545b98fc822e685d1f227246","name":"atkritka.com новое","image":"c674363a200dadf4715924b8270efd37"},{"id":"543279bb822e8ee5a5878df1","name":"habrahabr.ru","image":"09542fbb69f3d4af5f62bae195874a0d"},{"id":"5422d1c2822ebe60aace3085","name":"pikabu.ru","image":"19bf562dcf8e1ba35c27ffa41993f376"},{"id":"5422b675822ebe60aace3061","name":"siliconrus.com","image":"d43e2c6969000cc1f9f3d6ec1bed1ae7"},{"id":"5422d0c5822ec1d42d2bb173","name":"vk.com mdk","image":"cd155ca2374eb7ce2c1f9f2523275e5c"},{"id":"5460bbd8822e685d1f22724e","name":"ЁП","image":"e6f0ba2d13a05d9349af0df16a5f83f4"}];
    streamsProvider =  [{"id":"5460df3e822e0b0c3dae45e7","name":"4pda.ru","image":"2a59a3c62662d1bb7bfcb1364f080142"},{"id":"545b98fc822e685d1f227246","name":"atkritka.com новое","image":"c674363a200dadf4715924b8270efd37"},{"id":"543279bb822e8ee5a5878df1","name":"habrahabr.ru","image":"09542fbb69f3d4af5f62bae195874a0d"},{"id":"5422d1c2822ebe60aace3085","name":"pikabu.ru","image":"19bf562dcf8e1ba35c27ffa41993f376"},{"id":"5422b675822ebe60aace3061","name":"siliconrus.com","image":"d43e2c6969000cc1f9f3d6ec1bed1ae7"},{"id":"5422d0c5822ec1d42d2bb173","name":"vk.com mdk","image":"cd155ca2374eb7ce2c1f9f2523275e5c"},{"id":"5460bbd8822e685d1f22724e","name":"ЁП","image":"e6f0ba2d13a05d9349af0df16a5f83f4"}];



    articlesProvider = {
        "e43be6adac2dfd0688359e787eb7b413":{
            _title: "«Яндекс» объяснил утечку миллиона паролей от почтовых ящиков",
        //_image: "fb615fda4c1e1f2f562a2b128bb7d42e",
            _imageGif:"7249752198c166df9b8732d37cadc037",
            //_images: ["fb615fda4c1e1f2f562a2b128bb7d42e","fb615fda4c1e1f2f562a2b128bb7d42e"],
           // _imagesGif: ["7249752198c166df9b8732d37cadc037","7249752198c166df9b8732d37cadc037"],
    _body: "Мы не называем произошедшее утечкой или взломом",
    _url: "http://tvrain.ru/articles/jandeks_objasnil_utechku_milliona_parolej_ot_pochtovyh_jaschikov-375114/",
    _id: "e43be6adac2dfd0688359e787eb7b413",
    _dateParsed: "2014-11-08T18:32:58",
    _bodyPresentedJson: { "body" : [ {"name" : "img","src":"dea7a57d09978bd240e2e4842d2e5edf"},{"name" : "h2","textHtml":"Заоголовок"},{ "name" : "p" , "textHtml" : "&laquo;Мы не называем произошедшее \n<a onclick=\"indx_show_tag('nmE:утечка')\" href=\"#indx:nmE:утечка\">утечкой</a> \n<a onclick=\"indx_show_tag('nmE:или')\" href=\"#indx:nmE:или\">или</a> взломом. У \n<a onclick=\"indx_show_tag('nmE:мы')\" href=\"#indx:nmE:мы\">нас</a> \n<a onclick=\"indx_show_tag('nmE:ничего')\" href=\"#indx:nmE:ничего\">ничего</a> не украли&raquo;, — сказал он."} , { "name" : "p" , "textHtml" : "&laquo;У \n<a onclick=\"indx_show_tag('nmE:мы')\" href=\"#indx:nmE:мы\">нас</a> \n<a onclick=\"indx_show_tag('nmE:ничего')\" href=\"#indx:nmE:ничего\">ничего</a> не могли украсть как минимум потому, \n<a onclick=\"indx_show_tag('nmE:что')\" href=\"#indx:nmE:что\">что</a> в &quot;Яндексе&quot; \n<a onclick=\"indx_show_tag('nmE:нигде')\" href=\"#indx:nmE:нигде\">нигде</a> не хранится \n<a onclick=\"indx_show_tag('nmE:информация')\" href=\"#indx:nmE:информация\">информация</a> о \n<a onclick=\"indx_show_tag('nmE:пароль')\" href=\"#indx:nmE:пароль\">паролях</a> \n<a onclick=\"indx_show_tag('nmE:пользователь')\" href=\"#indx:nmE:пользователь\">пользователей</a> в открытом, в читаемом \n<a onclick=\"indx_show_tag('nmE:вид')\" href=\"#indx:nmE:вид\">виде</a>. Хранятся \n<a onclick=\"indx_show_tag('nmE:только')\" href=\"#indx:nmE:только\">только</a> зашифрованные \n<a onclick=\"indx_show_tag('nmE:пароль')\" href=\"#indx:nmE:пароль\">пароли</a>, из которых \n<a onclick=\"indx_show_tag('nmE:невозможно')\" href=\"#indx:nmE:невозможно\">невозможно</a> обратно составить слово-пароль, которое опубликовано&raquo;, — пояснил Забанных."} , { "name" : "p" , "textHtml" : "По его \n<a onclick=\"indx_show_tag('nmE:слово')\" href=\"#indx:nmE:слово\">словам</a>, &laquo;с большой \n<a onclick=\"indx_show_tag('nmE:доля')\" href=\"#indx:nmE:доля\">долей</a> \n<a onclick=\"indx_show_tag('nmE:вероятность')\" href=\"#indx:nmE:вероятность\">вероятности</a> эта \n<a onclick=\"indx_show_tag('nmE:база данных')\" href=\"#indx:nmE:база данных\">база данных</a>, которая собиралась достаточно \n<a onclick=\"indx_show_tag('nmE:долгий')\" href=\"#indx:nmE:долгий\">долгие</a> \n<a onclick=\"indx_show_tag('nmE:год')\" href=\"#indx:nmE:год\">годы</a>, злоумышленниками с \n<a onclick=\"indx_show_tag('nmE:помощь')\" href=\"#indx:nmE:помощь\">помощью</a> троянских программ и \n<a onclick=\"indx_show_tag('nmE:вирус')\" href=\"#indx:nmE:вирус\">вирусов</a> на \n<a onclick=\"indx_show_tag('nmE:компьютер')\" href=\"#indx:nmE:компьютер\">компьютерах</a> \n<a onclick=\"indx_show_tag('nmE:пользователь')\" href=\"#indx:nmE:пользователь\">пользователей</a> \n<a onclick=\"indx_show_tag('nmE:быть')\" href=\"#indx:nmE:быть\">была</a> собрана, видимо, каким-то \n<a onclick=\"indx_show_tag('nmE:образ')\" href=\"#indx:nmE:образ\">образом</a> использована за \n<a onclick=\"indx_show_tag('nmE:последний')\" href=\"#indx:nmE:последний\">последний</a> год-полтора, \n<a onclick=\"indx_show_tag('nmE:может быть')\" href=\"#indx:nmE:может быть\">может быть</a>, больше, и \n<a onclick=\"indx_show_tag('nmE:сейчас')\" href=\"#indx:nmE:сейчас\">сейчас</a> &lt;…&gt; \n<a onclick=\"indx_show_tag('nmE:быть')\" href=\"#indx:nmE:быть\">была</a> опубликована в \n<a onclick=\"indx_show_tag('nmE:сеть')\" href=\"#indx:nmE:сеть\">сети</a>&raquo;."} , { "name" : "p" , "textHtml" : "Как уточнил Забанных, около 85% аккаунтов из базы данных — &laquo;мертвые&raquo;, то есть \n<a onclick=\"indx_show_tag('nmE:они')\" href=\"#indx:nmE:они\">ими</a> давно \n<a onclick=\"indx_show_tag('nmE:никто')\" href=\"#indx:nmE:никто\">никто</a> не пользуется. Значительная часть остальных аккаунтов \n<a onclick=\"indx_show_tag('nmE:быть')\" href=\"#indx:nmE:быть\">были</a> ранее взломаны, и их \n<a onclick=\"indx_show_tag('nmE:активность')\" href=\"#indx:nmE:активность\">активность</a> \n<a onclick=\"indx_show_tag('nmE:быть')\" href=\"#indx:nmE:быть\">была</a> определена &laquo;Яндексом&raquo; как подозрительная. Реальных \n<a onclick=\"indx_show_tag('nmE:пользователь')\" href=\"#indx:nmE:пользователь\">пользователей</a>, которых коснулась \n<a onclick=\"indx_show_tag('nmE:утечка')\" href=\"#indx:nmE:утечка\">утечка</a> данных, &laquo;пренебрежимо \n<a onclick=\"indx_show_tag('nmE:мало')\" href=\"#indx:nmE:мало\">мало</a>&raquo;, добавил он."} , { "name" : "p" , "textHtml" : "Ранее в открытых \n<a onclick=\"indx_show_tag('nmE:источник')\" href=\"#indx:nmE:источник\">источниках</a> появилось более \n<a onclick=\"indx_show_tag('nmE:миллион')\" href=\"#indx:nmE:миллион\">миллиона</a> \n<a onclick=\"indx_show_tag('nmE:пароль')\" href=\"#indx:nmE:пароль\">паролей</a> от \n<a onclick=\"indx_show_tag('nmE:почтовый')\" href=\"#indx:nmE:почтовый\">почтовых</a> \n<a onclick=\"indx_show_tag('nmE:ящик')\" href=\"#indx:nmE:ящик\">ящиков</a> &laquo;Яндекса&raquo;. Первыми их обнаружил \n<a onclick=\"indx_show_tag('nmE:пользователь')\" href=\"#indx:nmE:пользователь\">пользователь</a> \n<a onclick=\"indx_show_tag('nmE:сайт')\" href=\"#indx:nmE:сайт\">сайта</a> &laquo;Хабрахабр&raquo;. &laquo;\n<a onclick=\"indx_show_tag('nmE:база')\" href=\"#indx:nmE:база\">База</a> представляет собой \n<a onclick=\"indx_show_tag('nmE:текстовый документ')\" href=\"#indx:nmE:текстовый документ\">текстовый документ</a>, в котором заявлен \n<a onclick=\"indx_show_tag('nmE:один')\" href=\"#indx:nmE:один\">один</a> \n<a onclick=\"indx_show_tag('nmE:миллион')\" href=\"#indx:nmE:миллион\">миллион</a> \n<a onclick=\"indx_show_tag('nmE:позиция')\" href=\"#indx:nmE:позиция\">позиций</a>. В комментариях \n<a onclick=\"indx_show_tag('nmE:народ')\" href=\"#indx:nmE:народ\">народ</a> пишет, \n<a onclick=\"indx_show_tag('nmE:что')\" href=\"#indx:nmE:что\">что</a> из \n<a onclick=\"indx_show_tag('nmE:первый')\" href=\"#indx:nmE:первый\">первых</a> попавшихся \n<a onclick=\"indx_show_tag('nmE:десять')\" href=\"#indx:nmE:десять\">десяти</a> \n<a onclick=\"indx_show_tag('nmE:ящик')\" href=\"#indx:nmE:ящик\">ящиков</a> как минимум \n<a onclick=\"indx_show_tag('nmE:восемь')\" href=\"#indx:nmE:восемь\">восемь</a> являются на \n<a onclick=\"indx_show_tag('nmE:настоящий')\" href=\"#indx:nmE:настоящий\">настоящий</a> момент валидными&raquo;, — сообщил \n<a onclick=\"indx_show_tag('nmE:автор')\" href=\"#indx:nmE:автор\">автор</a> \n<a onclick=\"indx_show_tag('nmE:пост')\" href=\"#indx:nmE:пост\">поста</a>, чей \n<a onclick=\"indx_show_tag('nmE:пароль')\" href=\"#indx:nmE:пароль\">пароль</a> оказался в \n<a onclick=\"indx_show_tag('nmE:база')\" href=\"#indx:nmE:база\">базе</a>."} , { "name" : "p" , "textHtml" : "<a onclick=\"indx_show_tag('nmE:социальная сеть')\" href=\"#indx:nmE:социальная сеть\">Социальная сеть</a> &laquo;ВКонтакте&raquo; заморозила аккаунты, привязанные к этим \n<a onclick=\"indx_show_tag('nmE:почтовый')\" href=\"#indx:nmE:почтовый\">почтовым</a> \n<a onclick=\"indx_show_tag('nmE:адрес')\" href=\"#indx:nmE:адрес\">адресам</a>, сообщил в твиттере пресс-секретарь компании \n<a onclick=\"indx_show_tag('nmE:георгий')\" href=\"#indx:nmE:георгий\">Георгий</a> Лобушкин."} , { "name" : "p" , "textHtml" : "<a onclick=\"indx_show_tag('nmE:информация')\" href=\"#indx:nmE:информация\">Информация</a> о владельцах аккаунтов &laquo;Яндекс.Почты&raquo; не могла попасть в \n<a onclick=\"indx_show_tag('nmE:открытый доступ')\" href=\"#indx:nmE:открытый доступ\">открытый доступ</a> из-за взлома \n<a onclick=\"indx_show_tag('nmE:сервер')\" href=\"#indx:nmE:сервер\">серверов</a> компании. Об этом в \n<a onclick=\"indx_show_tag('nmE:понедельник')\" href=\"#indx:nmE:понедельник\">понедельник</a>, 8 \n<a onclick=\"indx_show_tag('nmE:сентябрь')\" href=\"#indx:nmE:сентябрь\">сентября</a>, рассказал в \n<a onclick=\"indx_show_tag('nmE:эфир')\" href=\"#indx:nmE:эфир\">эфире</a> &laquo;Дождя&raquo; руководитель персональных сервисов &laquo;Яндекса&raquo; \n<a onclick=\"indx_show_tag('nmE:антон')\" href=\"#indx:nmE:антон\">Антон</a> Забанных."} , { "name" : "p" , "textHtml" : "14 \n<a onclick=\"indx_show_tag('nmE:сентябрь')\" href=\"#indx:nmE:сентябрь\">сентября</a> в России состоится \n<a onclick=\"indx_show_tag('nmE:день')\" href=\"#indx:nmE:день\">день</a> единого голосования.&nbsp;Обсуждаем \n<a onclick=\"indx_show_tag('nmE:выбор')\" href=\"#indx:nmE:выбор\">выборы</a> в \n<a onclick=\"indx_show_tag('nmE:тот')\" href=\"#indx:nmE:тот\">тех</a> \n<a onclick=\"indx_show_tag('nmE:регион')\" href=\"#indx:nmE:регион\">регионах</a>, \n<a onclick=\"indx_show_tag('nmE:где')\" href=\"#indx:nmE:где\">где</a> сохраняется \n<a onclick=\"indx_show_tag('nmE:интрига')\" href=\"#indx:nmE:интрига\">интрига</a>"}]},


    _tags: [
    "stN:4pda.ru",
    "reT:snippet",
    "doU:tvrain.ru",
    "lng:ru",
    "doN:4pda.ru",
    "siC:news"
    ],
    _description: "Мы не называем произошедшее утечкой или взломом. У нас ничего не украли",
        _imagesTotal: 1
},
        "aid2":{
            "_title":"Привет статья 2"
        },
        "aid3":{
            "_title":"Привет статья 3"
        },
        "aid4":{
            "_title":"Привет статья 4"
        },
        "aid5":{
            "_title":"Привет статья 5"
        },
        "aid6":{
            "_title":"Привет статья 6"
        },
        "aid7":{
            "_title":"Привет статья 7"
        },
        "aid8":{
            "_title":"Привет статья 8"
        }

    }



    //articleFeedsProvider = $.parseJSON('{"fffid1": ["aid1","aid2","aid3"]}');


}