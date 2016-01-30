from config import CLINICAL, GENOMICS
import requests

def get_api(api):
  if api == 'clinic':
    return CLINICAL['API_BASE']
  else:
    return GENOMICS['API_BASE']

def read(request, api, id, url):
  access_token = api+'_access_token'
  access_token = request.COOKIES[access_token]
  resp = requests.get('%s/%s/%s?_format=json'%(get_api(api), url, id),
              headers={'Accept': 'application/json',
              'Authorization': 'Bearer %s'% access_token})
  return resp.json()


def upload(request, api, data, url='orderforgenetics'):
  access_token = request.COOKIES['genomic_access_token']
  resp = requests.post('%s/orderforgenetics?_format=json'% GENOMICS['API_BASE'],
            data=json.dumps(data), 
            headers={'Authorization': 'Bearer %s'% access_token})
  return resp.json()

def search(request, api, url):
  access_token = api+'_access_token'
  access_token = request.COOKIES[access_token]
  resp = requests.get('%s/%s?_format=json'% (get_api(api), url),
                        headers={'Accept': 'application/json',
                        'Authorization': 'Bearer %s'% access_token})
  return resp.json()
def delete(request, id, type):
  access_token = request.COOKIES['genomic_access_token']
  resp = requests.delete('%s/%s/%s?_format=json'%(GENOMICS['API_BASE'],type, id),
                          headers={'Accept': 'application/json',
                        'Authorization': 'Bearer %s'% access_token})
  return resp.json()
