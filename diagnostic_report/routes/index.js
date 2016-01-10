/* author: Bowen */
var express = require('express');
var router = express.Router();
var config = require('../controllers/configs.js');
var request = require('request');
var requestify = require('requestify');
var mkFhir = require('fhir.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session || !req.session.access_token ){
		res.redirect('/req_genomics_auth/');
	}
	
	
	console.log('h');
  res.render('index.html', {});
});

function get_clinical_token(req, res){
	var code = req.query.code;
	console.log(code);
	var token_uri = config.clinical_token_uri;
	var client_id = config.clinical_client_id;
	var redirect_uri = config.clinical_redirect_uri;
	var datas = {
		code:code,
		grant_type: 'authorization_code',
		redirect_uri: redirect_uri,
	}
	console.log(req.session.clinical_basic);
	var opt = {
		method:'POST',
		url: token_uri,
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			"Content-Length" : datas.length,
			'Authorization': 'Basic ' + req.session.clinical_basic
		},
		form:datas
	};
	request(opt, function(error, response, body){
		if (!error && response.statusCode < 500){
			console.log(body);
			return JSON.parse(body).access_token;
		}else{
			console.log(error);
			res.redirect('/fhir-app/launch.html?iss=' + encodeURIComponent(req.session.iss) + '&launch='+req.session.launch);
		}
	});
}

module.exports = router;
