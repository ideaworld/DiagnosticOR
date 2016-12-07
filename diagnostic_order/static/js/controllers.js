var DOController = angular.module('DOController', ['ngMaterial', 'ngAnimate', 'ngAria' ,"mdPickers"]);

DOController.controller('defaultCtrl', function($scope, $http, $location, $mdDialog, $mdMedia, $mdToast){
});

DOController.controller('MainListCtrl', function($scope, $http, $location, $mdDialog, $mdMedia, $mdToast, $filter, $q){
	$scope.chosen_status="";
  $scope.init = function(){
     $http.get('/fhir-app/orders').success(function(data){
			 console.log(data);
			 if('entry' in data){
				 var datas = data.entry.map(function(item){return item.resource});
				 console.log(data.entry.map(function(item){return item.resource}));
	       $scope.orders = orderDataFormat(datas);
				 console.log($scope.orders);
			 }

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
	$scope.showOrderDetail = function(ev, index){
		console.log('a')
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
      controller:orderDetailCtrl,
      templateUrl:'/static/html/order_detail.html',
      parent:angular.element(document.body.div),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals:{$http:$http, $filter:$filter, info: $scope.orders[index], ev:ev, index:index, $q:$q}
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


function orderDetailCtrl($scope, $mdDialog, $http, $filter, info, ev, index, $q){
	$scope.info = info;
	console.log($scope.info);
  $scope.hide = function(){
    $mdDialog.hide();
  }
	$scope.newItemSpecimens = [];
	$scope.newItemBodySite = {};
	$scope.isAddEventHidden = true;
	$scope.init = function(){
		$scope.newEvent_date = new Date();
		$scope.newEvent_time = new Date();
		// process event date time
		for(var index in $scope.info.event){
			var event_item = $scope.info.event[index];
			var time_obj = generate_datetime_obj(event_item.dateTime);
			event_item['event_date'] = time_obj.toDate();
			event_item['event_time'] = time_obj.toDate();
		}
		var subject_raw_data = [];
		var orderer_raw_data = [];
		var encounter_raw_data = [];
		var supportig_raw_data = [];
		var specimen_raw_data = [];
		var event_actor_raw_data = [];
		// get subjects data
		$http.get('/getall?type=Patient').success(function(data){
      console.log(data);
      if('entry' in data){
        var datas = data.entry.map(function(item){return item.resource;});
        Array.prototype.push.apply(subject_raw_data, datas);
      }
      $http.get('/getall?type=Group').success(function(data){
        if('entry' in data){
          var datas = data.entry.map(function(item){return item.resource;});
          Array.prototype.push.apply(subject_raw_data, datas);
        }
        $http.get('/getall?type=Device').success(function(data){
          if('entry' in data){
            var datas = data.entry.map(function(item){return item.resource;});
            Array.prototype.push.apply(subject_raw_data, datas);
          }
          	$scope.subjects = subjectFormat(subject_raw_data);
        });
      });
    });
		//subjects gained
		//get orderer data
		$http.get('/getall?type=Practitioner').success(function(data){
			if('entry' in data){
				var datas = data.entry.map(function(item){return item.resource;});
				Array.prototype.push.apply(orderer_raw_data, datas);
			}
			$scope.orderers = performerFormat(orderer_raw_data);
		});
		// orderers gained
		//get encounter data
		$http.get('/getall?type=Encounter').success(function(data){
			if('entry' in data){
				var datas = data.entry.map(function(item){return item.resource;});
				Array.prototype.push.apply(encounter_raw_data, datas);
			}
			$scope.encounters = encounterFormat(encounter_raw_data);
		});
		//encounters gained
		//get supportingInformation data (Observation | Condition | DocumentReference)
		$http.get('/getall?type=observationforgenetics').success(function(data){
			if('entry' in data){
				var datas = data.entry.map(function(item){return item.resource;});
				Array.prototype.push.apply(supportig_raw_data, datas);
			}
			$http.get('/getall?type=Condition').success(function(data){
				if('entry' in data){
					var datas = data.entry.map(function(item){return item.resource;});
					Array.prototype.push.apply(supportig_raw_data, datas);
				}
				$http.get('/getall?type=DocumentReference').success(function(data){
					if('entry' in data){
						var datas = data.entry.map(function(item){return item.resource;});
						Array.prototype.push.apply(supportig_raw_data, datas);
					}
					$scope.supportings = supportingFormat(supportig_raw_data);
				})
			})
		});
		//supportingInformations gained
		// get specimen data
		$http.get('/getall?type=Specimen').success(function(data){
			if('entry' in data){
				var datas = data.entry.map(function(item){return item.resource;});
				Array.prototype.push.apply(specimen_raw_data, datas);
			}
			$scope.specimens = specimenFormat(specimen_raw_data);
		})
		//specimens gained
		// get event actor (Practitioner | Device)
		$http.get('/getall?type=Practitioner').success(function(data){
			if('entry' in data){
				var datas = data.entry.map(function(item){return item.resource;});
				Array.prototype.push.apply(event_actor_raw_data, datas);
			}
			$http.get('/getall?type=Device').success(function(data){
				if('entry' in data){
					var datas = data.entry.map(function(item){return item.resource;});
					Array.prototype.push.apply(event_actor_raw_data, datas);
				}
				$scope.event_actors = eventActorFormat(event_actor_raw_data);
			});
		})
		// event actors gained
	}
	$scope.init();
	$scope.querySearch = function(query, entry){
    var results = query ? entry.filter( createFilterFor(query) ) : entry;
    return results;
  }
	$scope.subselectedItemChange = function(item){
		$scope.info.subject = item.reference;
	}
	$scope.orselectedItemChange = function(item){
		$scope.info.orderer = item.reference;
	}
	$scope.enselectedItemChange = function(item){
		$scope.info.encounter = item.reference;
	}
	$scope.supportItemChanged = function(item){
		console.log(item);
	}
	$scope.addSupport = function(){
		$scope.info.supportingInformation.push({'reference': $scope.supportSelected.reference});

	}
	$scope.addSpecimen = function(){
		$scope.info.specimen.push({'reference':$scope.specimenSelect.reference});
	}
	$scope.eventActorChanged = function(item, index){
		$scope.info.event[index].actor = {'reference': item.reference};
	}
	$scope.addNewEvent = function(){
		var new_event = {
			'status':$scope.newEvent_status,
			'datetime':'',
			'event_date': $scope.newEvent_date,
			'event_time':$scope.newEvent_time,
			'actor':$scope.neweventActorSelect,
			//'description':$scope.newEvent_description
		};
		console.log(new_event);
		$scope.info.event.push(new_event);
	}
	$scope.itemCodeselected = function(item, index){
		$info.item[index].code.coding[0] = {
			'system':'http://snomed.info/sct',
			'code': item.code,
			'display':item.display
		}
	}
	$scope.addItemSpecimen = function(index){
		$scope.info.item[index].push({
			'reference':itemSpecimenSelect.reference
		});
	}
	$scope.itemBSChanged = function(item, index){
		$scope.info.item[index].bodySite = {
			'coding':[
				{
					'system':'http://snomed.info/sct',
					'code':item.code,
					'display':item.display
				}
			]
		}
	}
	$scope.itemeventActorChanged = function(item, parentIndex, index){
		$scope.info.item[parentIndex].event[index].actor = {
			'reference':item.reference
		}
	}
	$scope.addNewReason = function(){
		$scope.info.reason.push({'text':$scope.reasonSelect.display, 'coding':[{'system':'http://snomed.info/sct', 'code':$scope.reasonSelect.code, 'display':$scope.reasonSelect.display}]});

	}
	$scope.newitemCodeselected = function(item){
		$scope.newItemCodeItem = item;
	}
	$scope.addNewItemSpecimen = function(){
		$scope.newItemSpecimens.push({
			'reference': $scope.newitemSpecimenSelect.reference
		})
	}
	$scope.newitemBSChanged = function(item){
		$scope.newItemBodySite['coding'] = [{
			'code':item.code,
			'display':item.display
		}];
	}
	$scope.addItem = function(){
		$scope.info.item.push({
			status:$scope.newItemStatus,
			code:{coding:[{system:'http://loinc.org', code:$scope.newItemCodeItem.code, display:$scope.newItemCodeItem.display}]},
			specimen:$scope.newItemSpecimens,
			bodySite:$scope.newItemBodySite,
		});
		console.log($scope.info.item);
	}
	$scope.remoteAutoComplete = function(search_text, search_type){
		// get auto complete suggestion from server side
		var deferred = $q.defer();
		var res = []
		$http.get('/getcode?type=' + search_type +'&text='+search_text).success(function(data){
			var formated_data = formateCompleteSuggestion(data);
			deferred.resolve(formated_data);
		});
		return deferred.promise;
	}
	$scope.submit_order = function(){
		console.log('order submit');
		var opt = {
        method:'POST',
				url:'/updataOrder',
				data:{'order':$scope.formOrderJson(), 'id':$scope.info.id},
				headers:{'Content-Type':'application/json'}
      };
		console.log(opt);
		$http(opt).success(function(data){
			console.log(data);
		})
		// var para = JSON.stringify({order:$scope.formOrderJson()});
		// $http.post('/new_order/updata/', para).success(function(data){
		// 	console.log(data);
		// })
	}
	$scope.formOrderJson = function(){
		// process event date time to str
		for(var index in $scope.info.event){
			//$scope.info.event[index].dateTime = formDatetimeStr($scope.info.event[index].event_date, $scope.info.event[index].event_time);
			$scope.info.event[index].dateTime = '2016-07-18T02:26:07';
			delete $scope.info.event[index].event_date;
			delete $scope.info.event[index].event_time;
			//$scope.info.event[index].description = {coding:[{'code':$scope.info.event[index].description.coding[0].code}]}
			delete $scope.info.event[index].description;
		}
		var order_json = {
			id:$scope.info.id,
			resourceType:'orderforgenetics',
			status:$scope.info.status,
			priority:$scope.info.priority,

			subject:{'reference':$scope.info.subject},
			reason:$scope.info.reason,
			orderer:{'reference':$scope.info.orderer},
			//encounter:$scope.info.encounter,
			//supportingInformation:$scope.info.supportingInformation,
			//specimen:$scope.info.specimen,
			event:$scope.info.event,
			//item:$scope.info.item,
			note:$scope.info.note,
			meta:$scope.info.meta,
			"privacy_policy": null,
			identifier:$scope.info.identifier
		}
		return order_json;
	}
}

function check_key(key, entry){
	return (key in entry) && entry[key] != undefined;
}

function orderDataFormat(data){
  var res = [];
  for(var item in data){
    var d = data[item];
    var formated = {
      id : d.id,
			encounter:'encounter' in d ? d.encounter.reference : undefined,
      orderer : d.orderer.reference,
			reason: 'reason' in d ? d.reason:undefined,
      subject: d.subject.reference,
      specimen: 'specimen' in d ? d.specimen : [],
			supportingInformation: 'supportingInformation' in d ? d.supportingInformation : [],
			priority: 'priority' in d ? d.priority : "",
      status: d.status,
      event: processEventData(d.event),
      item: 'item' in d ? d.item : [],
			note: 'note' in d ? d.note : undefined,
			meta:d.meta,
			identifier:d.identifier,
    };
    res.push(formated);
  }
  return res;
}

function processEventData(event){
	var res = [];
	for(var index in event){
		var item = event[index];
		res.push({
			'status': 'status' in item ? item.status : undefined,
			'description': 'description' in item ? item.description : undefined,
			'dateTime' : item.dateTime,
			'actor' : 'actor' in item ? item.actor : undefined
		});
	}
	return res;
}

function subjectFormat(data){
  var res = [];
  for(var index in data){
    var item = data[index];
    var name = item.name[0].text;
    var id = item.id;
    res.push({
      display: item.resourceType + '|' + name + ' ' + id,
      value: angular.lowercase(item.resourceType + '|' + name + ' ' + id),
      reference: item.resourceType +'/'+id
    })
  }
  return res;
}

function createFilterFor(query) {
  var lowercaseQuery = angular.lowercase(query);
  return function filterFn(id) {
    return (id.value.indexOf(lowercaseQuery) > -1);
  };
}

function performerFormat(data){
  var res = [];
  for(var index in data){
    var item = data[index];
    var id = item.id;
    var name = item.name[0];
    res.push({
      display:item.resourceType+' | '+name+' '+id,
      value:angular.lowercase(item.resourceType+' | '+name+' '+id),
      reference:item.resourceType+'/'+id
    });
  }
  return res;
}

function encounterFormat(data){
	var res = [];
	for(var index in data){
		var item = data[index];
		var id = item.id
		res.push({
			display:id,
			value:angular.lowercase(id),
			reference:'Encounter/'+id
		});
	}
	return res;
}

function supportingFormat(data){
	var res = [];
	for(var index in data){
		var item = data[index];
		var id = item.id;
		var subject = '';
		if(item.resourceType == 'Condition'){
			subject = item.patient.reference;
		}else{
			subject = item.subject.reference;
		}
		res.push({
			display: item.resourceType + '|' + id + '|' + subject,
			value: angular.lowercase(item.resourceType + id + subject),
			reference: item.resourceType +'/' + id
		});
	}
	return res;
}

function specimenFormat(data){
	var res = [];
	for(var index in data){
		var item = data[index];
		var id = item.id;
		var subject = item.subject.reference;
		var type = 'type' in item ? item.type.code[0].display : ''
		res.push({
			display: type + '|' + subject + '|' + id,
			value: angular.lowercase(type+subject+id),
			reference: item.resourceType + '/' + id
		});
	}
	return res;
}

function eventActorFormat(data){
	console.log(data);
	var res = [];
	for(var index in data){
		var item = data[index];
		var id = item.id;
		var resourceType = item.resourceType;
		if(resourceType == 'Device'){
			res.push({
				display: resourceType + '|' + 'manufacturer' in item ? item.manufacturer : '' + '|' + item.type.text,
				value:angular.lowercase(resourceType + 'manufacturer' in item ? item.manufacturer : '' + item.type.text +id),
				reference:resourceType+'/'+id
			});
		}else{
			var name = 'name' in item ? item.name[0] : '';
			res.push({
				display: resourceType +'|' + name + '|' + id,
				value: angular.lowercase(resourceType + name + id),
				reference: resourceType +'/' + id
			});
		}
	}
	return res;
}

function formateCompleteSuggestion(data){
	var res = [];
	for(var index in data){
		var item = data[index]
		res.push({
			display:item[1],
			value:item[0]+item[1],
			code:item[0]
		});
	}
	return res;
}

function generate_datetime_obj(timeStr){
	// generate new time object
	if(timeStr == ''){
		var time_obj = moment();
		return time_obj;
	}
	var time_obj = moment(timeStr, moment.ISO_8601);
	return time_obj;
}

function formDatetimeStr(date_obj, time_obj){
	// get datetime ISO str with date and time
	var dtObj = moment(date_obj);
	var time_mom_obj = moment(time_obj)
	dtObj.hour(time_mom_obj.hour());
	dtObj.minute(time_mom_obj.minute());
	dtObj.second(time_mom_obj.second());
	return dtObj.toISOString();
}
