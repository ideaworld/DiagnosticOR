/* author: Bowen */
var express = require('express');
var router = express.Router();
var config = require('../controllers/configs.js');
var request = require('request');
var requestify = require('requestify');
var path = require('path');

import superagent from 'superagent';

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log('111');
	if (!req.session.code) {
		getCode(req, res);
	}
	// if(!req.session.clinical_access_token){
	// 	get_clinical_token(req, res);
	// }
	// res.sendfile('src/views/index.html');
});

function getCode(req, res) {
	const data = {
		'response_type': 'code',
		'client_id': config.clinical_client_id,
		'redirect_uri': config.clinical_redirect_uri,
		'scope': 'user/List.*'
	}

	console.log('querys', data);
	superagent.get('http://guidance.site:3000/api/oauth/authorize?response_type=code&client_id=b66eb22c-88aa-4d20-8894-4dadf31e2b24&redirect_uri=http://localhost:8101/redirect/&scope=user/Patient.*+user/Subscription.*')
		.end((request) => {
			console.log('dsdf', request);
			get_clinical_token(request, res);
		});
}

function get_clinical_token(req, res){
	var code = req.query.code;
	var state = req.query.state;
	var token_uri = req.session.auth_infos && req.session.auth_infos['token_url'] ? req.session.auth_infos['token_url'] : config.clinical_token_uri;
	var client_id = config.clinical_client_id;
	var redirect_uri = config.clinical_redirect_uri;

	var datas = {
		'code':code,
		'grant_type': 'authorization_code',
		'redirect_uri': redirect_uri,
		'client_id': client_id,
		'state':state
	}
	console.log(datas);
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
