console.log("Loading j_display_service");


function indxHaveOneArticleData() {

    console.log("a> indxHaveOneArticleData");
    //headerRenderer.setLoaded();

    $('#indx_items').empty();
    console.log("oneArticleAid" + oneArticleAid);


    var itemRenderer = new FeedItemRenderer(oneArticleAid);
    $('#indx_items').append(itemRenderer.getDom());
    //$('#indx_footer').show();
    //nowLoading = false;
    dataLoaded();

}

function indxHaveFeedData() {
    console.log("a> indxHaveFeedData");
    //headerRenderer.setLoaded();

    if (curPage===0) {
        $('#indx_items').empty();
    }


    var feedId = feedsProvider[0].id;
    var articlesFeed = articleFeedsProvider[feedId];
    console.log("indxHaveFeedData articlesFeed=" + articlesFeed);
    var startPos = curPage*PAGE_SIZE;
    var endPos = curPage*PAGE_SIZE + PAGE_SIZE;

    console.log("curPage="+ curPage+" startPos="+startPos + " endPos="+endPos + " articlesProvider.length="+articlesFeed.length);
    if  (endPos>articlesFeed.length) {
        endReached = true;
        endPos = articlesFeed.length;
    } else {

    }
    console.log("corrected curPage="+ curPage+" startPos="+startPos + " endPos="+endPos  + " articlesProvider.length="+articlesFeed.length);

    for (var i=startPos;i<endPos;i++) {
        var aid = articlesFeed[i];
        console.log("indxHaveFeedData articleModel aid" + aid + " i="+i);
        var articleModel = articlesProvider[aid];
        var itemRenderer = new FeedItemRenderer(aid);

        $('#indx_items').append(itemRenderer.getDom());
    }
    console.log("indxHaveFeedData dataLoaded=" + curPage);
    dataLoaded();
    /*
    $.each(articlesFeed, function (i, aid) {
        console.log("aid" + aid);

        var articleModel = articlesProvider[aid];
        console.log("articleModel.title" + articleModel.title);



    });*/
    //$('#indx_footer').show();
    //nowLoading = false;


}


function HeaderRenderer() {
    var template = $('#indx_header_template').html();
    this.rendered = Mustache.render(template);

    this.elHTML = document.createElement('div');
    this.elHTML.innerHTML = this.rendered;
    var self = this;
    //console.log(this.elHTML);
    this.elHTML.setAttribute('id', 'header_container');



    $(this.elHTML).on("click", "#indx_header_reload", function (e) {
        $('#indx_items').empty();
        curPage = 0;
        endReached = false;
        indxGetFeedData(feedsProvider[0].id, 0, 10, 9991);
    });

    $(this.elHTML).on("click", "#indx_header_preloader", function (e) {
        $('#indx_items').empty();
        curPage = 0;
        endReached = false;
        indxGetFeedData(feedsProvider[0].id, 0, 10, 9991);
        //alert("indx_header_preloader");
    });


    $(this.elHTML).on("click", "#indx_play_button", function (e) {
        gotoMarket();
    });


    $(this.elHTML).on("click", "#indx_header_back", function (e) {
        if (oneArticleAid.length>0) {
            oneArticleAid = "";

            curPage = 0;
            window.scrollTo(0, 0);
            indxGetFeedData(feedsProvider[0].id, curPage);
        } else {
            mailru.app.back();
        }
    });


    $(this.elHTML).on("click", "#indx_header_logo", function (e) {
        if (oneArticleAid.length>0) {
            oneArticleAid = "";
            curPage = 0;
            indxGetFeedData(feedsProvider[0].id, curPage);
        } else {
            mailru.app.back();
        }

    });







    this.getDom = function () {

        return this.elHTML;
    }

    this.setLoading = function () {

        $('#indx_header_preloader', this.elHTML).show();
        $('#indx_header_reload', this.elHTML).hide();
    }

    this.setLoaded = function () {

        $('#indx_header_preloader', this.elHTML).hide();
        $('#indx_header_reload', this.elHTML).show();
    }
}



function nowLoadingData() {
    nowLoading = true;
    headerRenderer.setLoading();
    $('#indx_footer').show();
}

function dataLoaded() {
    nowLoading = false;
    headerRenderer.setLoaded()
    $('#indx_footer').hide();
}



function handleBack() {

}


function sendMessage(aid,image,title,description) {
    var params = {};
    params.image = image;
    params.text = description;
    params.title = title;
    params.data = {"aid":aid};

    console.log("share! params="+params);
    mailru.message.send(params);
}


function gotoMarket() {
    window.open("https://play.google.com/store/apps/details?id=com.indxnews&referrer=utm_source%3Dicqapp");
}



function FeedItemRenderer(aid) {
    console.log("FeedItemRenderer " + aid);
    this.aid = aid;
    this.moreShowed = false;
    var template = $('#indx_item_template').html();
    //Mustache.parse(template);   // optional, speeds up future uses


    this.articleModel = articlesProvider[aid];
    console.log("articleModel " + this.articleModel);
    var self = this;

    //var timeStr = moment([2007, 0, 29]).fromNow();
    try {
        var timeStr = moment(this.articleModel._dateParsed).fromNow();
        this.articleModel.timeStr = timeStr;
    } catch (e) {

    }


    var streamName = getTagValue("stN:", this.articleModel._tags);
    this.articleModel.streamName = streamName;
    var streamImage = getStreamImage(streamName);
    console.log("streamImage="+streamImage);
    var sourceImg = "" + streamImage + "";
    this.articleModel.sourceImg = sourceImg;

    //var sourceImg = "https://image.indexisto.com/download/" + streamImage + "_sw64";
    //this.articleModel.sourceImg = sourceImg;


    var processedImage;
    if (this.articleModel._image!==undefined) {
        processedImage = imageStorePath + this.articleModel._image + "_w1024";
        this.articleModel.processedImage = processedImage;
    }
    if (this.articleModel._imageGif!==undefined) {
        processedImage = imageStorePath + this.articleModel._imageGif + "_";
        this.articleModel.processedImage = processedImage;
    }

    console.log("FeedItemRenderer timeStr=" + timeStr);

    this.articleModel.imageStorePath = imageStorePath;

    this.rendered = Mustache.render(template, this.articleModel);


    this.elHTML = document.createElement('div');
    this.elHTML.innerHTML = this.rendered;
    this.elHTML.setAttribute('class', 'feed_item_render');

    //this.elHTML = $(this.rendered);
    //this.elHTML = document.createElement(this.rendered);
    // console.log("FeedItemRenderer2 rendered"+this.elHTML);
    //this.elHTML.addEventListener('click',function(e) {alert("Clicked")},false);


    $(this.elHTML).on("click", '[data-name="show_more"]', function (e) {
        //alert("show_more " + aid);
        if (!self.moreShowed) {
            self.moreShowed = true;

            var more = "";
            console.log("bodyJSON " + self.articleModel._bodyPresentedJson.body);
            for (i = 0; i < self.articleModel._bodyPresentedJson.body.length; i++) {
                var bodyJSON = self.articleModel._bodyPresentedJson.body[i];
                if (bodyJSON.name === "p") {
                    console.log("bodyJSON p");
                    more = more + "<p>" + bodyJSON.textHtml + "</p>";
                }

                if (bodyJSON.name === "img") {

                    if (bodyJSON.type === "gif") {
                        more = more +  "<img class=\"indx_item_pic_body\" src=\""+ imageStorePath + bodyJSON.src + "_\"/ >";
                    } else {
                        more = more +  "<img class=\"indx_item_pic_body\" src=\""+imageStorePath + bodyJSON.src + "_w1024\"/ >";
                    }

                }
                if (bodyJSON.name === "h1" || bodyJSON.name === "h2" || bodyJSON.name === "h3" || bodyJSON.name === "h4" || bodyJSON.name === "h5" || bodyJSON.name === "h6") {
                    console.log("bodyJSON h");
                    more = more + "<h1>" + bodyJSON.textHtml + "</h1>";

                }

                //console.log("bodyJSON " +bodyJSON);
            }
            console.log("bodyJSON more" + more);
            $('[data-name="more_holder"]',self.elHTML ).append(more);
        } else {
            self.moreShowed = false;
            $('[data-name="more_holder"]',self.elHTML).empty();
        }


    });

    $(this.elHTML).on("click", '[data-name="share_icq"]', function (e) {
        console.log("share!");
        sendMessage(self.aid,self.articleModel.processedImage,self.articleModel._title,self.articleModel._description);
        //sendMessage("asda","ddd","vvv","mms");

    });

    this.getDom = function () {
        return this.elHTML;
    }


}


var headerRenderer;

/*
 OLD STAFF
 */

/*

 function PutToChat(title) {
 console.log("feedItemRenderer.PutToChat " + title);
 }

 var modelRender1;
 var modelRender2;

 function FeedItemRendererOld(feedModel) {
 this.mFeedModel = feedModel;
 this.mFeedItemDom;
 this.titleRender;
 this.i = 58;

 this.initDom = function () {
 this.titleRender = $("<p>" + "temlate" + "</p>");
 this.feedItemDom = $("<div></div>");
 this.feedItemDom.append(this.titleRender);
 this.i = 67;
 return this.feedItemDom;
 }


 console.log("feedItemRenderer feedModel.title = " + feedModel.title);

 this.updateModel = function (feedModel) {

 this.mFeedModel = feedModel;
 console.log("feedItemRenderer update feedModel.title = " + this.mFeedModel.title);
 this.bindModel();
 }


 this.bindModel = function () {
 console.log("feedItemRenderer.bindModel mFeedModel.title = " + this.mFeedModel.title);
 this.titleRender.text(this.mFeedModel.title);
 }


 }



 function codeAddress() {
 console.log("Window ready");
 var feedModel1 = {title: "Allena1"};
 var feedModel2 = {title: "Allena2"};
 modelRender1 = new FeedItemRenderer(feedModel1);

 var $input = $('<input type="button" value="new button" />');
 $input.on('click', function () {
 modelRender1.updateModel(feedModel2);
 });
 $input.appendTo($("body"));
 $('body').append(modelRender1.initDom());

 console.log("feedItemRenderer.i " + modelRender1.i);


 modelRender2 = new FeedItemRenderer2(feedModel2);
 $('body').append(modelRender2.elHTML);


 headerRenderer = new HeaderRenderer();
 $('body').append(headerRenderer.getDom());

 //var feedModel2 = {title:"Allena2"};
 //var modelRender2 = feedItemRenderer(feedModel2);
 // $('body').append(modelRender2);
 }

 */