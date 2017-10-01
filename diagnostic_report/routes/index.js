/* author: Bowen */
var express = require('express');
var router = express.Router();
var config = require('../controllers/configs.js');
var request = require('request');
var requestify = require('requestify');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.session.code) {
		getCode(req, res);
	}
	if(!req.session.clinical_access_token){
		get_clinical_token(req, res);
	}
  res.render('index.html', {});
});

function getCode(req, res) {
	const data = {
		'response_type': 'code',
		'client_id': config.clinical_client_id,
		'redirect_uri': config.clinical_redirect_uri,
	}
	const opt = {
		method:'GET',
		url: config.clinical_auth_uri,
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			"Content-Length" : data.length,
		},
		form:data
	};

	request(opt, function(err, res, body) {
		console.log(body);
	})
}

function get_clinical_token(req, res){
	var code = req.query.code;
	var state = req.query.state;
	var token_uri = req.session.auth_infos['token_url'] ? req.session.auth_infos['token_url'] : config.clinical_token_uri;
	var client_id = config.clinical_client_id;
	var redirect_uri = config.clinical_redirect_uri;
	var datas = {
		'code':code,
		'grant_type': 'authorization_code',
		'redirect_uri': redirect_uri,
		'client_id': client_id,
		'state':state
	}
	var opt = {
		method:'POST',
		url: token_uri,
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			"Content-Length" : datas.length,
		},
		form:datas
	};
	request(opt, function(error, response, body){
		if (!error && response.statusCode < 500){
			req.session.clinical_token = JSON.parse(body).access_token;
			req.session.save(function(){});
		}else{
			console.log(error);
			res.redirect('/fhir-app/launch.html?iss=' + encodeURIComponent(req.session.iss) + '&launch='+req.session.launch);
		}
	});
}

module.exports = router;
