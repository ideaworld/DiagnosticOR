/* author: Bowen */
var express = require('express');
var router = express.Router();
var config = require('../controllers/configs.js');
var request = require('request');
var requestify = require('requestify');
var mkFhir = require('fhir.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(!req.session || !req.session.access_token ){
	// 	res.redirect('/req_genomics_auth/');
	// }
	// check genomics authorization
	// check clinical token
	if(!req.session.clinical_access_token){
		console.log('clinical');
		get_clinical_token(req, res);
	}
	console.log('h');
  res.render('index.html', {});
});

function get_clinical_token(req, res){
	//console.log(req);
	var code = req.query.code;
	var state = req.query.state;
	console.log(req.session);
	var token_uri = req.session.auth_infos['token_url'] ? req.session.auth_infos['token_url'] : config.clinical_token_uri;
	console.log(token_uri);
	var client_id = config.clinical_client_id;
	var redirect_uri = config.clinical_redirect_uri;
	var datas = {
		'code':code,
		'grant_type': 'authorization_code',
		'redirect_uri': redirect_uri,
		'client_id': client_id,
		'state':state
	}
	console.log(state);
	var opt = {
		method:'POST',
		url: token_uri,
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			"Content-Length" : datas.length
			//'Authorization': 'Basic ' + state
		},
		form:datas
	};
	request(opt, function(error, response, body){
		if (!error && response.statusCode < 500){
			console.log(body);
			console.log('accessed token print')
			req.session.clinical_token = JSON.parse(body).access_token;
			console.log(req.session.clinical_token);
			console.log(req.session);
			req.session.save(function(){});
		}else{
			console.log(error);
			res.redirect('/fhir-app/launch.html?iss=' + encodeURIComponent(req.session.iss) + '&launch='+req.session.launch);
		}
	});
}

module.exports = router;
