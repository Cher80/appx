function saveFeedData(docs, feedId) {
	feedDocsArr = [];
	if (docs != undefined) {
		for (var i = 0; i < docs.length; i++) {
			var doc = docs[i];
			console.log("v> _title: " + doc._title);
			feedDocsArr[i] = docs[i].id;
			articlesProvider[docs[i].id] = docs[i];
			//articleFeedsProvider['1232353564'] = docs[i];
		}
		articleFeedsProvider[feedId] = feedDocsArr;
	}
	
}

function makeQuery(feedId, page) {
		$.ajax({
		  type: 'POST',
		  url: 'http://127.0.0.1/api/1_0/queries' + 
		  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey(),
		  data: '{ '
			 + ' "queries": {					 ' 
			 + ' 	"1234244543": {              ' 
			 + '    	"page": {     			  ' 
			 + '    		"page": 0, 					' 
			 + '        	"size": 20,				 	' 
			 + '        	"sort":	[{"_dateParsed":"DESC"}]	 ' 
			 + '     	},										 '
			 + ' 		"criterias":[],                          ' 
			 + ' 		"feedIds": ["' + feedId + '"]  ' 			 
			 + ' 	}      ' 
			 + ' }		' 
			 + ' }		',
		  dataType: 'json',
		  timeout: 300,
		  context: $('body'),
		  success: function(data) {
			  alert ('GOT documents');
			  var docs = data.docs;
			  saveFeedData(docs, feedId);
			  onFeedDataPrepared();
		  },
		  error: function(xhr, type){
			  onFeedDataPrepareError();
		  }
		});
}


function saveFeeds(feeds) {
	feedsProvider = [];
	if (feeds != undefined) {
		for (var i = 0; i < feeds.length; i++) {
			var feed = feeds[i]; 
			//alert('feed id: ' + feed.id);
			//alert('feed name: ' + feed.name);
			feedsProvider[i] = feeds[i];
		}
	}	
}

function putFeed(templateId) {
	$.ajax({
		  type: 'PUT',
		  url: 'http://127.0.0.1/api/1_0/feeds' + 
		  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey(),
		  data: '{ '
			 +' "feeds": [  '
			 +'         {   '
			 +'           "status": "FEED_ENABLED",                     '
			 +'           "query": {                                    ' 
			 +'             "templateId": "' + templateId + '",   '   
			 +'             "criteriaIds": [], '
			 +'             "criterias": [     '
			 +'               {                '
			 +'                 "tags": [  '
			 +'                   "lng:ru" '
			 +'                 ], '
			 +'                 "status": "CRITERIA_ENABLED" ' 
			 +'               } '
			 +'             ] '
			 +'           } '
			 +'         } '
			 +'       ]  '
			 +'     }',
		  dataType: 'json',
		  timeout: 300,
		  context: $('body'),
		  success: function(data) {
			  var feeds = data.feeds;
			  saveFeeds(feeds);
			  if (feedsProvider.length == 0) {
				  onFeedPrepareError();			  
			  } else {
				  onFeedPrepared();
			  }
		  },
		  error: function(xhr, type){
			  onFeedPrepareError();
		  }
	});
}

function getFeeds() {
	$.ajax({
	  type: 'GET',
	  url: 'http://127.0.0.1/api/1_0/feeds' + 
	  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey(),
	  data: '',
	  dataType: 'json',
	  timeout: 300,
	  context: $('body'),
	  success: function(data) {
		  var feeds = data.feeds;
		  saveFeeds(feeds);
		  if (feedsProvider.length == 0) {
			  onHasNoFeed();			  
		  } else {
			  onFeedPrepared();
		  }
	  },
	  error: function(xhr, type){
		 onHasNoFeed();
	  }
	});
}