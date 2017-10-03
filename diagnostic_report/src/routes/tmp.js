/* author: Bowen */
var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next){
	res.send('test');
});

router.get('/main.html', function(req, res, next) {
	res.render('main.html', {});
});

router.get('/order_detail.html', function(req, res, next) {
	res.render('order_detail.html', {});
})

router.get('/report_detail.html', function(req, res, next) {
	res.render('report_detail.html', {});
})

router.get('/report_edit.html', function(req, res, next) {
	res.render('report_edit.html', {});
});

module.exports = router;
