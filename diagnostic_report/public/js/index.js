/* author: Bowen */
var diagnostic_report_app = angular.module('diagnostic_report', ['ngRoute', 'DRController']);

diagnostic_report_app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/fhir-app/tmp/main.html',
		controller: 'MainListCtrl'
	}).when('/order/:id', {
		templateUrl: '/fhir-app/tmp/order_detail.html',
		controller: 'OrderCtrl'
	}).when('/report/:report_id', {
		templateUrl: '/fhir-app/tmp/report_detail.html',
		controller: 'ReportCtrl'
	}).when('/edit_report/:id/:report_id/:type', {
		templateUrl:'/fhir-app/tmp/report_edit.html',
		controller: 'EditReportCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);
