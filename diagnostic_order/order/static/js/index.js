var diagnostic_order_app = angular.module('diagnostic_order', ['ngRoute', 'DRController']);

diagnostic_order_app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/fhir-app/tmp/main.html',
		controller: 'MainListCtrl'
	}).when('/order/:order_id', {
		templateUrl: '/fhir-app/tmp/order_detail.html',
		controller: 'OrderCtrl'
	}).when('/new_order', {
		templateUrl: '/fhir-app/tmp/new_order.html',
		controller: 'NewOrdCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);