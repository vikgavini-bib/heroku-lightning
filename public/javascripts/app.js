
function forceInit() {
	console.log('LOGIN INIT >');
	console.log('CONFIG >'+JSON.stringify(config));
	force.init(config);
};

function forceLogin(key) {
	console.log('LOGIN INIT KEY >'+key);
	forceInit();
	force.login(function(success) {
		var oauth = force.getOauth();
		setupLightning();
	});	
}

var _lightningReady = false;

function setupLightning(callback) {
	var appName = config.loApp;
	var oauth = force.getOauth();
	console.log('AUTH >'+oauth);
    if (!oauth) {
        alert("Please login to Salesforce.com first!");
        return;
    }

	if (_lightningReady) {
		if (typeof callback === "function") {
			callback();
		}
	} else {
	    // Transform the URL for Lightning
	    var url = oauth.instanceUrl.replace("my.salesforce", "lightning.force");

	    $Lightning.use(appName, 
	        function() {
				_lightningReady = true;
				document.getElementById("chatterFeedButton").style.display = "";
				if (typeof callback === "function") {
					callback();
				}
	        }, url, oauth.access_token);
	}
}

function createChatterFeed(type, subjectId) {
    setupLightning(function() {
		$Lightning.createComponent("forceChatter:feed", {type: type, subjectId: subjectId}, "chatterFeed"); 
    });
}
