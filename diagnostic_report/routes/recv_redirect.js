/* author: Bowen */
var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var configs = require('../controllers/configs.js')
var query = require('querystring');
var request = require('request');

/* GET users listing. */

router.get('/', function(req, res, next){
	var code = req.query.code;
	console.log(code);
	var post_data = {
		'code':code,
		'client_id': configs.client_id,
		'redirect_uri': configs.redirect_uri,
		'grant_type': 'authorization_code'
	};
	send_request(post_data, req, res);
	/*
	requestify.post('http://genomics-advisor.smartplatforms.org:5000/auth/token', {
		'code':code,
		'client_id': configs.client_id,
		'client_secret' : configs.client_secret,
		'grant_type': 'authorization_code'
	}).then(function(response){
		console.log(response.getBody());
		req.session.access_token = response.getBody().access_token;
		res.redirect('/');
	}).fail(function(error){
		console.log(error);
	});
*/
});

function send_request(datas, req, res){
	var opt = {
		method:'POST',
		url: 'http://genomics-advisor.smartplatforms.org:2048/auth/token',
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			"Content-Length" : datas.length
		},
		form:datas
	};
	request(opt, function(error, response, body){
		if (!error && response.statusCode < 500){
			req.session.access_token = JSON.parse(body).access_token;
			console.log(body);
			res.redirect('/');
		}else{
			res.redirect('/req_genomics_auth/');
		}
	});
}

module.exports = router;
