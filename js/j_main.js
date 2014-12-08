/**
 * Created by auglev on 01.12.14.
 */

var feedsProvider;
var articleFeedsProvider;
var articlesProvider;
var domainsProvider;
var streamsProvider;
var uin;
var toUin;

var oneArticleAid = "";
var curPage;
var nowLoading = false;
var endReached = false;
var nowImageFullScreen =false;
var fullScreen;
//file:///Users/auglev/IdeaProjects/icqindexisto/icq.html?uin=30000583&data=aid%3DarticleId

function getUrlParameter(sPageURL,sParam)
{
    //var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}


function getTagValue(pref, tags) {
    try {
        for (i = 0; i < tags.length; i++) {
            var tag = tags[i];
            console.log("getTagValue tag=" + tag);
            if (tag.indexOf(pref) == 0) {
                console.log("getTagValue pref=" + pref + " Itsmeee!!!");
                return tag.substring(4, tag.length)
            }
        }
    } catch (e){

    }
}



function getStreamImage(streamName) {
    try {
        return streamsProvider.filter(function (obj) {
            if (obj.name == streamName) {
                return obj
            }
        })[0].image;
    }
    catch  (e) {

    }
}


function getDataParam(paramName) {
    var dataParam = getUrlParameter( window.location.search.substring(1),'data');
    console.log("getDataParam dataParam="+dataParam);
    if (dataParam!==undefined) {
        console.log("getDataParam est data");
        var decodedData = decodeURIComponent(dataParam);
        console.log("getDataParam decodedData="+decodedData);
        var paramValue = getUrlParameter(decodedData,paramName);
        console.log("getDataParam paramValue="+paramValue);
        if (paramValue!==undefined) {
            return paramValue;
        }
    }
}



function indxOnInited() {
	console.log("a> indxOnInited");
    var parmAid = getDataParam('aid');
    if (parmAid!==undefined) {
        oneArticleAid = parmAid;
        console.log("startFunc Have Article, load one article aid="+oneArticleAid);
        indxGetOneArticleData(oneArticleAid);
    } else {
        curPage = 0;
        indxGetFeedData(feedsProvider[0].id, curPage);
    }
}




var optionsZoom = {'top' : '0', // zoom target container top position in pixel
    'left' : '0', // zoom target container left position in pixel
    'width' : '100%', // zoom target container width in pixel or in percent
    'height' : '100%', // zoom target container height in pixel or in percent
    'easing' : 'smartZoomEasing', // jquery easing function used when the browser doesn't support css transitions
    'maxScale' : 3, // the max scale that will be applied on the zoom target
    'dblClickMaxScale' : 1.8, // the max scale that will be applied on the zoom target on double click
    'mouseEnabled' : true, // enable plugin mouse interaction
    'scrollEnabled' : true, // enable plugin mouse wheel behviour
    'dblClickEnabled' : true, // enable plugin mouse doubleClick behviour
    'mouseMoveEnabled' : true, // enable plugin target drag behviour
    'moveCursorEnabled' : true, // show moveCursor for drag
    'touchEnabled' : true, // enable plugin touch interaction
    'dblTapEnabled' : true, // enable plugin double tap behaviour
    'pinchEnabled' : true, // enable zoom when user pinch on target
    'touchMoveEnabled' : true, // enable target move via touch
    'containerBackground' : '#FF00FF', // zoom target container background color (if containerClass is not set)
    'containerClass' : 'indx_smart_zoom'// class to apply to zoom target container if you whant to change background or borders (don't change size or position via css)
}

function startFunc() {
    console.log("Indx window ready");

    headerRenderer = new HeaderRenderer();
    $('#indx_header').append(headerRenderer.getDom());


    moment.locale('ru');


    var toUinParam = getUrlParameter( window.location.search.substring(1),'ref');
    console.log("startFunc toUinParam="+toUinParam);
    if (toUinParam!==undefined) {
        console.log("startFunc !==undefined toUinParam="+toUinParam);
        if (toUinParam.indexOf('conversation') != -1) {
            console.log("startFunc have conversation");
            toUin = toUinParam.substring("conversation".length, toUinParam.length);
            console.log("startFunc toUin="+toUin);
        }
    }


    function notify() {
        alert( "clicked" );
    }
    $('#xxx').on( "click",
        function(e) {
            //$('#xxx').smartZoom(optionsZoom);
            showFullScreen(0,$('#xxx').attr('src'));
        }

         );

    //$("#xxx" ).click();

    populateDummies();

    uin = getUrlParameter( window.location.search.substring(1),'uin');
    if (uin!==undefined) {
        console.log("startFunc Have uin uin="+uin);
        indxDoInit(uin);
    }





    //console.log(moment([2007, 0, 29]).fromNow());





    mailru.app.back(function(e) {

        if (nowImageFullScreen) {

            if (fullScreen!==undefined) {

                fullScreen.needClear();
                return true;
            }
            return false;
        } else {
            return false;
        }
        showFullScreen(0,"http://vitamincm.com/wp-content/uploads/2011/08/close-running-iphone-apps.png");
    });


    $(window).on('scroll', function(){
        if( $(window).scrollTop() > $(document).height() - $(window).height() - 400) {
            console.log("End reached!!!");

            if (oneArticleAid.length=== 0) {
                if (!nowLoading && !endReached) {
                    curPage = curPage + 1;
                    console.log("Now loading!!! curPage=" + curPage);
                    indxGetFeedData(feedsProvider[0].id, curPage);
                }
            }

        }
    })

}
