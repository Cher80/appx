var PAGE_SIZE = 10;
var AJAX_REQUEST_TIMEOUT = 3000;

// prod
var PROD_IMAGE_STORE_PATH = "https://image.indexisto.com/download/";
var PROD_API_PATH         = "../../api/";
var PROD_TEMPLATE_ID      = "5422d2ee822ebe60aace3089";

// dev
var DEV_IMAGE_STORE_PATH = "http://image.mynews1.devmail.ru/download/";
var DEV_API_PATH         = "../../api/";
var DEV_TEMPLATE_ID      = "53eccbba975ad62d850d015c";



var imageStorePath 	= PROD_IMAGE_STORE_PATH;
var apiPath 		= PROD_API_PATH;
var templateId 		= PROD_TEMPLATE_ID;

try {
	var host = window.location.host;
	if (host.indexOf('dev') != -1 || host.indexOf('127') != -1) {
		imageStorePath 	= DEV_IMAGE_STORE_PATH;
		apiPath 		= DEV_API_PATH;
		templateId 		= DEV_TEMPLATE_ID;		
	}
} catch (e) {}