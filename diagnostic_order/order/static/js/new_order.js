$(function () { $('#subject_modal').on('shown.bs.modal', function () {
  var text = $('#subject_sel option:selected').val();
  var obj = document.getElementById("sub_id");
  var a = obj.getElementsByTagName("li");
  if(a.length == 0){
    changeTitleToWating("subject_title", text);
  $.getJSON("search_subject/",{'subject':text}, function(ret){            
    var subul = document.getElementById("sub_id");
    console.log(ret);
    var sum = ret['total'];
    ret = ret['entry'];
    changeTitleToResult("subject_title", text, sum);
    for (var i = ret.length - 1; i >= 0; i--) {
      subul.innerHTML = subul.innerHTML +  "<li class=\"list-group-item sub_item\" id=\"sub_li_" + i +"\"><label>"
      + text + ":"+ ret[i]['div'] + "</label>"
      + "<span id='subject_entry_id' hidden>" +ret[i]['id'] +"</span>"
      +"</li>";      
    };
    for (var i = ret.length - 1; i >= 0; i--) {
      var li = document.getElementById("sub_li_"+i);
      li.onclick = function(){
        var str = $(this).children("label").text();
        var id = $(this).children("span").text();
        $("p#subject_chosen").text(str);
        $("span#id_subject").text(id);
        $('#subject_modal').modal('hide')
      }
    }
    })
    }//<!-- end of if -->
  })
});

var target = "";       
$(function () { $('#target_modal').on('shown.bs.modal', function () {

  var text = $('#target_sel option:selected').val();
  if (text != target){
    var ul = document.getElementById("target_id");
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
    target = text;
  }

  var obj = document.getElementById("target_id");
  var a = obj.getElementsByTagName("li");
  if(a.length == 0){
    changeTitleToWating("target_title", text);

    $.getJSON("search_target/",{'subject':text}, function(ret){
      console.log(ret);
      console.log(ret['total']);
      var sum = ret['total'];
      ret = ret['entry'];
      changeTitleToResult("target_title", text, sum);
      var subul = document.getElementById("target_id");
      for (var i = ret.length - 1; i >= 0; i--) {

        var str = ret[i]['div'].substring(5);
        subul.innerHTML = subul.innerHTML +  
        "<li class=\"list-group-item ord_item\" id=\"target_li_" + i +"\"><label>"
        +str + "</label>"
        + "<span id='target_entry_id' hidden>" + text + "/" + ret[i]['id'] + "</span>"
        + "</li>"; 
      }
      for (var i = ret.length - 1; i >= 0; i--) {
        var l = document.getElementById("target_li_"+i);
        l.onclick = function(){
          var name = $(this).children("label").html();
          var id = $(this).children("span").text();
          $("p#target_chosen").text((name));
          $("span#id_target").text(id);
          $('#target_modal').modal('hide');
        }
      }
      })
    }//<!-- end of if -->
  })
});


$(function () { $('#type_modal').on('shown.bs.modal', function () {
  var text = 'Encounter'
  var obj = document.getElementById("type_id");
  var a = obj.getElementsByTagName("li");
  if(a.length == 0){
    var title = document.getElementById("encounter_title");
    title.innerHTML = text + " Waiting....";

    $.getJSON("search_type/",{'subject':text}, function(ret){ 
      if (!!ret['issue']){
        $('#type_modal').modal('hide');
        return;
      }
      var ord_ul = document.getElementById("type_id");
      sum = ret['total'];
      title.innerHTML = text + " " + sum +" Results";
      if (sum > 0){
        ret = ret['entry'];
        for (var i = ret.length - 1; i >= 0; i--) {
          var str = ret[i]['resource']['text']['div'].substring(5);
          var id = ret[i]['resource']['id'];
          ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item type_item\" id=\"type_li_" + i +"\"><label>"
          + str + "</label>" + "<span id='encounter_entry_id' hidden>" + id + "</span>"
          +"</li>";     
        };
        for (var i = ret.length - 1; i >= 0; i--) {
          var li = document.getElementById("type_li_"+i);
          li.onclick = function(){
            var name = $(this).children("label").text();
            var id = $(this).children("span").text();
            $("p#type_chosen").text(name);
            $("span#id_encounter").text(id);
            $('#type_modal').modal('hide');
          }
        }
      }
    })
  }//<!-- end of if -->
  })
});

$(function () { $('#sptInfo_modal').on('shown.bs.modal', function () {
    var text = $('#sptInfo_sel option:selected').val();            
    var obj = document.getElementById("sptInfo_id");
    var a = obj.getElementsByTagName("li");
    if(a.length == 0){
      changeTitleToWating("supt_title", text);
      $.getJSON("search_sptInfo/",{'subject':text}, function(ret){

          var sum = ret['totalResults'];
          ret = ret['entry']
          changeTitleToResult("supt_title", text, sum);
          var subul = document.getElementById("sptInfo_id");
          for (var i = ret.length - 1; i >= 0; i--) {
            var str = ret[i]['resource']['text']['div'].substring(5);
            var id = ret[i]['resource']['id'];
            subul.innerHTML = subul.innerHTML +  "<li class=\"list-group-item sptInfo_item\" id=\"sptInfo_li_" + i +"\"><label>"
            + str + "</label>" + "<span id='sptInfo_entry_id' hidden>" + id + "</span>"
            + "</li>"; 
          };
          for (var i = ret.length - 1; i >= 0; i--) {
            var li = document.getElementById("sptInfo_li_"+i);
            li.onclick = function(){
              var str = $(this).children("label").text();
              var id = $(this).children("span").text();
              $("p#sptInfo_chosen").text(str);
              $("span#id_sptInfo").text(id);
              $('#sptInfo_modal').modal('hide');
            }
          }
      })
      }//<!-- end of if -->
    })
});


$(function () { $('#spec_modal').on('shown.bs.modal', function () {
    var text = 'Specimen'
    var obj = document.getElementById("spec_id");
    var a = obj.getElementsByTagName("li");
    if(a.length == 0){
      changeTitleToWating('spec_title', text);
      $.getJSON("search_specimen/",{'subject':text}, function(ret){                    
          var sum = ret['totalResults'];
          changeTitleToResult('spec_title', text, sum);
          ret = ret['entry'];
          if (sum > 0){

            var ord_ul = document.getElementById("spec_id");
            for (var i = ret.length - 1; i >= 0; i--) {
            var str = ret[i]['resource']['text']['div'].substring(5);
            var id = ret[i]['resource']['id'];
            ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item sptInfo_item\" id=\"sptInfo_li_" + i +"\"><label>"
            + str + "</label>" + "<span id='sptInfo_entry_id' hidden>" + id + "</span>"
            + "</li>"; 
            };            

            for (var i = ret.length - 1; i >= 0; i--) {
              var li = document.getElementById("spec_li_"+i);
              li.onclick = function(){
                var str = $(this).children("label").text();
                var id = $(this).children("span").text();
                $("p#spec_chosen").text(str);
                $("span#id_spec").text(id);
                $('#spec_modal').modal('hide');
              }
            }
          }
      })
      }//<!-- end of if -->
    })
});

$(function () { $('#item_spec_modal').on('shown.bs.modal', function () {
    var text = 'Specimen'
    var obj = document.getElementById("item_spec_id");
    var a = obj.getElementsByTagName("li");
    if(a.length == 0){
      changeTitleToWating("item_spec_title", text);
      $.getJSON("search_specimen/",{'subject':text}, function(ret){
          var sum = ret['totalResults'];
          changeTitleToResult("item_spec_title", text, sum);
          if (sum > 0 ){
            ret = ret['entry'];
            var ord_ul = document.getElementById("item_spec_id");
            ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item spec_item\" id=\"item_spec_li_0" +"\"><label>"+ret['id'] +"</label></li>";                   
            var li = document.getElementById("item_spec_li_0");
            li.onclick = function(){
              var id = $(this).attr("id");
              var li = document.getElementById(id);
              var str = li.innerHTML;
              str = str.substring(7, str.length-8);
              var text = document.getElementById('item_spec_chosen');
              text.innerHTML = str;
              $('#item_spec_modal').modal('hide')
            }
          }
      })
      }//<!-- end of if -->
    })
  });

function addItemObservation(btn){
  $('#item_obseq_modal').modal('show')
  var text = 'Observation';
  var obj = document.getElementById("item_obseq_id");
  var a = obj.getElementsByTagName("li");
  while(obj.hasChildNodes()){
     obj.removeChild(obj.firstChild);
  }
  if(a.length == 0){
    changeTitleToWating("item_obseq_title", text);
    $.getJSON("search_Observation/",{'subject':text}, function(ret){
        var sum = ret['total'];
        changeTitleToResult("item_obseq_title", text, sum);
        if (sum > 0 ){
          ret = ret['entry'];
          var ord_ul = document.getElementById("item_obseq_id");
          for (var i = ret.length - 1; i >= 0; i--) {
            var sequence = ret[i]['div'].substring(5);
            var var_id = sequence.substring(sequence.indexOf(" of ")+4, sequence.indexOf("is "));
            sequence = sequence.substring(sequence.indexOf("is ")+3); 
            sequence = "Variation ID: "+ var_id + "(Genotype:" + sequence + ")";
              
            var id =  ret[i]['id'];
            ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item obseq_item\" id=\"item_obseq_li_"+i +"\"><label>"
            + sequence + "</label><span id='item_obseq_entry_id' hidden>" + id + "</span>"
            +"</li>";                   
          }
          for (var i = ret.length - 1; i >= 0; i--) {
            var li = document.getElementById("item_obseq_li_"+i);
            li.onclick = function(){
              var str = $(this).children("label").text();
              var id = $(this).children("span").text();
              btn.prev().prev().text(str);
              btn.prev().text(id);      
              $('#item_obseq_modal').modal('hide');
            }
          }
        }
    })
    }//<!-- end of if -->
}

function changeTitleToWating(title_id, text){
  var title = document.getElementById(title_id);
  title.innerHTML = text + " Waiting...";
}

function changeTitleToResult(title_id, text, sum){
  var title = document.getElementById(title_id);
  title.innerHTML = text + " " + sum + " Results";
}

var item_str;
$(document).ready(function(){
  item_str = $('#new_digorder_item_0').html();
  console.log(item_str);
  $(".obr_btn").click(function(){
    addItemObservation($(this));
  });

});

var item_sum = 0;

function add_item(){
  item_sum = item_sum+1;
  var str = item_str;
  var str = "<div class=\"row\" id = \"new_digorder_item_" + item_sum +"\"" +">"+ str + "</div>"
  $("div#new_digorder_item").append(str);
  var temp = "#new_digorder_item_" + item_sum;
  $(temp).find("button").click(function(){
    addItemObservation($(this));
  });

  if (item_sum == 1) {
    btn = document.getElementById("del_item_id");
    btn.style.display = "block";
  }
}
function del_item(){
  context = document.getElementById("new_digorder_item_"+item_sum);
  context.parentNode.removeChild(context);
  item_sum = item_sum-1; 
  if (item_sum == 0){
    btn = document.getElementById("del_item_id");
    btn.style.display = "none";
  } 
}

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

var item = new Array();
function get_page_data(){
  length = $("#new_digorder_item").children("div").length-1;
  item = []
  for (var i = 0; i < length; i++){
    item_system = $("#new_digorder_item_"+i).find("input.item_system").val();
    item_code = $("#new_digorder_item_"+i).find("input.item_code").val();
    item_display =  $("#new_digorder_item_"+i).find("textarea.item_display").val();
    item_description = $("#new_digorder_item_"+i).find("textarea.item_description").val();
    observation = $("#new_digorder_item_"+i).find("#item_obseq_chosen").text();
    if (observation != ''){
      observation = $("#new_digorder_item_"+i).find('span#id_item_obseq').text();
    }
    specimen = $("#new_digorder_item_"+i).find("#item_spec_chosen").text();
    if (specimen != ''){
      specimen = $("#new_digorder_item_"+i).find("span#id_spec").text();
    }
    
    item[i] = {
      'extension':[
        {
          'url':"code",
          "valueCodeableConcept":{
              'coding': [
               {
                'system': item_system,
                'code': item_code,
                'display': item_display,
               },
              ],
              'text': item_description,
          }
        },
        {
          "url" : "obsForSequence",
          "valueReference": {
            "reference":observation,
          }
        },
        {
          "url" : "specimen",
          "valueReference":{
            "reference": specimen,
          }
        },
        {
          "url" : "status",
           "valueCode" : "requested",
        },
      ],
      "url": "http://hl7.org/fhir/StructureDefinition/diagnosticorder-geneticsItem",
    };
  }


  var subject= $('span#id_subject').text();
  var target= $('span#id_target').text();
  var encounter = $('span#id_encounter').text();
  var order_id = $('p#order_id').text();
  var orderer = "Freda Jordan/234";
  var infos = {
    id_system:$('#id_system').val(),
    id_value:$('#id_value').val(),
    order_id:order_id,
    date:getNowFormatDate(),
    subject:subject,
    orderer:orderer,
    _target:target,
    encounter:encounter,
    reason_system:$("#reason_system").val(),
    reason_code:$("#reason_code").val(),
    reason_display:$("#reason_display").val(),
    reason_description:$("#reason_description").val(),
    specimen:$("p#spec_chosen").text(),
    priority:$('#prio_sel option:selected').val(),
    item:item,
    note:$("#note_id").val(),
  }
  return infos;
}

function get_ref(regx, sub){
  return regx.exec(sub) + '/' +sub.match("[0-9]*$");
}

function form_report_json(info){
  var res_json = {
      "diagnostic_order" : {
        "resourceType": "orderforgenetics",
        "subject": {
          "reference": info.subject
        },
        "orderer":{
          "reference": info.orderer,
        },
        "identifier": [
          {
            "system": "example",
            "value": info.order_id,
          }
        ],
        "reason": [
          {
            
            "coding": [
              {
                "system": info.reason_system,
                "code": info.reason_code,
                "display": info.reason_display,
              }
            ],
            
            "text": info.reason_description,
          }
        ],
        "priority" : info.priority,
        "status": "requested",
        "extension":info.item,
        "event": [
          {
            "status": "requested",
            "dateTime": info.date,
            "actor": {
              "reference": info.orderer
            }
          }
        ],
        "note": [
          {
            "text": info.note,
          }
        ],
      },
      "order":{
        "resourceType": "Order",
        "identifier": [
          {
            "system": info.id_system,
            "value": info.id_value,
          }
        ],
        "target":{
          "reference": info._target,
        }
      }
    }
  return res_json
}
var show_msg = function(msg) {
  $('div.hint-msg').html(msg);
  $('div.hint-msg').removeClass('hide');
  $('div.hint-msg').show(200).delay(1000).hide(200);
}
function Submit(){
  var post_data = form_report_json(get_page_data());
  console.log(post_data);
  
  var json_str = JSON.stringify(post_data);
  $.ajax({
    url:"updata/",
    data:json_str,
    dataType:"json",
    type:"POST",
    success:function(result){
      
      show_msg();
    }
  });


}

function save(){
  //document.getElementById("sub_id")
  title = $('h2#h_title').text();
  var post_data = form_report_json(get_page_data());
  post_data["diagnostic_order"]["status"] = "draft";

  if (title.length < 30){
    var json_str = JSON.stringify(post_data);
    $.ajax({
      url:"updata/",
      data:json_str,
      dataType:"json",
      type:"POST",
      success:function(result){
          //do something
          show_msg();
      }
    });
  }else{
    post_data["id"] = title.substring(13);
    var json_str = JSON.stringify(post_data);
    $.ajax({
      url:"/updataOrder/",
      data:json_str,
      dataType:"json",
      type:"PUT",
      success:function(result){
          //do something
         show_msg();
      }
    });
  }
}

function getCookie(name) {     
  var cookieValue = null;     
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');         
    for (var i = 0; i < cookies.length; i++) {             
      cookie = jQuery.trim(cookies[i]);             
      // Does this cookie string begin with the name we want?             
      if (cookie.substring(0, name.length + 1) == (name + '=')) { 
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));                 
        break;             
      }         
    }     
  }     
  return cookieValue; 
}  

var csrftoken = getCookie('csrftoken');  
function csrfSafeMethod(method) {     // these HTTP methods do not require CSRF protection     
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)); 
} 
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }     
  } 
});

/*
$(window).bind('beforeunload',function(){
return '您输入的内容尚未保存，确定离开此页面吗？';
});
*/