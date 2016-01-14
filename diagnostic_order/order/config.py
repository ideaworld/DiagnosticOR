# OAuth2 settings for communicating with clinical server
CLINICAL = {
    'client_id': '5e3a370c-1fff-41d6-a4ef-d177c19357e7',
    'redirect_uri': 'http://localhost:8000/',
    'scopes': [
               'launch',
               'launch/patient',
               'launch/encounter',
               'patient/*.read',
               'user/*.*',
               'openid',
               'profile'
               ]
}
# OAuth2 settings for communicating with genomic server
GENOMICS = {
    'client_id': 'a230d3be-e35e-43b8-a30e-befe6b2c70ea',
    'redirect_uri': 'http://genomics-advisor.smartplatforms.org:2048/',
    'scopes': ['user/Sequence.read', 'user/Patient.read','user/Sequence.write'],
    'oauth_base': 'http://genomics-advisor.smartplatforms.org:8005/auth',
    'api_base': 'http://genomics-advisor.smartplatforms.org:8005/api'

}


# choose a secret key here:
SECRET_KEY = 'hello, world!'
GOOGLE_API_KEY = 'AIzaSyB01GeX_HiuZbHCkZ-P5hJ7yUHVkwFS07Q'

CLIENT_ID ='aeda2b2f-3537-4fba-bb9c-8b54213be6f9'
GENOMIC_ID = '527fa711-8869-4cb2-b597-d922c70a89a9'
GENOMICSCOPE = [
'user/Sequence.read', 
'user/Patient.read',
'user/Sequence.write', 
'user/Observation.read',
'user/Specimen.read',
'user/Practitioner.read',
'user/Order.read',
'user/Order.write',
'user/orderforgenetics.read',
'user/orderforgenetics.write',
'user/observationforgenetics.read',
'user/observationforgenetics.write',
'user/Encounter.read',
'user/Organization.read'
]
CLINICSCOPES = [
'launch',
'launch/patient',
'launch/encounter',
'patient/*.read',
'user/*.*',
'openid',
'profile'
]
redirect_uri = 'http://localhost:8000/'
REDIRECT_URI = 'http://localhost:8000/recv_redirect/'
CLINIC_REDIRECT_URI = 'http://localhost:8000/clinic_recv_redirect/'
AUTH_BASE = 'https://authorize-dstu2.smarthealthit.org'
#API_BASE = 'https://fhir-api-dstu2.smarthealthit.org'
API_BASE = 'http://genomics-advisor.smartplatforms.org:2048/api'
#API_BASE = 'http://localhost:2048/api'
CLINIC_SECRET = 'bpx0TDjk_LNjs9m8RFjQNN_nNByijn_2LPJCdEpKKd6aRollwoBnDK6G-qMm9EYzBc23QmiIZ6kDbExkbCOPOA'
ID_SRCRET_BASE64 = 'ZTI5ZmI1MjMtMTQ4OS00N2JiLWIxNjMtMzliNWNhZTg2NmU4OkFMZHFlclpDRzNPalNibUE0SUFFRXNDNWpvdDliUnFqbmJrZ04tek1oUDhtWFNTakpqUExsQ3pwa2dfN09BVXg2UVNqU2ZSZXpzTE8xbmpIcEs5ZlJkZw=='
