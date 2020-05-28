
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
	console.log('AUTH >'+JSON.stringify(oauth));	
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

	    /*$Lightning.use(appName, 
	        function() {
				_lightningReady = true;
				document.getElementById("chatterFeedButton").style.display = "";
				if (typeof callback === "function") {
					callback();
				}
	        }, url, oauth.access_token);*/
    	$Lightning.use("c:LightningOutAuthenticated",    // name of the Lightning app
        function() {                  // Callback once framework and app loaded
	document.getElementById("showEA").style.display = "";		
        $Lightning.createComponent(
            "c:LightningOutCard", // top-level component of your app
            {
                title: "TEST AUTH",
                contentBody: "BODY_TEST_CONTENT"
            },                  // attributes to set on the component when created
            "lightningLocator",   // the DOM location to insert the component
            function (cmp) {
                // callback when component is created and active on the page
                console.log('Lightning Out App has loaded!');
            }
        );
        },
        'https://pocmobile-sgws.cs97.force.com/myProof',  // Community endpoint
	 oauth.access_token
		       
    );		
	}
}

function showEA() {
    console.log('Render EA');
    $Lightning.use("c:LightningOutAuthenticated",    // name of the Lightning app
        function() {                  // Callback once framework and app loaded
        $Lightning.createComponent(
            "c:LightningOutCard", // top-level component of your app
            {
                title: "TEST AUTH",
                contentBody: "BODY_TEST_CONTENT"
            },                  // attributes to set on the component when created
            "lightningLocator",   // the DOM location to insert the component
            function (cmp) {
                // callback when component is created and active on the page
                console.log('Lightning Out App has loaded!');
            }
        );
        },
        'https://pocmobile-sgws.cs97.force.com/myProof'  // Community endpoint
    );	
}

function createChatterFeed(type, subjectId) {
    setupLightning(function() {
		$Lightning.createComponent("forceChatter:feed", {type: type, subjectId: subjectId}, "chatterFeed"); 
    });
}
