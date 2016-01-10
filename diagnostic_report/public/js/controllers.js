/* author: Bowen */
var DRController = angular.module('DRController', []);

var report = {
  resourceType: 'reportforgenetics',
	extension:[
		{
			url: "http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsFamilyMemberHistory",
			valueReference: {
            "reference": "FamilyMemberHistory/11"
          	}
		},
		{
			url: "http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsFamilyMemberHistory",
			valueReference: {
            "reference": "FamilyMemberHistory/12"
          	}
		},
		{
			url: "http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsFamilyMemberHistory",
			valueReference: {
            "reference": "FamilyMemberHistory/13"
          	}
		},
	],
  status: 'partial',
  category: {
    coding: [
      {
        system: 'http://hl7.org/fhir/v2/0074',
        code: 15220000,
        display: 'Laboratory test'
      }
    ]
  },
  code: {
    coding: [
      {
        system: 'http://loinc.org',
        code: '49874-1',
        display: 'ABCB4 gene mutation analysis'
      }
    ]
  },
  subject: {
    reference: 'Patient/genetics-example2',
  },
  effectiveDateTime: '2014-03-04T08:30:00+11:00',
  issued: '2014-05-16T10:28:00+01:00',
  performer: {
    reference: 'Practitioner/genetics-example2',
  },
  specimen: [
    {
      reference: "Specimen/genetics-example2",
    }
  ],
  result: [
    {
      reference: 'Observation/od-1',
      display: 'Genetic analysis master panel for ABCB4 -variant1'
    },
    {
      reference: 'Observation/od-2',
      display: 'Genetic analysis master panel for ABCB4 -variant2'
    },
    {
      reference: 'Observation/od-3',
      display: 'Genetic analysis master panel for ABCB4 -variant3'
    },
    {
      reference: 'Observation/od-4',
      display: 'Genetic analysis master panel for ABCB4 -variant4'
    }
  ]
}

var category_dict = {
	'AU': 'Audiology',
	'BG': 'Blood Gases',
	'BLB': 'Blood Bank',
	'CG': 'Cytogenetics',
	'CH': 'Chemistry',
	'CP': 'Cytopathology',
	'CT': 'CAT Scan',
	'CTH': 'Cardiac Catheterization',
	'CUS': 'Cardiac Ultrasound',
	'EC': 'Electrocardiac (e.g. EKG, EEC, Holter)',
	'EN': 'Electroneuro (EEG, EMG,EP,PSG)',
	'GE': 'Genetics',
	'HM': 'Hematology',
	'ICU': 'Bedside ICU Monitoring',
	'IMG': 'Diagnostic Imaging',
	'IMM': 'Immunology',
	'LAB': 'Laboratory',
	'MB': 'Microbiology',
	'MCB': 'Mycobacteriology',
	'MYC': 'Mycology',
	'NMR': 'Nuclear Magnetic Resonance',
	'NMS': 'Nuclear Medicine Scan',
	'NRS': 'Nursing Service Measures',
	'OSL': 'Outside Lab',
	'OT': 'Occupational Therapy',
	'OTH': 'Other',
	'OUS': 'OB Ultrasound',
	'PAR': 'Parasitology',
	'PAT': 'Pathology (gross & histopath, not surgical)',
	'PF': 'Pulmonary Function',
	'PHR': 'Pharmacy',
	'PHY': 'Physician (Hx. Dx, admission note, etc.)',
	'PT': 'Physical Therapy',
	'RAD': 'Radiology',
	'RC': 'Respiratory Care (therapy)',
	'RT': 'Radiation Therapy',
	'RUS': 'Radiology Ultrasound',
	'RX': 'Radiograph',
	'SP': 'Surgical Pathology',
	'SR': 'Serology',
	'TX': 'Toxicology',
	'URN': 'Urinalysis',
	'VR': 'Virology',
	'VUS': 'Vascular Ultrasound',
	'XRC': 'Cineradiograph'
}


DRController.controller('MainListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.orders = [];
	$scope.reports = [];
	$scope.set_order = function(data){
		$scope.orders = data;
	}
	$scope.set_report = function(data){
		$scope.reports = data;
	}
}]);

function set_order_data(data){
	var orders = data.entry;
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	var datas = [];
	for(var i = 0; i < orders.length; i++){
		var id = orders[i].id;	
		id = id.substring(id.indexOf("orderforgenetics")+"orderforgenetics".length + 1);
		
		var orderer = orders[i].content.orderer.reference;
		var updated = orders[i].updated;
		var status = orders[i].content.status;
		var d = {orderer:orderer, status:status, updated:updated, id:id};
		datas.push(d);
	}
	orders = datas;
	mid_scope.set_order(orders);
}

function set_report_data(data){
	var reports = data.entry;
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	var datas = [];
	for(var i = 0; i < reports.length; i++){
		var id = reports[i].id;	
		id = id.substring(id.indexOf("reportforgenetics")+"reportforgenetics".length + 1);
		var performer = reports[i].content.performer.reference;
		var issued = reports[i].content.issued;
		var status = reports[i].content.status;
		var d = {performer:performer, status:status, issued:issued, id:id};
		datas.push(d);
	}
	reports = datas;
	mid_scope.set_report(reports);
}

DRController.controller('left_panel', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.order_flag = false;
	$scope.report_flag = false;
	$scope.toggle_order = function(){
		$http.get('/users').success(function(data){
			console.log(data);
		})
		$scope.order_flag = !$scope.order_flag;
	}
	$scope.toggle_report = function() {
		$scope.report_flag = !$scope.report_flag;
	}
	$scope.get_all_orders = function() {
		$location.path('#/');
		console.log("hello_all_order");
		$http.get('/datas/all_order').success( function(data) {
			set_order_data(data);
		});
	$scope.go_edit = function() {
		$location.path('#/edit_report/:1');
	}
	}
	$scope.get_na_orders = function() {
		$location.path('#/');
		$http.get('/orders').success( function(data) {
			set_order_data(data)
		});
	}
	$scope.get_ac_orders = function() {
		$location.path('#/');
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		});
	}
	$scope.get_rj_orders = function(){
		$location.path('#/');
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		});
	}
	$scope.get_report = function(){
		$location.path('#/');
		$http.get('/datas/all_report').success( function(data) {
			console.log(data);
			set_report_data(data);
		});
	}
}]);

DRController.controller('ReportCtrl', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route) {
	console.log('repor');
	$scope.report_id = $route.current.params.report_id;
	console.log($route);
	console.log($scope.report_id);
	$http.get('/datas/report?id='+$scope.report_id).success(function(data){
		console.log(data);
		$scope.reports =data;
		family = new Array;
		family.push('Q2342X (7252C>T) BRCA2');
		family.push('R315G (1062A>G) BRCA1');
		family.push('IVS15+3A>G BRCA1');
        $scope.add_obs = data.extension.length;

		for (var i = 0; i < data.extension.length; i++){
			console.log(data.extension[i].valueReference.reference);
			if (data.extension[i].url == 'http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsFamilyMemberHistory'){
				console.log(data.extension[i].valueReference.reference);
				//family.push(data.extension[i].valueReference.reference);
			}
		}
		$scope.families = family;
		var name, id;
		name = get_name(data.subject.reference);
		id = get_id(data.subject.reference);
		$http.get('/datas/'+ name  + '?id=' +id).success(function(data){
			$scope.subject = data.name[0].text
		});

		$scope.observation_list = new Array;

		for (var r in data.result){
			var name = get_name(data.result[r].reference);
			var id = get_id(data.result[r].reference);
			var display = data.result[r].display;
			$http.get('/datas/'+name +"?id=" + id).success(function(data){
				for (var e in data.extension){
					if (data.extension[e].url == 'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence'){
						var url = data.extension[e].valueReference.reference;
						var _id = get_id(url);
						var name = get_name(url);
						$http.get('/datas/'+name +"?id=" + _id).success(function(data){
							var sequence = data.text.div;
							sequence = sequence.substring(5, sequence.length-6);
							var var_id = sequence.substring(sequence.indexOf(" of ")+4, sequence.indexOf("is "));
							sequence = sequence.substring(sequence.indexOf("is ")+3);	
							sequence = "Variation ID: "+ var_id + "(Genotype:" + sequence + ")";
							
							$scope.observation_list.push({'sequence':sequence, 'display':display});
						});
					}
				}
			});
		}
		console.log($scope.observation_list);
	})
	$scope.go_index = function() {
		$location.path('#/');
	}
	$scope.show_obs_detail = function() {
		console.log('clicked');
	}
}]);

function get_page_data($scope){
	var infos = {
		category: $scope.category,
		code:$scope.code,
		code_system: $scope.code_system,
		code_display: $scope.code_display,
		encounter:$scope.encounter,
		subject:$scope.subject,
		performer:$scope.performer,
		effective:$scope.effective,
		issued:$scope.issued,
		specimen:$scope.specimen,
		observation:$scope.observation_list,
		conclusion:$scope.conclusion,
		status:'partial',
	}
	return infos;
}

function form_div(info){
	return '<div><p><b>Generated Narrative with Details</b></p><p><b>id</b></p>'+
	'<p><b>contained</b>: , , , , </p>'+
	'<p><b>status</b>: '+info.status+'</p>'+
	'<p><b>category</b>:' + info.category + '</p>'+
	'<p><b>code</b>: ' + info.code + '</p>'+
	'<p><b>subject</b>: <a>'+info.subject+'</a></p>' +
	'<p><b>effective</b>:'+info.effective+'</p>'
  '<p><b>issued</b>: '+info.issued+'</p>'
  '<p><b>performer</b>: '+info.performer+'</a></p>'
  '<p><b>specimen</b>: '+info.specimen+'</p>';
}


function form_report_json(info, order_id){
	console.log(info);
	report.category.coding[0].code = info.category;
	report.category.coding[0].display = category_dict[info.category];
	report.code.coding[0].code = info.code;
	report.code.coding[0].system = info.code_system;
	report.code.coding[0].display = info.code_display;
	report.subject.reference = info.subject;
	report.subject.display = '';
	//report.performer.reference = info.performer;
	report.performer.reference = 'Organization/123456'
	report.performer.display = '';
	report.effectiveDateTime = info.effective;
	report.issued = info.issued;
	report.specimen.reference = info.specimen;
	report.conclusion = info.conclusion;
	//report.result = get_result(info);
	return report;
}
function get_name(str){
	return str.substring(0,str.indexOf("/"));
}

function get_id(str){
	return str.substring(str.indexOf("/")+1);
}

DRController.controller('OrderCtrl', ['$scope','$http', '$route', function($scope, $http, $route){
	$scope.id = $route.current.params.id;
	console.log($scope.id);

	var init = function(){
	  $http.get('/datas/order?id=' + $scope.id).success(function(data){
		$scope.order = data;
		console.log(data);
      	for (var i = 0; i < data.reason.length; i++){
        	console.log(data.reason[i].text);
        	$scope.r = data.reason[i].text;
        	$scope.list = ['hello','world'];
      	}

      	var name, id;
		name = get_name(data.subject.reference);
		id = get_id(data.subject.reference);
		$http.get('/datas/'+ name  + '?id=' +id).success(function(data){
			$scope.subject = data.name[0].text
		});

		var extension_list = new Array();
		for (var e in data.extension){
			var code, sequence, seq;
			for (var s in data.extension[e].extension){

				if (data.extension[e].extension[s].url == 'code'){
					code = data.extension[e].extension[s].valueCodeableConcept.coding[0].display
				}
				if (data.extension[e].extension[s].url == 'obsForSequence' && data.extension[e].extension[s].valueReference.reference != ''){
					var id = data.extension[e].extension[s].valueReference.reference;
					var name = get_name(id);
					id = get_id(id);
					//var c= code;
					$http.get('/datas/'+name +"?id=" + id).success(function(data){
						for (var e in data.extension){
							if (data.extension[e].url == 'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence'){
								var url = data.extension[e].valueReference.reference;
								var _id = get_id(url);
								var name = get_name(url);
								$http.get('/datas/'+name +"?id=" + _id).success(function(data){
									sequence = data.text.div;
									sequence = sequence.substring(5,sequence.length-6);
									var var_id = sequence.substring(sequence.indexOf(" of ")+4, sequence.indexOf("is "));
									sequence = sequence.substring(sequence.indexOf("is ")+3);	
									sequence = "Variation ID: "+ var_id + "(Genotype:" + sequence + ")";
									extension_list.push({'sequence' : sequence,'code' : code});
								})
							}
						}
					})
					seq = sequence;
				}
				
			}
		}
		console.log(extension_list);
		$scope.extension_list = extension_list;

	});
	}
	init();
}]);

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour <= 9){
      hour = "0" + hour;
    }
    if (minute <= 9){
      minute = "0" + minute;
    }
    if (second <= 9){
      second = "0" + second;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + "T" + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}

DRController.controller('EditReportCtrl', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route) {
	$scope.order_id = $route.current.params.id;
	$scope.report_id = $route.current.params.report_id;
	$scope.type = $route.current.params.type;
	$scope.family_members = ['Q2342X (7252C>T) BRCA2','R315G (1062A>G) BRCA1', 'IVS15+3A>G BRCA1']
	$scope.addfamily_member = []
	if ( $scope.type == '0' ){
		$http.get('/datas/order?id='+$scope.order_id).success(function(data){
			data.id="http://localhost:2048/api/orderforgenetics/" + $scope.order_id;
			update_order(data, 'in-progress');
		});
	}else{
		$http.get('/datas/report?id='+$scope.report_id).success(function(data){
			$scope.report_data = data;
			set_report_form_all(data);
		});
	}

	var set_report_form_all = function(data){
		console.log(data);
		$scope.category = data.category.coding[0].code;
		$scope.code = data.code.coding[0].code;
		$scope.effective = data.effectiveDateTime;
		$scope.issued = data.issued;
		$scope.performer = data.performer.reference;
		$scope.specimen = data.specimen[0].reference;
		$scope.subject = data.subject.reference;
		$scope.conclusion = data.conclusion;
	}
	var set_report_form = function(){
		console.log($scope.order_data);
		$scope.subject = $scope.order_data.subject.reference;
		$scope.performer = "Myriad Lab/123456";
		$scope.code = $scope.order_data.extension[0].extension[0].valueCodeableConcept.coding[0].code;
		$scope.code_system = $scope.order_data.extension[0].extension[0].valueCodeableConcept.coding[0].system;
		$scope.code_display = $scope.order_data.extension[0].extension[0].valueCodeableConcept.coding[0].display;
		$scope.issued = getNowFormatDate();
		$scope.observation_list = new Array;
		$scope.add_obs = 0;
		var idList = new Array;
		var idindex = 0;
		for (var i = 0; i < $scope.order_data.extension.length; i++ ){
			for (var j = 0; j <$scope.order_data.extension[i].extension.length; j++){
				if ($scope.order_data.extension[i].extension[j].url == "obsForSequence"){
					if ($scope.order_data.extension[i].extension[j].valueReference.reference != '')
						$scope.add_obs =1;
					var id = $scope.order_data.extension[i].extension[j].valueReference.reference;
					var name = get_name(id);
					id = get_id(id);
					idList.push(id);
					$http.get('/datas/'+name +"?id=" + id).success(function(data){
						for (var e in data.extension){
							if (data.extension[e].url == 'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence'){
								var url = data.extension[e].valueReference.reference;
								var _id = get_id(url);
								var name = get_name(url);
								$http.get('/datas/'+name +"?id=" + _id).success(function(data){
									var sequence = data.text.div;
									sequence = sequence.substring(5, sequence.length-6);
									var var_id = sequence.substring(sequence.indexOf(" of ")+4, sequence.indexOf("is "));
									sequence = sequence.substring(sequence.indexOf("is ")+3);	
									sequence = "Variation ID: "+ var_id + "(Genotype:" + sequence + ")";
									
									$scope.observation_list.push({'sequence':sequence, 'id':idList[idindex]});
									idindex = idindex + 1;
								});
							}
						}
					});
				}
			}
		}
		//$scope.encounter = $scope.order_data.encounter.reference;
	}
	var update_order = function(order_data, new_status){
		$scope.order = order_data;
		
		order_data.status = new_status;
		if (! order_data.event ){
			order_data.event = new Array();
		}
		
		order_data.event.push({
			'status':order_data.status,
			'dateTime':getNowFormatDate(),
			'actor':{
				'reference':'Organization/Myriad Lab '
			}
		});
		
		console.log(order_data);
		var opt = {
			method: 'POST',
			data:{
				id:$scope.order_id,
				order_data:order_data
			},
			url:'/datas/update_order',
			headers: { 'Content-Type': 'application/json' },
		};
		$http(opt).success(function(data){
			console.log('updated');
			$scope.order_data = data;
			set_report_form();
		});
	}
	$scope.go_index = function() {
		$location.path('#/');
	}
	$scope.observation_list = ['Q2342X (7252C>T) BRCA2', 'R315G (1062A>G) BRCA1', 'IVS15+3A>G BRCA1']

	$scope.new_obs_add = function(){
		
		$('div#add-observation').modal('hide');
	}
	$scope.add_family = function(name){
		$scope.addfamily_member.push(name);
		$('div#add-family').modal('hide');
	}
	$scope.new_observation_modal = function(){
		$('div#add-observation').modal('show');
	}
	$scope.close_new_observation = function() {
		$('div#add-observation').modal('hide');
	}	
	$scope.new_family_modal = function() {
		$('div#add-family').modal('show');
	}
	var obs_num = 0;
	$scope.add_observation = function() {
		var div = $('div#add_observation_self').html();
		obs_num = obs_num + 1;
		div = '<hr><div id="add_observation_self_' + obs_num + '">' + div  + '</div>'
		$('div#add_obs_div').before(div);
	}
	var show_msg = function(msg) {
		$('div.hint-msg').html(msg);
		$('div.hint-msg').removeClass('hide');
    $('div.hint-msg').show(200).delay(1000).hide(200);
	}
	var update_report = function(){
		console.log('updateing');
		$scope.report_data.category.coding.push({
			system:'http://hl7.org/fhir/v2/0074',
			code:$scope.category,
			display:category_dict[$scope.category]
		});
		$scope.report_data.code.coding.push({
			system:'http://loinc.org',
			code:$scope.code,
			display:''
		});
		$scope.report_data.subject = {
			reference:$scope.subject,
			display:''
		}
		$scope.report_data.performer.reference = $scope.performer;
		$scope.report_data.effectiveDateTime = $scope.effective;
		$scope.report_data.issued = $scope.issued;
		$scope.report_data.specimen.push({
			reference:$scope.specimen,
			display:$scope.specimen
		});
		$scope.report_data.conclusion = $scope.conclusion;
		console.log($scope.report_data);
		var opt = {
			method:'POST',
			data:{id:$scope.report_data.id, report:$scope.report_data},
			headers:{'Content-Type':'application/json'},
			url:'/datas/update_report'
		}
		$http(opt).success(function(data){
			console.log(data);
			console.log('updated');
			if (data.resourceType == 'reportforgenetics'){
				show_msg('Save Success');
			}else{
				show_msg('Error');
			}
		})
	}


	var create_observation = function(info, extension, result){
	data = {
		'resourceType': 'observationforgenetics',
		'extension': extension,
		"status": "final",
		"code": {
    		"coding": [
      		{
        		"system": info.code_system,
        		"code": info.code,
        		"display": info.code_display
      		}
    		]
  		},
  		'subject':{
  			"reference": info.subject
  		},
  		"issued": info.issued,
  		"performer": [
    		{
      			"reference": 'Organization/123456',
      			"display": ""
    		}
  		],
  		"valueCodeableConcept": {
    		"coding": [
      		{
        		"system": "http://snomed.info/sct",
        		"code": "10828004",
       			"display": result,
      		}
    		]
 		 },
	};
	var opt = {
		method:'POST',
		url:'/datas/create_observation',
		data:{report:data},
		headers:{'Content-Type':'application/json'}
	}
	$http(opt).success(function(data){
		console.log(data);
        return data.id;
	}).error(function(data,status,hedaers,config){
        console.log(data);
        console.log(status);
    });
	}

	var update_observation = function(id, subject, result){
	$http.get('/datas/observationforgenetics?id=' +id).success(function(data){
		
		data.subject.reference = subject;
		data.valueCodeableConcept.text = result;
		data.valueCodeableConcept.coding[0].display = '333';
		data.id = 'http://localhost:2048/api/observationforgenetics/'+id;
		console.log('------------');
		console.log(data);
		var opt = {
			method:'POST',
			data:{
				id:id,
				order_data:data
			},
			url:'/datas/update_observation',
			headers: { 'Content-Type': 'application/json' },
		};
		$http(opt).success(function(data){
			console.log('update observationforgenetics');
			console.log(data);
		}).error(function(data,status,hedaers,config){
			console.log(data);
			console.log(status);
		});
	});

	}


	var get_result = function (info){
		var res = new Array();
		var total = $('#result-obs').children();
		if (total.length != 0){
		for (var i = 0; i < total.length; i++){
			var s = $(total[i]).find('#ob-status').val();
			var id = 'observationforgenetics/' + $(total[i]).find('#ob-status-id').text();
			console.log(id);
			update_observation($(total[i]).find('#ob-status-id').text(), info.subject, s);

			res.push({'reference':id, 'display': s});
		}
		}else{
		total = $('#add_observation').children();
        var obsList = new Array;
        var obsIndex = 0;
		for (var i = 0; i < total.length-2; i++){
            var entry = $('#add_observation_self_'+i);
			var gene = entry.find('#gene').val();
			var variation = entry.find('#variation').val();
			var amino = entry.find('#amino').val();
			var result = entry.find('#result').val();
			url = "http://www.genenames.org/cgi-bin/search?search_type=all&search=" + gene + "&submit=Submit";
			obsList.push({
                'gene':gene, 'variation': variation, 'amino':amino, 'result':result
            })
            
			$http.get('/datas/code?code=' +gene).success(function(result){
                var gene = obsList[obsIndex].gene;
                var str = "<strong>"+gene+"</strong>";
                var index = result.indexOf(str);
                str = result.substring(index);
                index = str.indexOf('<dd class="single_line">Gene</dd>') + '<dd class="single_line">Gene</dd>'.length;
                str = str.substring(index);
                index = str.indexOf('<dd class="single_line">') + '<dd class="single_line">'.length;
                var index_end = str.indexOf('</dd>')
                var code = str.substring(index, index_end);
                var code = code.substring(code.indexOf(":")+1);

                var ext = [
                    {
                        'extension':[
                            {
                                'url':"name",
                                "valueCodeableConcept": {
                                    "text": obsList[obsIndex].variation
                                }
                            }
                        ],
                        "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS"
                    },
                    {
                        'extension':[
                            {
                                'url':"HGVS",
                                    "valueCodeableConcept":{
                                    "text":obsList[obsIndex].amino
                                }
                            }
                        ],
                        "url" : "http://hl7.org/fhir/StructureDefinition/observation-geneticsAminoAcidVariation"
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsGene",
                        "valueCodeableConcept": {
                            "coding": [
                                {
                                    "system": "http://www.genenames.org",
                                    "code": code,
                                    "display": obsList[obsIndex].gene
                                }
                            ]
                        }
                    }
                ];

                var id = create_observation(info, ext, obsList[obsIndex].result);
                res.push({'reference':'observationforgenetics/'+id, 'display': obsList[obsIndex].result});
			});
			}
		}
		return res;
	}



	$scope.submit = function(id){
		if ($scope.type == '0'){

			var info = get_page_data($scope);
			var result = get_result(info);

			var post_data = form_report_json(info, $scope.order_id);
			post_data.result = result;
            if ($scope.add_obs == 0)
                post_data.extension = [];
			console.log(post_data);
			var opt = {
				method:'POST',
				url:'/datas/create_report',
				data:{report:post_data},
				headers:{'Content-Type':'application/json'}
			}
			$http(opt).success(function(data){
				console.log(data);
				if (data.resourceType == 'reportforgenetics'){
					show_msg('Save Success');
				}else{
					show_msg('Error');
				}
			});
		}else{
			update_report();
		}
	}

	$scope.confirm_report = function(id){
		var reprot_data = get_page_data($scope);
		var post_data = form_report_json(reprot_data);
		reprot_data.status = 'partial';
		var req = {
			method: 'GET',
			url:'/users',
		};
		$http(req).then(function(result){
			if (data.resourceType == 'reportforgenetics'){
				show_msg('Save Success');
			}else{
				show_msg('Error');
			}
		})
	}

}]);
