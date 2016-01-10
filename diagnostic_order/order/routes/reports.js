var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json(get_lab_orders());
});

module.exports = router;

var data = [
{'name': 'Test1', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'Registered'},
{'name': 'Test2', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'Partial'},
{'name': 'Test3', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'Final'},
{'name': 'Test4', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'Corrected'},
{'name': 'Test5', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'Appended'},
{'name': 'Test6', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'Cancelled'},
{'name': 'Test7', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'Entered-in-error'},
]

function get_lab_orders(){
	return data;
}
