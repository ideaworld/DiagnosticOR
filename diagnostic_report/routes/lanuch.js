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
	else if(!req.session || !req.session.clinical_access_token){
  	get_clinical_auth(req, res);
  	console.log('clinical');
  }else{
    // page will be redirected to index page after all authorization
		res.render('launch.html', {});
	}
});

function get_clinical_auth(req, res){
	var client_id = config.clinical_client_id;
	var serviceUri = req.query.iss;
	var launchContextId = req.query.launch;
	var scope = ['user/*.*'].join(' ');
	var launchUri = config.clinical_launch_uri;
	var redirectUri = config.clinical_redirect_uri;
	var auth_uri = config.clinical_auth_uri;
	var auth_info = {'authorize_uri':auth_uri};
	requestify.get(serviceUri+'/metadata', {
		headers:{
			'Accept': 'application/json'
		}
	}).then(function(response){
		var metadata = response.getBody();
		var security = metadata.rest[0].security;
		console.log('extracting information');
		// get auth info
		if(security && security.extension){
			console.log('security object valid');
			for(var index in security.extension){
				var e = security.extension[index];
				if (e.url === 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris'){
					if ( e.extension ){
            for (var subindex in e.extension){
							var ee = e.extension[subindex];
							if('token' == ee.url){
								auth_info['token_url'] = ee.valueUri;
							}else if('authorize' == ee.url){
								auth_info['authorize_uri'] = ee.valueUri;
							}else if('register' == ee.url){
								auth_info['registration_uri'] = ee.valueUri;
							}
						}
					}
				}else if("http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris#register" == e.url){
					auth_info['registration_uri'] = e.valueUri;
				}else if("http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris#authorize" == e.url){
					auth_info['authorize_uri'] = e.valueUri;
				}else if('http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris#token' == e.url){
					auth_info['token_url'] = e.valueUri;
				}
			}
			req.session['auth_infos'] = auth_info;
			req.session.save(function(){});
			console.log('auth information exteacted');
			console.log(auth_info);
			var url = auth_info['authorize_uri'] + '?' +
				"response_type=code&" +
		        "client_id=" + encodeURIComponent(client_id) + "&" +
		        "scope=" + encodeURIComponent(scope) + "&" +
		        "redirect_uri=" + encodeURIComponent(redirectUri) + "&" +
		        "aud=" + encodeURIComponent(serviceUri) + "&" +
		        "launch=" + launchContextId + "&" +
		        "state=" + Math.round(Math.random()*100000000).toString();
			console.log(url);
			console.log('res start');
			res.redirect(url);
			console.log('res end');
		}else{
			console.log('authorize failure');

			res.send('authorize failure, please relaunch the app');
		}
	});



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
