/* author: Bowen */
var express = require('express');
var configs = require('../controllers/configs.js')
var router = express.Router();
var util = require('util');

router.get('/', function(req, res, next) {
	console.log('authing');
	// var redirect_args = 'scope=user%2FSequence.write+user%2FBundle.write+user%2FPractitioner.write+user%2FPractitioner.read+user%2Fobservationforgenetics.write+user%2Fobservationforgenetics.read+user%2Forderforgenetics.write+user%2Freportforgenetics.read+user%2Freportforgenetics.write+user%2Forderforgenetics.read+user%2FSequence.read+user%2FObservation.read+user%2FObservation.writeuser%2FCondition.read+user%2FPatient.read+user%2FProcedure.read+patient%2FObservation.read&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Frecv_redirect%2F&response_type=code&client_id='+ configs.client_id;
	var redirect_args = 'http://genomics-advisor.smartplatforms.org:2048/auth/authorize?scope=user%2FPatient.read+user%2FPatient.write+user%2FDevice.read+user%2FDevice.write+user%2FEncounter.read+user%2FEncounter.write+user%2FImagingStudy.read+user%2FImagingStudy.write+user%2FMedia.read+user%2FMedia.write+user%2FObservation.read+user%2FObservation.write+user%2FPractitioner.read+user%2FPractitioner.write+user%2FProvenance.read+user%2FProvenance.write+user%2FSpecimen.read+user%2FSpecimen.write+user%2FDiagnosticRequest.read+user%2FDiagnosticRequest.write+user%2FSequence.read+user%2FSequence.write+user%2FFamilyMemberHistory.read+user%2FFamilyMemberHistory.write+user%2FDiagnosticReport.read+user%2FDiagnosticReport.write&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Frecv_redirect%2F&response_type=code&client_id=5c96059f-788d-411e-bdfa-4de8f69ffbd8';
	//var redirect_args = util.format('scope=%s&client_id=%s&response_type=code', configs.genomic_scope , configs.client_id);
	// res.redirect('http://genomics-advisor.smartplatforms.org:2048/auth/authorize?' + redirect_args);
	res.redirect(redirect_args);
});

module.exports = router;


//http://genomics-advisor.smartplatforms.org:2048/auth/authorize?scope=user%2FSequence.read+user%2FPatient.read+user%2FSequence.write+user%2FObservation.read+user%2FSpecimen.read+user%2FPractitioner.read+user%2FOrder.read+user%2FOrder.write+user%2Forderforgenetics.read+user%2Forderforgenetics.write+user%2Fobservationforgenetics.read+user%2Fobservationforgenetics.write+user%2FEncounter.read+user%2FOrganization.read&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Frecv_redirect%2F&response_type=code&client_id=1616ac36-0e85-4b81-89be-b5922bd7247b
