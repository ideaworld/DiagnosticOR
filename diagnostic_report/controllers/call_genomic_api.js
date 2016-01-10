/* author: Bowen */
var requestify = require('requestify');
var configs = require('./configs.js');


var doGet = function(url, access_token, res){

  requestify.get(url, {
  headers :{'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token}
  }).then(function(response){
    res.send(response.getBody());
  });
}

var doPost = function(url, data, access_token, res){

  requestify.post(url, data, {
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
    }).then(function(response){
    res.send(response.getBody());
    });
}

var doPut = function(url, data, access_token, res){
  requestify.put(url, data,{
    headers:{
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + access_token
  }
  }).then(function(response){
  res.send(response.getBody());
  });
}


var create = function(data_type, data, access_token, res){
  var url = configs.api_url + '/' + data_type +'?_format=json';
  doPost(url, data, access_token, res);
}

var update = function(data_type, id, data, access_token, res){
  var url = configs.api_url + '/' +data_type + '/' + id +'?_format=json';
  doPut(url, data, access_token, res);
}

var getAll = function(data_type, access_token, res){
  var url = configs.api_url + '/' + data_type + '?_format=json';
  doGet(url, access_token, res);
}

var search = function(data_type, access_token, res){
  var url = configs.api_url + '/' + data_type + '?_format=json';
  doGet(url, access_token, res);
}

var read = function(type, id, access_token, res){
    var url = configs.api_url + '/' + type + '/' + id + '?_format=json';
    doGet(url, access_token, res);
}

module.exports = {
  create:create,
  update:update,
  search:search,
  getAll:getAll,
  read:read,
}
