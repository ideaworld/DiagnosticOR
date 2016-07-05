var DiaReportController = angular.module('DiaReportController', ['ngMaterial',"ngAnimate","ngAria","mdPickers"]);

DiaReportController.controller('defaultCtrl', function($scope, $http, $location, $mdDialog, $mdMedia, $mdToast){

});

DiaReportController.controller('rlistCtrl', function($scope, $http, $location, $mdDialog, $filter, $mdMedia, $mdToast){
  $scope.chosen_status="";
	$scope.init = function(){
		$http.get('/datas/all_report').success(function(data){
			var datas = data.entry.map(function(item){return item.resource});

			$scope.reports = reportDataFormat(datas);
		});
	}
	$scope.init();

  $scope.showReportDetail = function(ev, index){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
      controller:reportDetailCtrl,
      templateUrl:'/static/html/report_detail.html',
      parent:angular.element(document.body.div),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals:{$http:$http, $filter:$filter, info:$scope.reports[index], isNew:false}
    }).then(function(ans){

    }, function(){

    });
    $scope.$watch(function(){
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen){
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  }

});

function formNewReport(order_data){
	var new_report = {
		status:'registered',
		category:'',
		code:{coding:[]},
		subject:{reference:order_data.subject.reference},
    specimen:order_data.specimen,
		effectiveDateTime:'',
		issued:'',
		performer:{},
		request:[{'reference':order_data.id}],
		result:[],
		conclusion:''
	}
	return new_report;
}

function reportDataFormat(data){
  console.log(data);
	var res = [];
	for(var index in data){
		var item = data[index];
		var formated = {
			id: item.id,
			status:item.status,
			category:item.category,
			code:item.code,
			subject: item.subject,
			effectiveDateTime:item.effectiveDateTime,
			issued:item.issued,
			performer:item.performer,
      specimen:item.specimen,
			request:item.request,
			result:item.result,
			conclusion:item.conclusion
		}
		res.push(formated);
	}
	return res;
}

function orderDataFormat(data){
  var res = [];
  for(var item in data){
    var d = data[item];
    var formated = {
      id : d.id,
      orderer : d.orderer.reference,
      subject: d.subject.reference,
      specimen: d.specimen,
      status: d.status,
      event: d.event,
      item: d.item,
			note: 'note' in d ? d.note.map(function(item){return item.text;}).join(', ') : undefined
    };
    res.push(formated);
  }
  return res;
}

DiaReportController.controller('olistCtrl', function($scope, $http, $location, $mdDialog, $mdMedia, $mdToast, $filter){
	$scope.chosen_status="";
  $scope.init = function(){
     $http.get('/datas/all_order').success(function(data){
			 var datas = data.entry.map(function(item){return item.resource});
			 console.log(data.entry.map(function(item){return item.resource}));
       $scope.orders = orderDataFormat(datas);
     });

  }
  $scope.init();
  $scope.status="all";
  $scope.bad_condition = 'cancelled,rejected,suspended,failed';
  $scope.check_condition = function(){
    for(var order in $scope.orders){
      if($scope.bad_condition.indexOf($scope.orders[order].status) > 0){
        $scope.orders[order].condititon = 'bad';
      }else{
        $scope.orders[order].condititon = 'good';
      }
    }
  }
  $scope.check_condition();
	$scope.startNewReport = function(ev, index){
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
		var info = formNewReport($scope.orders[index]);
		$mdDialog.show({
			controller:reportDetailCtrl,
			templateUrl:'/static/html/report_detail.html',
			parent:angular.element(document.body.div),
			targetEvent:ev,
			clickOutsideToClose:true,
			fullscreen:useFullScreen,
			locals:{$http:$http, $filter:$filter, info:info, isNew:true}
		})
	};
  $scope.showOrderDetail = function(ev, index){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
      controller:orderDetailCtrl,
      templateUrl:'/static/html/order_detail.html',
      parent:angular.element(document.body.div),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals:{$http:$http, $filter:$filter, info: $scope.orders[index], start_new: $scope.startNewReport, ev:ev, index:index}
    }).then(function(ans){

    }, function(){

    });
    $scope.$watch(function(){
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen){
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  }
});

function reportDetailCtrl($scope, $mdDialog, $http, $filter, info, isNew){
  console.log(info);
	$scope.info = info;
	$scope.modified = info;
  $scope.oid = [];
	$scope.categorys = loadCategory();
  $scope.isOHidden = true;
	$scope.hide = function(){
		$mdDialog.hide();
	}
  $scope.effectDate = moment($scope.info.effectiveDateTime, moment.ISO_8601);
  $scope.effectTime = moment($scope.info.effectiveDateTime, moment.ISO_8601);
  $scope.issuedDate = moment($scope.info.issued, moment.ISO_8601);
  $scope.issuedTime = moment($scope.info.issued, moment.ISO_8601);
  $scope.init_data = function(){
    var obs_raw_data = [];
    var subject_raw_data = [];
    var performer_raw_data = [];
    $http.get('/datas/all?type=observationforgenetics').success(function(data){
      var datas = data.entry.map(function(item){return item.resource;});
      Array.prototype.push.apply(obs_raw_data, datas);
      $scope.oid = observationFormat(obs_raw_data);
    });
    $http.get('/datas/clinical?type=Patient').success(function(data){
      if('entry' in data){
        var datas = data.entry.map(function(item){return item.resource;});
        Array.prototype.push.apply(subject_raw_data, datas);
      }
      $http.get('/datas/clinical?type=Group').success(function(data){
        if('entry' in data){
          var datas = data.entry.map(function(item){return item.resource;});
          Array.prototype.push.apply(subject_raw_data, datas);
        }
        $http.get('/datas/clinical?type=Device').success(function(data){
          if('entry' in data){
            var datas = data.entry.map(function(item){return item.resource;});
            Array.prototype.push.apply(subject_raw_data, datas);
          }
          console.log(subject_raw_data);
          $scope.subjects = subjectFormat(subject_raw_data);
          console.log($scope.subjects);
        });
      });
      $http.get('/datas/clinical?type=Practitioner').success(function(data){
        var datas = data.entry.map(function(item){return item.resource;});
        Array.prototype.push.apply(performer_raw_data, datas);
        console.log(performer_raw_data);
        $scope.performers = performerFormat(performer_raw_data);
      });
    });
  }
  $scope.init_data();

  $scope.subselectedItemChange = function(new_item){
    $scope.info.subject.reference = new_item.reference;
  }

  $scope.perselectedItemChange = function(new_item){
    $scope.info.performer.reference = new_item.reference;
  }

  $scope.add_new_result = function(){
    $scope.info.result.push({
      reference:$scope.selectedItem.reference
    });
  }

  $scope.form_submit_data = function(){
    var effectDateTime = moment($scope.effectDate);
    var effectTime_obj = moment($scope.effectTime);
    effectDateTime.hour(effectTime_obj.hour());
    effectDateTime.minute(effectTime_obj.minute());
    effectDateTime.second(effectTime_obj.second());
    var issuedDateTime = moment($scope.issuedDate);
    var issuedTime_obj = moment($scope.issuedTime);
    issuedDateTime.hour(issuedTime_obj.hour());
    issuedDateTime.minute(issuedTime_obj.minute());
    issuedDateTime.second(issuedTime_obj.second());
    var submit_form = {
      resourceType:'DiagnosticReport',
      status:$scope.info.status,
      code:{
        coding:[{system:'http://loinc.org', display:'', code:$scope.new_code}]
      },
      subject:$scope.info.subject,
      effectiveDateTime:effectDateTime.toISOString(),
      issued:issuedDateTime.toISOString(),
      performer:$scope.info.performer ? $scope.info.performer : {},
      specimen:$scope.info.specimen ? $scope.info.specimen : [],
      result:$scope.info.result,
      conclusion:$scope.info.conclusion ? $scope.info.conclusion : ''
    };
    if(!isNew){
      submit_form.id = $scope.info.id;
    }
    if($scope.caselectedItem){
      submit_form['category'] = {
        coding:[
          {
            system:'http://hl7.org/fhir/v2/0074',
            code:$scope.caselectedItem.code,
            display:$scope.caselectedItem.display
          }
        ]
      };
    }else{
        submit_form['category'] = $scope.info.category;
    }
    return submit_form;
  }

  $scope.submit = function(){
    if(isNew){
      console.log('creating');
      var submit_form = $scope.form_submit_data();
      console.log(submit_form);
      var opt = {
        method:'POST',
				url:'/datas/create_report',
				data:{report:submit_form},
				headers:{'Content-Type':'application/json'}
      }
      $http(opt).success(function(data){
        console.log(data);
        console.log('created');
      })
    }else{
      console.log('submiting');
      var submit_form = $scope.form_submit_data();
      console.log(submit_form);
      var opt = {
        method:'POST',
  			data:{id:submit_form.id, report:submit_form},
  			headers:{'Content-Type':'application/json'},
  			url:'/datas/update_report'
      };
      $http(opt).success(function(data){
        console.log(data);
        console.log('updated');

      });
    }

  }

  $scope.querySearch = function(query, entry){
    var results = query ? entry.filter( createFilterFor(query) ) : entry;
    return results;
  }
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange   = searchTextChange;
}

function searchTextChange(text) {
  console.log('Text changed to ' + text);
}
function selectedItemChange(item) {
  console.log('Item changed to ' + JSON.stringify(item));
}

function getHeaderAndContent(datas){
  var headers_list = [];
  var res = {
    'header': [],
    'content': datas,
  }
  for(var index in datas){
    var data = datas[index];
		for(var key in data){
			if(headers_list.indexOf(key) < 0){
				headers_list.push(key);
				res.header.push({name:key, field:key});
			}
		}
  }
	res['sortable'] = headers_list;
	return res;
}

function formEventData(raw_datas){
  var tmps = [];
  //plain key/values
  for (var index in raw_datas){
    var raw_data = raw_datas[index];
    var tmp = {};
    for(var key in raw_data){
      if(key.startsWith('_')){
        continue;
      }
      if(key == 'actor'){
        tmp[key] = raw_data.actor.reference;
      }else if(key == 'description'){
        tmp[key] = raw_data[key].coding.map(function(item){
          return item.code;
        }).join(' ');
      }else{
        tmp[key] = raw_data[key];
      }
    }
    tmps.push(tmp);
  }
  return getHeaderAndContent(tmps);
}

function formItemData(raw_datas){
	var tmps = [];
	for( var index in raw_datas ){
		var raw_data = raw_datas[index];
		var tmp = {};
		for( var key in raw_data ){
			if( key.startsWith('_') || key == 'event'){
				continue;
			}else if(key == 'code'){
				tmp[key] = raw_data[key].text;
			}else if( key == 'specimen' ){
				tmp[key] = raw_data[key].map(function(item){
					return item.reference;
				}).join(', ');
			}else if( key == 'bodySite' ){
				tmp[key] = raw_data[key].coding.map(function(item){
					return item.display;
				}).join(', ');
			}else{
				tmp[key] = raw_data[key];
			}
		}
		tmps.push(tmp);
	}
	return getHeaderAndContent(tmps);
}

function orderDetailCtrl($scope, $mdDialog, $http, $filter, info, ev, start_new, index){
	console.log(info);
	$scope.info = info;
  var event_data = formEventData(info.event);
	$scope.event_headers = event_data.header;
	$scope.event_content = event_data.content;
	$scope.sortable = event_data.sortable;
  var item_data = formItemData(info.item);
	$scope.item_headers = item_data.header;
	$scope.item_content = item_data.content;
	$scope.item_sortable = item_data.sortable;

  $scope.hide = function(){
    $mdDialog.hide();
  }
	$scope.new_report = function(){
		console.log('a');
		$mdDialog.hide();
		start_new(ev, index);
	}
  var orderBy = $filter('orderBy');

	// event table functions
  $scope.handleSort = function (field) {
    if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
  };
  $scope.order = function(predicate, reverse) {
    $scope.event_content = orderBy($scope.event_content, predicate, reverse);
    $scope.predicate = predicate;
  };

	//item table functions
	$scope.item_handleSort = function(field) {
		if ($scope.item_sortable.indexOf(field) > -1) {return true; } else { return false; }
	};

	$scope.item_order = function(predicate, reverse) {
		$scope.item_content = orderBy($scope.item_content, predicate, reverse);
		$scope.item_predicate = predicate;
	};

	$scope.check_key = function(key){
		return check_key(key, info);
	}
}

function check_key(key, entry){
	return (key in entry) && entry[key] != undefined;
}

// DiaReportController.filter('startFrom',function (){
//   return function (input,start) {
//     start = +start;
//     return input.slice(start);
//   }
// });

function loadCategory(){
	var all_category = [
		{code:'AU',display:	'Audiology'},
		{code:'BG',display:	'Blood Gases'},
		{code:'BLB',display:	'Blood Bank'},
		{code:'CG',display:	'Cytogenetics'},
		{code:'CH',display:	'Chemistry'},
		{code:'CP',display:	'Cytopathology'},
		{code:'CT',display:	'CAT Scan'},
		{code:'CTH',display:	'Cardiac Catheterization'},
		{code:'CUS',display:	'Cardiac Ultrasound'},
		{code:'EC',display:	'Electrocardiac (e.g. EKG, EEC, Holter)'},
		{code:'EN',display:	'Electroneuro (EEG, EMG,EP,PSG)'},
		{code:'GE',display:	'Genetics'},
		{code:'HM',display:	'Hematology'},
		{code:'ICU',display:'Bedside ICU Monitoring'},
		{code:'IMM',display:	'Immunology'},
		{code:'LAB',display:	'Laboratory'},
		{code:'MB',display:	'Microbiology'},
		{code:'MCB',display:	'Mycobacteriology'},
		{code:'MYC',display:	'Mycology'},
		{code:'NMR',display:	'Nuclear Magnetic Resonance'},
		{code:'NMS',display:	'Nuclear Medicine Scan'},
		{code:'NRS',display:	'Nursing Service Measures'},
		{code:'OSL',display:	'Outside Lab'},
		{code:'OT',display:	'Occupational Therapy'},
		{code:'OTH',display:	'Other'},
		{code:'OUS',display:	'OB Ultrasound'},
		{code:'PF',display:	'Pulmonary Function'},
		{code:'PHR',display:	'Pharmacy'},
		{code:'PHY',display:	'Physician (Hx. Dx, admission note, etc.)'},
		{code:'PT',display:	'Physical Therapy'},
		{code:'RAD',display:	'Radiology'},
		{code:'RC',display:	'Respiratory Care (therapy)'},
		{code:'RT',display:	'Radiation Therapy'},
		{code:'RUS',display:	'Radiology Ultrasound'},
		{code:'RX',display:	'Radiograph'},
		{code:'SP',display:	'Surgical Pathology'},
		{code:'SR',display:	'Serology'},
		{code:'TX',display:	'Toxicology'},
		{code:'VR',display:	'Virology'},
		{code:'VUS',display:	'Vascular Ultrasound'},
		{code:'XRC',display:	'Cineradiograph'}
	];
	return all_category.map(function(item){
		item['value'] = item.display.toLowerCase();
		return item;
	});
}

function loadAll() {
  //return [{value: 'ma', display: 'MA'},{value: 'ad', display: 'AD'},{value: 'fa', display: 'FA'},{value: 'fe', display: 'FE'},{value: 'ee', display: 'EE'},{value: 'hp', display: 'HP'},{value: 'xs', display: 'XS'}];
  var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
          Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
          Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
          Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
          North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
          South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
          Wisconsin, Wyoming';
  return allStates.split(/, +/g).map( function (state) {
    return {
      value: state.toLowerCase(),
      display: state
    };
  });
}

function createFilterFor(query) {
  var lowercaseQuery = angular.lowercase(query);
  return function filterFn(id) {
    return (id.value.indexOf(lowercaseQuery) > -1);
  };
}

function observationFormat(data){
	var res = [];
	for(var index in data){
		var item = data[index];
		var category = 'text' in item.category ? item.category.text : '';
		var desc = 'text' in item.code ? item.code.text : '';
		var id = item.id;
		res.push({
			value:angular.lowercase(desc + id),
			display: category + ' | ' + desc +' | ' + id,
      reference:item.resourceType+'/'+id
		});
	}
	return res;
}

function subjectFormat(data){
  var res = [];
  for(var index in data){
    var item = data[index];
    var given_name = 'given' in item.name ? item.name.given.join(' ') : '';
    var family_name = 'family' in item.name ? item.name.family.join(' ') : '';
    var name = given_name + ' ' + family_name;
    var id = item.id
    res.push({
      display: item.resourceType + '|' + name + ' ' + id,
      value: angular.lowercase(item.resourceType + '|' + name + ' ' + id),
      reference: item.resourceType +'/'+id
    })
  }
  return res;
}


function performerFormat(data){
  var res = [];
  for(var index in data){
    var item = data[index];
    var id = item.id;
    var given_name = 'given' in item.name ? item.name.given.join(' ') : '';
    var family_name = 'family' in item.name ? item.name.family.join(' ') : '';
    var name = given_name + ' ' + family_name;
    res.push({
      display:item.resourceType+' | '+name+' '+id,
      value:angular.lowercase(item.resourceType+' | '+name+' '+id),
      reference:item.resourceType+'/'+id
    });
  }
  return res;
}
