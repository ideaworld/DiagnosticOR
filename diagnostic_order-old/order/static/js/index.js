var diagnostic_order_app = angular.module('diagnostic_order', ['ngRoute', 'DRController']);

diagnostic_order_app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/static/html/default.html',
		controller: 'defaultCtrl'
	}).when('/orders',{
		templateUrl:'/static/html/order_list.html',
		controller:'MainListCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);
