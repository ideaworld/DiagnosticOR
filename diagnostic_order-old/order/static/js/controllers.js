var DRController = angular.module('DRController', []);

DRController.controller('defaultCtrl', [function(){}]);

DRController.controller('MainListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.orders = [];
	$scope.reports = [];
	$scope.set_order = function(data){
		$scope.orders = data;
	}
}]);



function get_page_data($scope){
	var infos = {
		category: $scope.category,
		code:$scope.code,
		encounter:$scope.encounter,
		subject:$scope.subject,
		performer:$scope.performer,
		effective:$scope.effective,
		issued:$scope.issued,
		specimen:$scope.specimen,
		observation:$scope.observation_list,
		conclusion:$scope.conclusion,
		status:$scope.new_status,
	}
	return infos;
}

DRController.controller('NewOrdCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.submit = function(id){
		var post_data = form_report_json(get_page_data($scope));
		var req = {
			method:'POST',
			url:'/datas/update_report',
			data: {
				report:post_data,
				id:id
			}
		}
		$http(req).then(function(result){
			show_msg('Success');
		});
	}
}]);

function form_report_json(info){
	var res_json = {
		'resourceType':'DiagnosticReport',
		'text':{
			'status':'generated',
			'div': form_div(info),
		},
		'contained':get_observation(info),
		'status':info.status,
		'subject':{
			'reference':info.subject,
			'display':''
		},
		'effectiveDateTime':info.effective,
		'issued':info.issued,
		'performer':{
			'reference':info.performer,
			'display':''
		},
		'specimen':[{
			'reference':info.specimen,
			'display':''
		}],
		'result': get_result(info)
	}
	return res_json;
}


function set_order_data(data){
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	mid_scope.set_order(data);
}



DRController.controller('left_panel', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.order_flag = false;
	$scope.report_flag = false;
	$scope.toggle_order = function(){
		FHIR.oauth2.ready(onReady, onError);
		function onError(){
	            console.log("Loading error", arguments);
	        };

        function onReady(smart){
            // Load up the patient from SMART
            // Note: we use DI to inject the patient model ($dmPatient) into the view models within the start method
            console.log('hello');
            smart.user.api.fetchAll({type:'DiagnosticOrder' }).done(function(dr){
            	console.log(dr);
            })
        };
		$scope.order_flag = !$scope.order_flag;
	}
	$scope.get_all_orders = function() {
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		});
		$location.path('#/')
	}
	$scope.get_na_orders = function() {
		$http.get('/orders').success( function(data) {
			set_order_data(data)
		})
	}
	$scope.get_ac_orders = function() {
		console.log("2333");
		$http.get('/orders').success( function(data) {
			console.log("2333");
			set_order_data(data);
		})
	}
	$scope.get_rj_orders = function(){
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		})
	}
	$scope.create_new_order = function(){
	}
}]);
