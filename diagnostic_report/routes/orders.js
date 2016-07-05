/* author: Bowen */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json(get_lab_orders());
});

module.exports = router;

var data = [
	{
	  "resourceType": "DiagnosticOrder",
	  "id": "ft4",
	  "text": {
	    "status": "generated",
	    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: ft4</p><p><b>contained</b>: </p><p><b>subject</b>: <a>Patient/pat2</a></p><p><b>orderer</b>: <a>Practitioner/example</a></p><p><b>specimen</b>: Red Top Tube. Generated Summary: id: rtt; Serum sample <span>(Details : {SNOMED CT code '119364003' = '119364003', given as 'Serum sample'})</span>; Patient/pat2; 20150816-00124</p><p><b>status</b>: requested</p><h3>Events</h3><table><tr><td>-</td><td><b>Status</b></td><td><b>DateTime</b></td></tr><tr><td>*</td><td>requested</td><td>27/08/2015 9:33:27 AM</td></tr></table><h3>Items</h3><table><tr><td>-</td><td><b>Code</b></td></tr><tr><td>*</td><td>Free T4 <span>(Details : {LOINC code '3024-7' = 'Thyroxine (T4) free [Mass/volume] in Serum or Plasma)</span></td></tr></table></div>"
	  },
	  "contained": [
	    {
	      "resourceType": "Specimen",
	      "id": "rtt",
	      "type": {
	        "coding": [
	          {
	            "system": "http://snomed.info/sct",
	            "code": "119364003",
	            "display": "Serum sample"
	          }
	        ]
	      },
	      "subject": {
	        "reference": "Patient/pat2"
	      },
	      "accessionIdentifier": {
	        "system": "http://acme.com/labs/accession-ids",
	        "value": "20150816-00124"
	      },
	      "collection": {
	        "collector": {
	          "reference": "Practitioner/f202"
	        },
	        "collectedDateTime": "2015-08-16T06:40:17Z"
	      },
	      "container": [
	        {
	          "type": {
	            "coding": [
	              {
	                "system": "http://acme.com/labs",
	                "code": "SST",
	                "display": "Serum Separator Tube"
	              }
	            ]
	          }
	        }
	      ]
	    }
	  ],
	  "subject": {
	    "reference": "Patient/pat2"
	  },
	  "orderer": {
	    "reference": "Practitioner/example"
	  },
	  "specimen": [
	    {
	      "reference": "#rtt",
	      "display": "Red Top Tube"
	    }
	  ],
	  "status": "requested",
	  "event": [
	    {
	      "status": "requested",
	      "dateTime": "2015-08-27T09:33:27+07:00"
	    }
	  ],
	  "item": [
	    {
	      "code": {
	        "coding": [
	          {
	            "system": "http://loinc.org",
	            "code": "3024-7"
	          }
	        ],
	        "text": "Free T4"
	      }
	    }
	  ]
	},
	{
	  "resourceType": "DiagnosticOrder",
	  "id": "di",
	  "text": {
	    "status": "generated",
	    "div": "<div>\n\t\t\t<p>Chest CT - ordered May 8, 2013 by Dr. Adam Careful</p>\n\t\t</div>"
	  },
	  "subject": {
	    "reference": "Patient/dicom"
	  },
	  "orderer": {
	    "reference": "Practitioner/example",
	    "display": "Dr. Adam Careful"
	  },
	  "reason": [
	    {
	      "text": "Check for metastatic disease"
	    }
	  ],
	  "status": "requested",
	  "event": [
	    {
	      "status": "requested",
	      "dateTime": "2013-05-08T09:33:27+07:00"
	    }
	  ],
	  "item": [
	    {
	      "code": {
	        "coding": [
	          {
	            "system": "http://loinc.org",
	            "code": "24627-2"
	          }
	        ],
	        "text": "Chest CT"
	      },
	      "bodySite": {
	        "coding": [
	          {
	            "system": "http://snomed.info/sct",
	            "code": "51185008",
	            "display": "Thoracic structure"
	          }
	        ]
	      }
	    }
	  ]
	},
	{
	  "resourceType": "DiagnosticOrder",
	  "id": "example",
	  "text": {
	    "status": "generated",
	    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example</p><p><b>contained</b>: </p><p><b>subject</b>: <a>Patient/example</a></p><p><b>orderer</b>: <a>Practitioner/example</a></p><p><b>identifier</b>: Placer = 2345234234234</p><p><b>encounter</b>: <a>Encounter/example</a></p><p><b>reason</b>: Fam hx-ischem heart dis <span>(Details : {ICD-9 code 'V173' = '??', given as 'Fam hx-ischem heart dis'})</span></p><p><b>supportingInformation</b>: id: fasting; status: final; Fasting status - Reported <span>(Details : {LOINC code '49541-6' = 'Fasting status - Reported', given as 'Fasting status - Reported'})</span>; Patient/example; Yes <span>(Details : {http://hl7.org/fhir/v2/0136 code 'Y' = 'Yes', given as 'Yes'})</span></p><p><b>status</b>: received</p><h3>Events</h3><table><tr><td>-</td><td><b>Status</b></td><td><b>DateTime</b></td><td><b>Actor</b></td></tr><tr><td>*</td><td>requested</td><td>02/05/2013 4:16:00 PM</td><td><a>Practitioner/example</a></td></tr></table><h3>Items</h3><table><tr><td>-</td><td><b>Code</b></td><td><b>Specimen</b></td></tr><tr><td>*</td><td>Lipid Panel <span>(Details : {http://acme.org/tests code 'LIPID' = '??)</span></td><td><a>Specimen/101</a></td></tr></table><p><b>note</b>: patient is afraid of needles</p></div>"
	  },
	  "contained": [
	    {
	      "resourceType": "Observation",
	      "id": "fasting",
	      "status": "final",
	      "_status": {
	        "fhir_comments": [
	          "    the mandatory quality flag:    "
	        ]
	      },
	      "code": {
	        "coding": [
	          {
	            "system": "http://loinc.org",
	            "code": "49541-6",
	            "display": "Fasting status - Reported"
	          }
	        ]
	      },
	      "subject": {
	        "reference": "Patient/example"
	      },
	      "valueCodeableConcept": {
	        "coding": [
	          {
	            "system": "http://hl7.org/fhir/v2/0136",
	            "code": "Y",
	            "display": "Yes"
	          }
	        ]
	      }
	    }
	  ],
	  "subject": {
	    "reference": "Patient/example"
	  },
	  "orderer": {
	    "reference": "Practitioner/example"
	  },
	  "identifier": [
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
	  ],
	  "encounter": {
	    "reference": "Encounter/example"
	  },
	  "reason": [
	    {
	      "coding": [
	        {
	          "system": "http://hl7.org/fhir/sid/icd-9",
	          "code": "V173",
	          "display": "Fam hx-ischem heart dis"
	        }
	      ]
	    }
	  ],
	  "supportingInformation": [
	    {
	      "reference": "#fasting"
	    }
	  ],
	  "status": "received",
	  "event": [
	    {
	      "status": "requested",
	      "dateTime": "2013-05-02T16:16:00-07:00",
	      "actor": {
	        "reference": "Practitioner/example"
	      }
	    },
			{
	      "fhir_comments": [
	        "   EH:  the event is the order placer requesting a test  "
	      ],
	      "status": "requested",
	      "_status": {
	        "fhir_comments": [
	          "   EH this is set to 'requested' by the Placer is required element in core resource  "
	        ]
	      },
	      "description": {
	        "fhir_comments": [
	          "   EH:bound to closed value setUSLAB Diagnostic Order Event Codes  "
	        ],
	        "coding": [
	          {
	            "code": "new-request"
	          }
	        ]
	      },
	      "dateTime": "2014-12-04T15:42:15-08:00",
	      "_dateTime": {
	        "fhir_comments": [
	          "   EH: Showing dateTime to ss with TZO although only needed to Day   "
	        ]
	      }
	    }
	  ],
	  "item": [
	    {
	      "code": {
	        "coding": [
	          {
	            "system": "http://acme.org/tests",
	            "code": "LIPID"
	          }
	        ],
	        "text": "Lipid Panel"
	      },
	      "specimen": [
	        {
	          "reference": "Specimen/101"
	        }
	      ]
	    }
	  ],
	  "note": [
	    {
	      "text": "patient is afraid of needles"
	    }
	  ]
	},
];

function get_lab_orders(){
	return data;
}
