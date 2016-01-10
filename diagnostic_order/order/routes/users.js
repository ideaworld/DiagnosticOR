var express = require('express');
var router = express.Router();
var orders = require('../controllers/order_process')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('User')
});

module.exports = router;
