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
    'client_id': 'c9b6762c-fd94-4ea2-86e3-9ad5ac50e904',
    'redirect_uri': 'http://localhost:8000/recv_redirect/',
    'scopes': ['user/Sequence.read', 'user/Patient.read','user/Sequence.write'],
    'oauth_base': 'http://genomics-advisor.smartplatforms.org:8005/auth',
    'api_base': 'http://genomics-advisor.smartplatforms.org:8005/api'

}


# choose a secret key here:
SECRET_KEY = 'hello, world!'
GOOGLE_API_KEY = 'AIzaSyB01GeX_HiuZbHCkZ-P5hJ7yUHVkwFS07Q'

CLIENT_ID ='e29fb523-1489-47bb-b163-39b5cae866e8'
GENOMIC_ID = 'c9b6762c-fd94-4ea2-86e3-9ad5ac50e904'
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
'user/Organization.read',
'user/DiagnosticOrder.read',
'user/DiagnosticOrder.write'
]
SCOPES = [
'launch',
'launch/patient',
'launch/encounter',
'patient/*.read',
'user/*.*',
'openid',
'profile']
redirect_uri = 'http://localhost:8000/'
REDIRECT_URI = 'http://localhost:8000/recv_redirect/'
AUTH_BASE = 'https://authorize-dstu2.smarthealthit.org'
#API_BASE = 'https://fhir-api-dstu2.smarthealthit.org'
API_BASE = 'http://genomics-advisor.smartplatforms.org:2048/api'
#API_BASE = 'http://localhost:2048/api'

ID_SRCRET_BASE64 = 'ZTI5ZmI1MjMtMTQ4OS00N2JiLWIxNjMtMzliNWNhZTg2NmU4OkFMZHFlclpDRzNPalNibUE0SUFFRXNDNWpvdDliUnFqbmJrZ04tek1oUDhtWFNTakpqUExsQ3pwa2dfN09BVXg2UVNqU2ZSZXpzTE8xbmpIcEs5ZlJkZw=='

testJson = {
    "resourceType": "orderforgenetics",
    "extension": [
                  {
                  "extension": [
                                {
                                "url": "code",
                                "valueCodeableConcept": {
                                "coding": [
                                           {
                                           "system": "http://loinc.org",
                                           "code": "49874-1"
                                           }
                                           ],
                                "text": "ABCB4 gene mutation analysis"
                                }
                                },
                                {
                                "url": "sequence",
                                "valueReference": {
                                "reference": "Sequence/example"
                                }
                                }
                                ],
                  "url": "http://hl7.org/fhir/StructureDefinition/diagnosticorder-geneticsItem"
                  }
                  ],
    "subject": {
        "reference": "Patient/example"
    },
    "orderer": {
        "reference": "Practitioner/example"
    },
    "encounter": {
        "reference": "Encounter/example"
    },
    "status": "received",
    "event": [
              {
              "status": "requested",
              "dateTime": "2014-05-12T16:16:00-07:00",
              "actor": {
              "reference": "Practitioner/456"
              }
              }
              ]
}
REPORT = {
  "resourceType": "DiagnosticReport",
  "id": "ultrasound",
  "text": {
    "status": "generated",
    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: ultrasound</p><p><b>status</b>: final</p><p><b>category</b>: Radiology <span>(Details : {SNOMED CT code '394914008' = 'Radiology - specialty (qualifier value)', given as 'Radiology'}; {http://hl7.org/fhir/v2/0074 code 'RAD' = 'Radiology)</span></p><p><b>code</b>: Abdominal Ultrasound <span>(Details : {SNOMED CT code '45036003' = 'Ultrasonography of abdomen (procedure)', given as 'Ultrasonography of abdomen'})</span></p><p><b>subject</b>: <a>Patient/example</a></p><p><b>effective</b>: 2012-12-1 12:00:00</p><p><b>issued</b>: 2012-12-1 12:00:00</p><p><b>performer</b>: <a>Practitioner/example</a></p><h3>Images</h3><table><tr><td>-</td><td><b>Comment</b></td><td><b>Link</b></td></tr><tr><td>*</td><td>A comment about the image</td><td><a>WADO example image</a></td></tr></table><p><b>conclusion</b>: Unremarkable study</p></div>"
  },
  "status": "final",
  "category": {
    "fhir_comments": [
      "   No identifier or request details were available   "
    ],
    "coding": [
      {
        "fhir_comments": [
          "   The request was honored by the Department of Radiology   "
        ],
        "system": "http://snomed.info/sct",
        "code": "394914008",
        "display": "Radiology"
      },
      {
        "system": "http://hl7.org/fhir/v2/0074",
        "code": "RAD"
      }
    ]
  },
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "45036003",
        "display": "Ultrasonography of abdomen"
      }
    ],
    "text": "Abdominal Ultrasound"
  },
  "subject": {
    "reference": "Patient/example"
  },
  "effectiveDateTime": "2012-12-01T12:00:00+01:00",
  "issued": "2012-12-01T12:00:00+01:00",
  "performer": {
    "reference": "Practitioner/example"
  },
  "image": [
    {
      "comment": "A comment about the image",
      "link": {
        "reference": "Media/1.2.840.11361907579238403408700.3.0.14.19970327150033",
        "display": "WADO example image"
      }
    }
  ],
  "conclusion": "Unremarkable study"
}

INDENTIFIER = [
{
    "type": {
      "coding": [
        {
          "system": "http://hl7.org/fhir/identifier-type",
          "code": "PLAC"
        }
      ],
      "text": "Placer"
    },
    "system": "urn:oid:1.3.4.5.6.7",
    "value": "2345234234234"
  }
]

testJ = {
    'resourceType': 'orderforgenetics',
    'status': 'requested',
    'reason': [
        {
            'text': '1',
        }
    ],
    'item': [
        {
            'code': {
                'coding': [
                    {
                        'code': '1',
                        'system': '1',
                        'display': '1'
                    }
                ]
            },
            'bodySite': {
                'coding': [
                    {
                        'code': '1',
                        'system': '1',
                        'display': '1'
                    }
                ]
            }
        }
    ],
    'orderer': {
      'reference': 'Practitioner/1234'
    ,
    },
    'supportingInformation': [
        {
            'reference': 'https: //fhir-api-dstu2.smarthealthit.org/Observation/1726-lab'
        }
    ],
    'identifier': [
        {
            'system': '1',
            'value': '1'
        }
    ],
    'encounter': {
        'reference': 'Patient/1272431--Encounter/238'
    },
    'subject': {
        'reference': 'Patient/765583'
    },
    "text": {
      "status": "generated",
      "div": "<div>\n\t\t\t<p>Chest CT - ordered May 8, 2013 by Dr. Adam Careful</p>\n\t\t</div>"
    },
}
