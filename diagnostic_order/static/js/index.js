var diagnostic_order = angular.module('diagnostic_order', ['ngRoute', 'DOController','ngMaterial','ngAnimate']);

diagnostic_order.config(['$routeProvider', function($routeProvider){
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
