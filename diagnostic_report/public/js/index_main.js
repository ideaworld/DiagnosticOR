var diagnostic_reporter = angular.module('diagnostic_reporter', ['ngRoute', 'DiaReportController','ngMaterial','ngAnimate']);

diagnostic_reporter.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl:'/static/html/default.html',
    controller: 'defaultCtrl'
  }).when('/reports', {
    templateUrl: '/static/html/report_list.html',
    controller: 'rlistCtrl'
  }).when('/orders', {
    templateUrl: '/static/html/order_list.html',
    controller: 'olistCtrl'
  }).otherwise({
    redirectTo: '/'
  });
}]);
