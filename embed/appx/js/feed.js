function adoptDocument(doc) {
	try {
		// presented JSON correction

		var bodyPresentedJson = doc._bodyPresentedJson;
		if (bodyPresentedJson!==undefined) {
			try {
				bodyPresentedJson = bodyPresentedJson.substring(1);
				doc._bodyPresentedJson = $.parseJSON(bodyPresentedJson);
			} catch  (e) {

			}
		}
		
		// images correction
		var image = doc._imageGif;
		if (image == undefined) image = doc._image;
		
		var images = doc._images;
		var imagesGif = doc._imagesGif;
		var bodyParts = doc._bodyPresentedJson.body;
		var arr = [];
		var bodyPartsNew = [];
		var imagesNew = [];
		var imagesGifNew = [];

		//console.log("v> ----------- image: " + image);
		if (image != undefined) {
			
			// bodyPresented
			if (bodyParts.length > 0) {
				for (var i = 0; i < bodyParts.length; i++) {
					if (bodyParts[i].name == 'img' && bodyParts[i].src == image) {
						//console.log("v> - b same img: " + bodyParts[i].src);
					} else {
						bodyPartsNew.push(bodyParts[i]);
					}
				}
			}
			doc._bodyPresentedJson.body = bodyPartsNew;			
			
			// jpg
			if(images != undefined) {
				arr = [];
				if (!$.isArray(images)) {
					arr.push(images);
				} else {
					arr = images;
				}					
			    for (var z = 0; z < arr.length; z++) {
			        if (arr[z] == image) {
			        } else {
			        	imagesNew.push(arr[z]);
			        }
			    }
			}
			doc._images = imagesNew;
			
			//gif
			if(imagesGif != undefined) {
				arr = [];
				if (!$.isArray(imagesGif)) {
					arr.push(imagesGif);
				} else {
					arr = imagesGif;
				}				
			    for (var x = 0; x < arr.length; x++) {
			        if (arr[x] == image) {
			        } else {
			        	imagesGifNew.push(arr[x]);
			        }
			    }
			}
			doc._imagesGif = imagesGifNew;
		}
	} catch (e) {
		//alert(e);
	}
	return doc;
}

function saveFeedData(data, feedId) {
	var feedDocsArr = articleFeedsProvider[feedId];
	if (feedDocsArr == undefined) feedDocsArr = [];
	
	var docs = data.docs;
	if (docs != undefined) {
		for (var i = 0; i < docs.length; i++) {
			var doc = docs[i];
			//console.log("v> id: " + doc.id);
			feedDocsArr.push(docs[i].id);
			var docTmp = adoptDocument(docs[i]);
			articlesProvider[docs[i].id] = docTmp;
		}
		articleFeedsProvider[feedId] = feedDocsArr;
	}
	
	var domains = data.domains;
	if (domains != undefined) {
		for (var i = 0; i < domains.length; i++) {
			domainsProvider.push(domains[i]);
		}	
	}
	
	var streams = data.streams;
	if (streams != undefined) {
		for (var i = 0; i < streams.length; i++) {
			streamsProvider.push(streams[i]);
		}	
	}	
}


function saveDocumentData(data) {
	
	var docs = data.docs;
	if (docs != undefined) {
		for (var i = 0; i < docs.length; i++) {
			var docTmp = adoptDocument(docs[i]);
			articlesProvider[docs[i].id] = docTmp;
		}
	}
	
	var streams = data.streams;
	if (streams != undefined) {
		for (var i = 0; i < streams.length; i++) {
			streamsProvider.push(streams[i]);
		}	
	}
	
}


function makeQuery(feedId, page) {
	/*$.ajax({
		  type: 'GET',
		  url: 'http://127.0.0.1/api/1_0/feedTemplates' + 
		  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey(),
		  data: '',
		  dataType: 'json',
		  timeout: AJAX_REQUEST_TIMEOUT,
		  context: $('body'),
		  success: function(data) {
			  alert(data);
		  },
		  error: function(xhr, type){
			  alert(data);
		  }
	});	*/
	
		$.ajax({
		  type: 'POST',
		  url: apiPath + '1_0/queries' + 
		  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey() + '&rand=' + new Date().getTime(),
		  data: '{ '
			 + ' "queries": {					 ' 
			 + ' 	"1234244543": {              ' 
			 + '    	"page": {     			  ' 
			 + '    		"page": ' + curPage + ', 					' 
			 + '        	"size": ' + PAGE_SIZE + ',				 	' 
			 + '        	"sort":	[{"_dateParsed":"DESC"}]	 ' 
			 + '     	},										 '
			 + ' 		"criterias":[],                          ' 
			 + ' 		"feedIds": ["' + feedId + '"]  ' 			 
			 + ' 	}      ' 
			 + ' }		' 
			 + ' }		',
		  dataType: 'json',
		  timeout: AJAX_REQUEST_TIMEOUT,
		  context: $('body'),
		  success: function(data) {
			  saveFeedData(data, feedId);
			  onFeedDataPrepared();
		  },
		  error: function(xhr, type){
			  onFeedDataPrepareError();
			  showErrorScreen();
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

function putFeed(templId) {
	$.ajax({
		  type: 'PUT',
		  url: apiPath + '1_0/feeds' + 
		  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey() + '&rand=' + new Date().getTime(),
		  data: '{ '
			 +' "feeds": [  '
			 +'         {   '
			 +'           "status": "FEED_ENABLED",                     '
			 +'           "query": {                                    ' 
			 +'             "templateId": "' + templId + '"		   		'
			 //+'             "criteriaIds": ["53e4d24e975a771e6168e95f"] '
			 +'           } '
			 +'         } '
			 +'       ]  '
			 +'     }',
		  dataType: 'json',
		  timeout: AJAX_REQUEST_TIMEOUT,
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
			  showErrorScreen();
		  }
	});


}


function getFeeds() {
	$.ajax({
	  type: 'GET',
	  url: apiPath + '1_0/feeds' + 
	  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey() + '&rand=' + new Date().getTime(),
	  data: '',
	  dataType: 'json',
	  timeout: AJAX_REQUEST_TIMEOUT,
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
	  error: function(xhr, type) {
		 onHasNoFeed();
		  showErrorScreen();
	  }
	});
}

function getDocument(docId) {
	$.ajax({
	  type: 'GET',
	  url: apiPath + '1_0/docs/' + docId + 
	  '?myNewsSessionId=' + getSessionId() + '&myNewsSessionKey=' + getSessionKey() + '&rand=' + new Date().getTime(),
	  data: '',
	  dataType: 'json',
	  timeout: AJAX_REQUEST_TIMEOUT,
	  context: $('body'),
	  success: function(data) {
		  saveDocumentData(data);
		  onDocumentDataPrepared(docId);
	  },
	  error: function(xhr, type){
		  onDocumentDataError(docId);
		  showErrorScreen();
	  }
	});
}