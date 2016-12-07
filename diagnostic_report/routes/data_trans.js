/* author: Bowen */
var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var orders = require('../controllers/order_process');
var genomic_api_call = require('../controllers/call_genomic_api.js');
var clinical_api = require('../controllers/clinical_api.js');
var test_data = require('../controllers/test_data.js');
var request = require('request');

router.post('/create_report', function(req, res, next){
  var report_data = req.body.report;
  //var api_url = req.session['iss'];
  genomic_api_call.create('DiagnosticReport', report_data, req.session.access_token, res);
});

router.post('/create_observation', function(req, res, next){
  var report_data = req.body.report;
  genomic_api_call.create('Observation', report_data, req.session.access_token, res);
});

router.get('/all_report', function(req, res, next){
  console.log('get all report');
  var api_url = req.session['iss'];
  console.log(req.session);
  console.log(api_url);
  genomic_api_call.getAll('DiagnosticReport', req.session.access_token, res);
});

router.get('/all', function(req, res, next){
  var type = req.param('type');
  genomic_api_call.getAll(type, req.session.access_token, res);
});

router.get('/all_order', function(req, res, next){
  console.log('get all order');
  genomic_api_call.getAll('DiagnosticRequest' ,req.session.access_token ,res);
});

router.post('/update_report', function(req, res, next){
  var report_data = req.body.report;
  var api_url = req.session.iss;
  var id = req.body.id;
  genomic_api_call.update('DiagnosticReport', id, report_data, req.session.access_token, res)
});

router.post('/update_order', function(req, res, next){
  var req_json = req.body;
  genomic_api_call.update('DiagnosticRequest', req_json.id, req_json.order_data, req.session.access_token, res);
});

router.post('/update_observation', function(req, res, next){
  var req_json = req.body;
  console.log(req_json.order_data);
  genomic_api_call.update('Observation', req_json.id, req_json.order_data, req.session.access_token, res);
});

router.get('/all_observation', function(req, res, next){
  genomic_api_call.getAll('Observation', req.session.access_token, res);
});

router.get('/order', function(req, res, next){

  genomic_api_call.read('DiagnosticRequest', req.query.id, req.session.access_token, res);
});

router.get('/report', function(req, res, next){
  console.log(1);
  var api_url = req.session['iss'];
  console.log(req.session);
  console.log(api_url);
  console.log(2);
  clinical_api.search('DiagnosticReport', {id:''}, req.session.clinical_token, api_url, res);
})

router.get('/Patient', function(req, res, next){
  genomic_api_call.read('Patient',  req.query.id, req.session.access_token, res);
})

router.get('/observationforgenetics', function(req, res, next){
  console.log('+++++++++++++++++++++');
  genomic_api_call.read('Observation', req.query.id, req.session.access_token, res);
})

router.get('/Sequence', function(req, res, next){
  genomic_api_call.read('Sequence', req.query.id, req.session.access_token, res);
})

router.get('/all_Patient', function(req, res, next){
  genomic_api_call.getAll( 'Patient', req.session.access_token, res);
})

router.get('/clinical', function(req, res, next){
  var type = req.param('type');
  console.log(req.session);
  console.log(type);
  var api_url = req.session['iss'];
  console.log(api_url);
  clinical_api.getAll(type, req.session.clinical_token, api_url ,res);
})


router.get('/code', function(req, res, next){
  url = "http://www.genenames.org/cgi-bin/search?search_type=all&search=" + req.query.code + "&submit=Submit";
  console.log(url);
  request(url, function (error, response, body) {
    console.log("@@@@@@@@@@@@@@");
    console.log(error);
    if (!error && response.statusCode == 200) {
      console.log('hehehe');
      res.send(body);
    }
  })
})

module.exports = router;
