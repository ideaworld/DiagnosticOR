var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json(get_lab_orders());
});

module.exports = router;

var data = [
{'name': 'Test1', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'registered'},
{'name': 'Test2', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'partial'},
{'name': 'Test3', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'final'},
{'name': 'Test4', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'corrected'},
{'name': 'Test5', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'appended'},
{'name': 'Test6', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'cancelled'},
{'name': 'Test7', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'entered-in-error'},
]

function get_lab_orders(){
	return data;
}
