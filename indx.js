console.log("its external indx.js file, I'm ready");


window.onload = codeAddress;


function FeedItemRenderer(feedModel) {
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


function HeaderRenderer() {
    var template = $('#indx_header_template').html();
    this.rendered = Mustache.render(template);
    this.elHTML = document.createElement('div');
    this.elHTML.innerHTML = this.rendered;
    console.log(this.elHTML);
    this.elHTML.setAttribute('id','header_container');

    $(this.elHTML).on("click", "#indx_header_logo", function (e) {

        alert("indx_header_logo");
    });

    $(this.elHTML).on("click", "#indx_header_reload", function (e) {

        alert("indx_header_reload");
    });


    this.getDom = function () {

        return this.elHTML;
    }
}



function FeedItemRenderer2(feedModel) {
    var template = $('#template').html();
    //Mustache.parse(template);   // optional, speeds up future uses

    this.rendered = Mustache.render(template, feedModel);
    //console.log("FeedItemRenderer2 rendered"+this.rendered);


    this.elHTML = document.createElement('div');
    this.elHTML.innerHTML = this.rendered;

    //this.elHTML = $(this.rendered);
    //this.elHTML = document.createElement(this.rendered);
    // console.log("FeedItemRenderer2 rendered"+this.elHTML);
    //this.elHTML.addEventListener('click',function(e) {alert("Clicked")},false);


    $(this.elHTML).on("click", "div.divclass", function (e) {

        alert("Clicked div");
    });

    $(this.elHTML).on("click", "input", function (e) {

        alert("Clicked butt");
    });

    //$('body').append(rendered);
}


function PutToChat(title) {
    console.log("feedItemRenderer.PutToChat " + title);
}

var modelRender1;
var modelRender2;

var headerRenderer;

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
