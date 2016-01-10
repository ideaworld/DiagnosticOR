/* author: Bowen */
var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var config = require('../controllers/configs.js')
var query = require('querystring');
var request = require('request');

router.get('/', function(req, res, next){
  var code = req.query.code;
  var token_uri = config.clinical_token_uri;
	var redirect_uri = config.clinical_redirect_uri;
	var datas = {
		code:code,
		grant_type: 'authorization_code',
		redirect_uri: redirect_uri,
	}
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
			req.session.clinical_access_token = JSON.parse(body).access_token;
      res.redirect('/');
		}else{
			console.log(error);
			res.redirect('/fhir-app/launch.html?iss=' + encodeURIComponent(req.session.iss) + '&launch='+req.session.launch);
		}
	});
});


module.exports = router;
