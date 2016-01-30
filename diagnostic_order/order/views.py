#coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
import json
from django.http import JsonResponse
from urllib import urlencode
from urllib import quote
import requests
import re 
import base64
from django.shortcuts import redirect 
from django.views.decorators.csrf import csrf_exempt
#from config import CLINIC_SECRET, CLINIC_REDIRECT_URI, CLINICSCOPES, GENOMICSCOPE, GENOMIC_ID, INDENTIFIER,REPORT, ID_SRCRET_BASE64, redirect_uri, API_BASE, AUTH_BASE, CLIENT_ID, REDIRECT_URI
from config import CLINICAL, GENOMICS
from dataOperate import read, upload, search, delete
# Create your views here.

def home(request):
  return render(request, 'base.html')

'''
get value of key
'''
def get_ref(key, data):
  if (key in data):
    order = data[key]['reference']
    return order
  order = ''
  return order

def check_order(request, status):
  status_dict={
    'na':'Not Accpeted',
    'ao':'All Orders',
    'ac':'Accepted',
    'rj':'Rejected'
  }
  na_status = ['proposed','draft','planned','requested','received','accepted','in-progress','review','suspended']
  ac_status = ['completed', 'cancelled']
  rj_status = ['rejected','failed']

  data=[]
  dat = search(request, 'genomic', 'orderforgenetics')
  total = dat['total']
  if total == 0:
    return render(request, 'orders_item.html', {'status': status_dict[status], 'total':total, 'orders':data});

  for d in dat['entry']:
    id_ = d['fullUrl'][d['fullUrl'].index('orderforgenetics')+len('orderforgenetics')+1:]
    order = get_ref('encounter', d['resource'])
    time = d['resource']['event'][0]['dateTime']
    statu = d['resource']['status']
    name = d['resource']['orderer']['reference']
    order_profile = {'name': name, 'Order': order, 'Time': time, 'Status': statu, 'id':id_}
    data.append(order_profile)

  real_data = []
  if status == 'ao':
    real_data = data
  else:
    for d in data:
      if status == 'na':
        for i in na_status:
          if d['Status'].lower() == i:
            real_data.append(d)
      if status == 'ac':
        for i in ac_status:
          if d['Status'].lower() == i:
            real_data.append(d)
      if status == 'rj':
        for i in rj_status:
          if d['Status'].lower() == i:
            real_data.append(d)

  return render(request, 'orders_item.html', {'status': status_dict[status], 'total':total, 'orders':real_data});

def new_order(request):
  return render(request, 'new_order.html')

def get_key_value(key, data):
  if (key in data.keys()):
    return data[key]
  return ''

def get_name(str):
  return str[:str.index('/')]

def get_ID(str):
  return str[str.index('/')+1:]

def order_detail(request, id):
  
  order = read(request, 'genomic', id, 'orderforgenetics')
  subject = read(request, 'clinic', get_ID(order['subject']['reference']), get_name(order['subject']['reference']))
  subject = subject['name'][0]['text']
  specimen = get_key_value('specimen', order)
  priority = get_key_value('priority', order)
  reason = ''
  if (('reason' in order.keys())  and ('text' in order['reason'][0].keys())):
    reason = order['reason'][0]['text']
  sptinfo = ''
  if ('supportingInformation' in order.keys()):
    sptinfo = order['supportingInformation'][0]['reference']
  note = ''
  if ('note' in order.keys()):
    note = order['note'][0]['text']

  for item in order['extension']:
    for s in item['extension']:
      if s['url'] == 'obsForSequence' and s['valueReference']['reference'] != '':
        name = get_name(s['valueReference']['reference'])
        id = get_ID(s['valueReference']['reference'])
        #!!! clinic zenme huo
        data = read(request, 'genomic', id, 'observationforgenetics')
        for e in data['extension']:
          if e['url'] == r'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence':
            url = e['valueReference']['reference']
            id_ = get_ID(url)
            url = get_name(url)
            data = read(request, 'clinic', id, url)
            #access_token = request.COOKIES['genomic_access_token']
            #resp = requests.get('%s/%s?_format=json'%(API_BASE, url),
            #    headers={'Accept': 'application/json','Authorization': 'Bearer %s'% access_token})
            #data = resp.json()
            obs = data['text']['div'][5:-6]
            var_id = obs[obs.index(" of ")+4: obs.index("is ")]
            obs = obs[obs.index("is ")+3:]
            
            obs = "Variation ID: "+ var_id + "(Genotype:" + obs + ")"
            s['valueReference']['reference'] = obs


  args = {
    'id':id,
    'status':order['status'],
    'subject':subject,
    'orderer':order['orderer']['reference'],
    'encounter':get_ref('encounter',order),
    'reason':reason,
    'sptinfo':sptinfo,
    'specimen': specimen,
    'priority': priority,
    'event_list':order['event'],
    'item_list': order['extension'],
    'note':note,
  }

  return render(request, 'order_detail.html', args)

def launch(request):
  print "START: GENOMIC"
  request.session['iss'] = request.GET['iss']
  request.session['launch'] = request.GET['launch']
  scope = ' '.join(GENOMICS['scopes'])
  args={}
  args['scope'] = scope
  args['client_id'] = GENOMICS['client_id']
  args['response_type'] = 'code'
  args['redirect_uri'] = GENOMICS['redirect_uri']
  re = GENOMICS['OAUTH_BASE'] + '/authorize?' + urlencode(args)
  resp = HttpResponseRedirect(re)
  return resp

def clinic_launch(request):
  scope = ' '.join(CLINICAL['scopes'])
  print "START: CLINIC"

  return render(request, 'clinic_launch.html', 
    {'client_id': CLINICAL['client_id'], 'scope': scope, 'redirect_uri': CLINICAL['redirect_uri']})
  
class OAuthError(Exception):
    pass

def get_access_token(auth_code):
    '''
    exchange `code` with `access token`
    '''

    exchange_data = {
        'code': auth_code,
        'redirect_uri': CLINICAL['redirect_uri'],
        'grant_type': 'authorization_code'
    }
    headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Content-Length" : len(exchange_data),
        'Authorization':'Basic ' + base64.b64encode(CLINICAL['client_id']+":" +CLINICAL['CLINIC_SECRET'])
    }
    resp = requests.post(CLINICAL['AUTH_BASE'], data=exchange_data, headers=headers)
    print resp.json()
    if resp.status_code != 200:
        raise OAuthError
    else:
        return resp.json()['access_token']

def recv_code(request):
  print 'clinic redirect'
  code = request.GET.get('code')
  access_token = get_access_token(code)
  resp = HttpResponseRedirect('/fhir-app/')
  resp.set_cookie('clinic_access_token', access_token)
  resp.set_cookie('genomic_access_token', request.session.get('genomic_access_token'))
  return resp

def recv_redirect(request):
  print "recv_redirect"
  code = request.GET.get('code')
  datas = {
    'code':code,
    'client_id': GENOMICS['client_id'],
    'redirect_uri': GENOMICS['redirect_uri'],
    'grant_type': 'authorization_code'
  }
  headers = {
    "Content-Type": 'application/x-www-form-urlencoded',
    "Content-Length" : len(datas)
  }
  resp = requests.post(GENOMICS['OAUTH_BASE'] + '/token', data=datas,headers=headers)
  if resp.status_code != 200:
    raise OAuthError
  else:
    genomic_access_token = resp.json()['access_token']
    request.session['genomic_access_token'] = genomic_access_token
    re = GENOMICS['RE_CLINICAL_URI']
    args={}
    args['iss'] = request.session.get('iss')
    args['launch'] = request.session.get('launch')
    re = re + '?' + urlencode(args)
    resp = HttpResponseRedirect(re)
    resp.set_cookie('genomic_access_token', request.session.get('genomic_access_token'))
    return resp


def noIssue(data):
  if 'issue' not in data:
    return True
  else:
    return False

def search_subject(request):
  subject = request.GET.get('subject')
  order_search = search(request, 'clinic', subject);
  datas=[]
  entry={}
  if order_search['total'] != 0:
    for e in order_search['entry']:
      div = ' '.join(e['resource']['name'][0]['given']) + ' ' + e['resource']['name'][0]['family'][0]
      id = e['resource']['id']
      gender = e['resource']['gender']
      entry={
        'div': div,
        'id': subject + '/' +id #need to confirm id/fullUrl
      }
      datas.append(entry)

  datas={
    'total': order_search['total'],
    'entry': datas 
  }


  return JsonResponse(datas, safe=False)

def search_type(request):

  subject = request.GET.get('subject')
  order_search = search(request, 'clinic', subject)
  if noIssue(order_search):
    datas=[]
    entry={}
    if order_search['total'] != 0:
      for e in order_search['entry']:
        div = e['resource']['text']['div']
        id = e['resource']['id']
        entry={
          'div': div,
          'id': subject + '/' +id
        }
        datas.append(entry)
  
    datas={
      'total': order_search['total'],
      'entry': datas 
    }
    return JsonResponse(datas, safe=False)
  else:
    datas={
      'issue':order_search['issue']['details']
    }
    return JsonResponse(datas, safe=False)

def search_sptInfo(request):
  subject = request.GET.get('subject')
  order_search = search(request, 'clinic', subject)
  #do something...
  return JsonResponse(order_search, safe=False)

#need to confirm
def search_Observation(request):  
  subject = request.GET.get('subject')
  subject = 'observationforgenetics'
  order_search = search(request, 'clinic',subject)

  datas = []
  for entry in order_search['entry']:
    for extension in entry['resource']['extension']:
      if extension['url'] == r'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence':
        url = extension['valueReference']['reference']
        access_token = request.COOKIES['genomic_access_token']
        resp = requests.get('%s/%s?_format=json'%(API_BASE, url),
              headers={'Accept': 'application/json','Authorization': 'Bearer %s'% access_token})
        data = resp.json()
        div = data['text']['div']
        _id = entry['resource']['id']
        entry = {
          'div': div,
          'id': subject + '/' +_id
        }
        datas.append(entry);

  le = len(datas);
  datas = {
    'total' : le,
    'entry' : datas,
  }

  return JsonResponse(datas, safe=False)

def search_specimen(request):
  subject = request.GET.get('subject')
  order_search = search(request, subject)
  #need to do something...
  return JsonResponse(order_search, safe=False)

def search_target(request):
  subject = request.GET.get('subject')
  if subject == 'Organization':
    datas={
      'total': 1,
      'entry':[
        {
          'div':'<div>Myriad Lab</div>',
          'id':'123456'
        }
      ]
    }
  return JsonResponse(datas, safe=False)

  order_search = search(request, 'clinic', subject)
  datas=[]
  entry={}
  if order_search['total'] != 0:
    for e in order_search['entry']:
      div = e['resource']['text']['div']
      _id = e['resource']['id']
      entry={
        'div': div,
        'id': subject + '/' +_id
      }
      datas.append(entry)

  datas={
    'total': order_search['total'],
    'entry': datas 
  }

  return JsonResponse(datas, safe=False)


def edit(request, id):
  order_search = search(request, 'orderforgenetics', {'id':id})
  entry = order_search['entry']
  order = None
  for e in entry:
    if e['resource']['id'] == id :
        order = e['resource']
        break

  specimen = ''
  if ('specimen' in order.keys()):
    specimen = order['specimen']
  priority = ''
  if ('priority' in order.keys()):
    priority = order['priority']
  reason = ''
  if (('reason' in order.keys())  and ('text' in order['reason'][0].keys())):
    reason = order['reason'][0]['text']
  sptinfo = ''
  if ('supportingInformation' in order.keys()):
    sptinfo = order['supportingInformation'][0]['reference']

  args = {
    'id':id,
    'order_id':order['identifier'][0]['value'],
    'status':order['status'],
    'subject':order['subject']['reference'],
    'orderer':order['orderer']['reference'],
    'encounter':get_ref('encounter',order),
    'reason':reason,
    'sptinfo':sptinfo,
    'specimen': specimen,
    'priority': priority,
    'event_list':order['event'],
    'event_status':order['event'][0]['status'],
    'event_actor':order['event'][0]['actor']['reference'],
    'event_datetime':order['event'][0]['dateTime'],
    'item_list': order['item'][0],
  }

  return render(request, 'edit.html', args)


@csrf_exempt
def updata(request):
  req = json.loads(request.body)
  diagnostic_order = req["diagnostic_order"]
  order = req["order"]
  #access_token = request.session.get('genomic_access_token')
  #access_token = request.COOKIES['genomic_access_token']
  #resp = requests.post('%s/Order?_format=json'% API_BASE,
  #          data=json.dumps(order), 
  #          headers={'Authorization': 'Bearer %s'% access_token})
  #print 'Order is OK'
  #print resp.json() 
  #order_id = resp.json() 
  #dorder['identifier'][0]['value'] = order_id["id"] 
  print '-'*20
  diagnostic_order = upload(request, 'genomic', diagnostic_order, url='orderforgenetics')
  return HttpResponse(json.dumps(dorder), content_type='application/json')

@csrf_exempt
def updataOrder(request):
  req = json.loads(request.body)
  dorder = req["diagnostic_order"]
  order = req["order"]
  #access_token = request.session.get('genomic_access_token')
  access_token = request.COOKIES['genomic_access_token']
  order_id = dorder["identifier"][0]['value']


  #resp = requests.put('%s/Order/%s' %(API_BASE, order_id),
   # data = json.dumps(order),
   # headers={'Authorization': 'Bearer %s'% access_token})
  #print resp.json()
  dorder_id = req["id"][:24]

  resp = requests.put('%s/orderforgenetics/%s' %(API_BASE,dorder_id),
            data=json.dumps(dorder), 
            headers={'Content-Type':'application/json','Authorization':'Bearer %s'% access_token})

  return HttpResponse(json.dumps(resp.json()), content_type='application/json')

def test(request):
  args={}
  args['session'] = request.COOKIES['genomic_access_token']
  #order_search = upload_seq(request, testJson)
  #order_search = delete(request, 'orderforgenetics', '35948c17-3c0d-4d05-a3b5-e34bae4b71d7')
  order_search = search(request, 'clinic', 'Encounter')
  
  return render(request, 'test.html', {'data':order_search})
  #upload_seq(request, testJson)
  #return render(request, 'test.html', {'data':'order_search'})

def main():
  return render(request, 'main.html')
