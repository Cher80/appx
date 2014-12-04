/**
 * Created by auglev on 01.12.14.
 */

var feedsProvider;
var articleFeedsProvider;
var articlesProvider;
var domainsProvider;
var streamsProvider;
var uin;

var oneArticleAid = "";
var curPage;
var nowLoading = false;
var endReached = false;
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




function startFunc() {
    console.log("Indx window ready");

    headerRenderer = new HeaderRenderer();
    $('#indx_header').append(headerRenderer.getDom());

    populateDummies();

    uin = getUrlParameter( window.location.search.substring(1),'uin');
    if (uin!==undefined) {
        console.log("startFunc Have uin uin="+uin);
        indxDoInit(uin);
    }


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



