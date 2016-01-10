/* author: Bowen */
var express = require('express');
var configs = require('../controllers/configs.js')
var router = express.Router();
var util = require('util');
var config = require('../controllers/configs.js');

router.get('/', function(req, res, next) {
	console.log("hello");

	var redirect_args = 'scope=user%2Fobservationforgenetics.write+user%2Fobservationforgenetics.read+user%2Forderforgenetics.write+user%2Freportforgenetics.read+user%2Freportforgenetics.write+user%2Forderforgenetics.read+user%2FSequence.read+user%2FObservation.read+user%2FObservation.writeuser%2FCondition.read+user%2FPatient.read+user%2FProcedure.read+patient%2FObservation.read&redirect_uri=http%3A%2F%2Flocalhost%3A8001%2Frecv_redirect%2F&response_type=code&client_id='+ config.client_id;
	//var redirect_args = util.format('scope=%s&client_id=%s&response_type=code', configs.genomic_scope , configs.client_id);
	res.redirect('http://localhost:2048/auth/authorize?' + redirect_args);
});

module.exports = router;
