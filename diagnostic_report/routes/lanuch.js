/* author: Bowen */
var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth.js');
var config = require('../controllers/configs.js');
var requestify = require('requestify');


router.get('/', function(req, res, next) {
	req.session.iss = req.query.iss;
	req.session.launch = req.query.launch;
    //console.log('genomics?');
    //request genomics authorization jump for a test purpose
    if((!req.session || !req.session.access_token) && !req.session.jump_genomics){
        res.redirect('/req_genomics_auth/');
    }
    //request clinical authorization
	if(!req.session || !req.session.clinical_access_token){
        get_clinical_auth(req, res);
        console.log('clinical');
    }
    if(req.session && req.session.access_token && req.session.clinical_access_token){
        res.redirect('/')
    }
    // page will be redirected to index page after all authorization
    
	res.render('launch.html', {});
});

function get_clinical_auth(req, res){
	var client_id = config.clinical_client_id;
	var serviceUri = req.query.iss;
	var launchContextId = req.query.launch;
	var scope = ['patient/*.read', 'user/*.read', 'user/*.*'].join(' ');
	var launchUri = 'http://localhost:8000/fhir-app/launch.html';
	var redirectUri = 'http://localhost:8000/';
	res.redirect(config.clinical_auth_uri + '?' +
		"response_type=code&" +
        "client_id=" + encodeURIComponent(client_id) + "&" +
        "scope=" + encodeURIComponent(scope) + "&" +
        "redirect_uri=" + encodeURIComponent(redirectUri) + "&" +
        "aud=" + encodeURIComponent(serviceUri) + "&" +
        "launch=" + launchContextId + "&" +
        "state=" + Math.round(Math.random()*100000000).toString());
            /*
	$.get(conformanceUri, function(r){
		var authUri, tokenUri;
		var smartExtension = r.rest[0].security.extension.filter(function (e) {
           return (e.url === "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris");
        });

        smartExtension[0].extension.forEach(function(arg, index, array){
          if (arg.url === "authorize") {
            authUri = arg.valueUri;
          } else if (arg.url === "token") {
            tokenUri = arg.valueUri;
          }
        });
        req.session.clinical_serviceUri = serviceUri;
        req.session.clinical_tokenUri = tokenUri;
        res.redirect(authUri + '?' +
        	"response_type=code&" +
            "client_id=" + encodeURIComponent(client_id) + "&" +
            "scope=" + encodeURIComponent(scope) + "&" +
            "redirect_uri=" + encodeURIComponent(redirectUri) + "&" +
            "aud=" + encodeURIComponent(serviceUri) + "&" +
            "launch=" + launchContextId);
	}, 'json');
*/
}

module.exports = router;
