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

router.get('/new_order.html', function(req, res, next) {
	res.render('new_order.html', {});
})

module.exports = router;
