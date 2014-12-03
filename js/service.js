//1
function indxDoInit(uid) {
	console.log("v> client name: " + uid);
	console.log("v> has client data: " + hasClient());
	if (!hasClient()) {
		console.log("v> registering client");
		register(uid);
	} else {
		console.log("v> trying to login");
		login(getClientId());
	}
}

function onAuthenticationError() {
	console.log("v> ERROR: can not authenticat");
	alert('ERROR: can not authenticate');
}

function onAuthenticated() {
	console.log("v> authenticated");
	console.log("v> preparing feeds");
	getFeeds();
}

function onHasNoFeed() {
	console.log("v> has no feeds, creating...");
	var templateId = "53eccbba975ad62d850d015c";
	putFeed(templateId);
}

function onFeedPrepared() {
	console.log("v> feed prepared");
	setTimeout(indxOnInited, 300);
}

function onFeedPrepareError() {
	console.log("v> ERROR: can not prepare feed");
	alert('ERROR: can not prepare feed');
}


//2
function indxGetFeedData(feedId, page) {
    console.log("getting feed data: feedId=" + feedId + " page=" + page);
    nowLoadingData();
    makeQuery(feedId, page);
}

function onFeedDataPrepared() {
	console.log("v> feed data prepared");
	setTimeout(indxHaveFeedData, 300, null);
}

function onFeedDataPrepareError() {
	console.log("v> ERROR: can not prepare feed data");
	alert('ERROR: can not prepare feed data');
}

//3
function indxGetOneArticleData(oneArticleAid) {
    console.log("indxGetOneArticleData oneArticleAid="+oneArticleAid);
    nowLoadingData();
    setTimeout(indxHaveOneArticleData, 300, 12);
}