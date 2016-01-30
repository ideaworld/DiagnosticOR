# OAuth2 settings for communicating with clinical server
CLINICAL = {
    'client_id': 'aeda2b2f-3537-4fba-bb9c-8b54213be6f9',
    'redirect_uri': 'http://localhost:8000/clinic_recv_redirect/',
    'scopes': [
                'launch',
                'launch/patient',
                'launch/encounter',
                'patient/*.read',
                'user/*.*',
                'openid',
                'profile'
              ],
    'API_BASE': 'https://fhir-api-dstu2.smarthealthit.org',
    'AUTH_BASE': 'https://authorize-dstu2.smarthealthit.org/token',
    'CLINIC_SECRET': 'bpx0TDjk_LNjs9m8RFjQNN_nNByijn_2LPJCdEpKKd6aRollwoBnDK6G-qMm9EYzBc23QmiIZ6kDbExkbCOPOA'
}
# OAuth2 settings for communicating with genomic server
GENOMICS = {
    'client_id': 'ec06dbef-78c9-4045-9b8a-ecc5c04b3499',
    'redirect_uri': 'http://localhost:8000/recv_redirect/',
    'scopes': [
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
              ],
    'OAUTH_BASE': 'http://genomics-advisor.smartplatforms.org:2048/auth',
    'AUTH_BASE': 'https://authorize-dstu2.smarthealthit.org',
    'API_BASE': 'http://genomics-advisor.smartplatforms.org:2048/api',
    'RE_CLINICAL_URI': 'http://localhost:8000/clinic_launch.html'

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
