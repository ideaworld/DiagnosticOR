var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json(get_lab_orders());
});

module.exports = router;

var data = [
	{
	  "resourceType": "DiagnosticReport",
	  "id": "f001",
	  "text": {
	    "status": "generated",
	    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>contained</b>: </p><p><b>identifier</b>: nr1239044 (OFFICIAL)</p><p><b>status</b>: final</p><p><b>category</b>: Haematology test <span>(Details : {SNOMED CT code '252275004' = '252275004', given as 'Haematology test'}; {http://hl7.org/fhir/v2/0074 code 'HM' = 'Hematology)</span></p><p><b>code</b>: Complete blood count (hemogram) panel - Blood by Automated count <span>(Details : {LOINC code '58410-2' = 'Complete blood count (hemogram) panel - Blood by Automated count', given as 'Complete blood count (hemogram) panel - Blood by Automated count'})</span></p><p><b>subject</b>: <a>P. van den Heuvel</a></p><p><b>effective</b>: 02/04/2013</p><p><b>issued</b>: 15/05/2013 7:32:52 PM</p><p><b>performer</b>: <a>Burgers University Medical Centre</a></p><p><b>request</b>: id: req; P. van den Heuvel; L2381 (OFFICIAL); patient almost fainted during procedure <span>(Details )</span></p><p><b>result</b>: </p><ul><li><a>Observation/f001</a></li><li><a>Observation/f002</a></li><li><a>Observation/f003</a></li><li><a>Observation/f004</a></li><li><a>Observation/f005</a></li></ul><p><b>conclusion</b>: Core lab</p></div>"
	  },
	  "contained": [
	    {
	      "resourceType": "DiagnosticOrder",
	      "id": "req",
	      "subject": {
	        "reference": "Patient/f001",
	        "display": "P. van den Heuvel"
	      },
	      "orderer": {
	        "reference": "Practitioner/f001",
	        "display": "E.van den Broek"
	      },
	      "identifier": [
	        {
	          "use": "official",
	          "system": "http://www.bmc.nl/zorgportal/identifiers/labresults",
	          "value": "L2381"
	        }
	      ],
	      "encounter": {
	        "fhir_comments": [
	          "   TODO Correcte verwijzing   "
	        ],
	        "reference": "Encounter/f001"
	      },
	      "reason": [
	        {
	          "text": "patient almost fainted during procedure"
	        }
	      ],
	      "item": [
	        {
	          "code": {
	            "coding": [
	              {
	                "system": "http://loinc.org",
	                "code": "58410-2",
	                "_code": {
	                  "fhir_comments": [
	                    "     LOINC     "
	                  ]
	                },
	                "display": "Complete blood count (hemogram) panel - Blood by Automated count"
	              }
	            ]
	          },
	          "bodySite": {
	            "coding": [
	              {
	                "system": "http://snomed.info/sct",
	                "code": "14975008",
	                "display": "Forearm structure"
	              }
	            ]
	          }
	        }
	      ]
	    }
	  ],
	  "identifier": [
	    {
	      "use": "official",
	      "system": "http://www.bmc.nl/zorgportal/identifiers/reports",
	      "value": "nr1239044"
	    }
	  ],
	  "status": "final",
	  "category": {
	    "coding": [
	      {
	        "system": "http://snomed.info/sct",
	        "code": "252275004",
	        "display": "Haematology test"
	      },
	      {
	        "system": "http://hl7.org/fhir/v2/0074",
	        "code": "HM"
	      }
	    ]
	  },
	  "code": {
	    "coding": [
	      {
	        "system": "http://loinc.org",
	        "code": "58410-2",
	        "display": "Complete blood count (hemogram) panel - Blood by Automated count"
	      }
	    ]
	  },
	  "subject": {
	    "fhir_comments": [
	      "    ISO 8601    "
	    ],
	    "reference": "Patient/f001",
	    "display": "P. van den Heuvel"
	  },
	  "effectiveDateTime": "2013-04-02",
	  "issued": "2013-05-15T19:32:52+01:00",
	  "_issued": {
	    "fhir_comments": [
	      "    OID: 2.16.840.1.113883.4.642.1.7    "
	    ]
	  },
	  "performer": {
	    "reference": "Organization/f001",
	    "display": "Burgers University Medical Centre"
	  },
	  "request": [
	    {
	      "reference": "#req"
	    }
	  ],
	  "result": [
	    {
	      "reference": "Observation/f001"
	    },
	    {
	      "reference": "Observation/f002"
	    },
	    {
	      "reference": "Observation/f003"
	    },
	    {
	      "reference": "Observation/f004"
	    },
	    {
	      "reference": "Observation/f005"
	    }
	  ],
	  "conclusion": "Core lab"
	},
	{
	  "resourceType": "DiagnosticReport",
	  "id": "lipids",
	  "text": {
	    "status": "generated",
	    "div": "<div>\n      \n      \n      <h3>Lipid Report for Wile. E. COYOTE (MRN: 23453) issued 3-Mar 2009 14:26</h3>\n      \n      \n      <pre>\nTest                  Units       Value       Reference Range\nCholesterol           mmol/L      6.3         &lt;4.5\nTriglyceride          mmol/L      1.3         &lt;2.0\nHDL Cholesterol       mmol/L      1.3         &gt;1.5\nLDL Chol. (calc)      mmol/L      4.2         &lt;3.0\n      </pre>\n      \n      \n      <p>Acme Laboratory, Inc signed: Dr Pete Pathologist</p>\n    \n    \n    </div>"
	  },
	  "contained": [
	    {
	      "resourceType": "Observation",
	      "id": "cholesterol",
	      "_id": {
	        "fhir_comments": [
	          "   \n\t  all the data items (= Observations) are contained\n\t  in this diagnostic report. It would be equally\n      valid - and normal - for them to be separate trackable\n      items. However for the purposes of this example, it's\n\t  more convenient to have them here. For more discussion,\n\t  see under \"Contained Resources\" on the Resource Definitions\n\t  topic page     ",
	          "     for users steeped in v2, each observation roughly corresponds with an\n\t    OBX, and the Diagnostic Report with an ORU_R01 message     "
	        ]
	      },
	      "status": "final",
	      "code": {
	        "coding": [
	          {
	            "system": "http://loinc.org",
	            "code": "35200-5"
	          }
	        ],
	        "text": "Cholesterol"
	      },
	      "subject": {
	        "reference": "Patient/pat2"
	      },
	      "performer": [
	        {
	          "reference": "Organization/1832473e-2fe0-452d-abe9-3cdb9879522f",
	          "display": "Acme Laboratory, Inc"
	        }
	      ],
	      "valueQuantity": {
	        "value": 6.3,
	        "unit": "mmol/L",
	        "system": "http://unitsofmeasure.org",
	        "code": "mmol/L"
	      },
	      "referenceRange": [
	        {
	          "high": {
	            "value": 4.5,
	            "unit": "mmol/L",
	            "system": "http://unitsofmeasure.org",
	            "code": "mmol/L"
	          }
	        }
	      ]
	    },
	    {
	      "resourceType": "Observation",
	      "id": "triglyceride",
	      "status": "final",
	      "code": {
	        "coding": [
	          {
	            "system": "http://loinc.org",
	            "code": "35217-9"
	          }
	        ],
	        "text": "Triglyceride"
	      },
	      "subject": {
	        "reference": "Patient/pat2"
	      },
	      "performer": [
	        {
	          "reference": "Organization/1832473e-2fe0-452d-abe9-3cdb9879522f",
	          "display": "Acme Laboratory, Inc"
	        }
	      ],
	      "valueQuantity": {
	        "value": 1.3,
	        "unit": "mmol/L",
	        "system": "http://unitsofmeasure.org",
	        "code": "mmol/L"
	      },
	      "referenceRange": [
	        {
	          "high": {
	            "value": 2.0,
	            "unit": "mmol/L",
	            "system": "http://unitsofmeasure.org",
	            "code": "mmol/L"
	          }
	        }
	      ]
	    },
	    {
	      "resourceType": "Observation",
	      "id": "hdlcholesterol",
	      "status": "final",
	      "code": {
	        "coding": [
	          {
	            "system": "http://loinc.org",
	            "code": "2085-9"
	          }
	        ],
	        "text": "Cholesterol in HDL"
	      },
	      "subject": {
	        "reference": "Patient/pat2"
	      },
	      "performer": [
	        {
	          "reference": "Organization/1832473e-2fe0-452d-abe9-3cdb9879522f",
	          "display": "Acme Laboratory, Inc"
	        }
	      ],
	      "valueQuantity": {
	        "value": 1.3,
	        "unit": "mmol/L",
	        "system": "http://unitsofmeasure.org",
	        "code": "mmol/L"
	      },
	      "referenceRange": [
	        {
	          "low": {
	            "value": 1.5,
	            "unit": "mmol/L",
	            "system": "http://unitsofmeasure.org",
	            "code": "mmol/L"
	          }
	        }
	      ]
	    },
	    {
	      "resourceType": "Observation",
	      "id": "ldlcholesterol",
	      "status": "final",
	      "code": {
	        "coding": [
	          {
	            "system": "http://loinc.org",
	            "code": "13457-7"
	          }
	        ],
	        "text": "LDL Chol. (Calc)"
	      },
	      "subject": {
	        "reference": "Patient/pat2"
	      },
	      "performer": [
	        {
	          "reference": "Organization/1832473e-2fe0-452d-abe9-3cdb9879522f",
	          "display": "Acme Laboratory, Inc"
	        }
	      ],
	      "valueQuantity": {
	        "value": 4.6,
	        "unit": "mmol/L",
	        "system": "http://unitsofmeasure.org",
	        "code": "mmol/L"
	      },
	      "referenceRange": [
	        {
	          "high": {
	            "value": 3.0,
	            "unit": "mmol/L",
	            "system": "http://unitsofmeasure.org",
	            "code": "mmol/L"
	          }
	        }
	      ]
	    }
	  ],
	  "identifier": [
	    {
	      "system": "http://acme.com/lab/reports",
	      "value": "5234342"
	    }
	  ],
	  "status": "final",
	  "category": {
	    "coding": [
	      {
	        "system": "http://hl7.org/fhir/v2/0074",
	        "code": "HM"
	      }
	    ]
	  },
	  "code": {
	    "fhir_comments": [
	      "     first, various administrative/context stuff     "
	    ],
	    "coding": [
	      {
	        "system": "http://loinc.org",
	        "code": "57698-3",
	        "display": "Lipid panel with direct LDL - Serum or Plasma"
	      }
	    ],
	    "text": "Lipid Panel"
	  },
	  "subject": {
	    "reference": "Patient/pat2"
	  },
	  "effectiveDateTime": "2011-03-04T08:30:00+11:00",
	  "issued": "2013-01-27T11:45:33+11:00",
	  "_issued": {
	    "fhir_comments": [
	      "     all this report is final     "
	    ]
	  },
	  "performer": {
	    "reference": "Organization/1832473e-2fe0-452d-abe9-3cdb9879522f",
	    "display": "Acme Laboratory, Inc"
	  },
	  "result": [
	    {
	      "fhir_comments": [
	        "     now the atomic results     "
	      ],
	      "reference": "#cholesterol"
	    },
	    {
	      "reference": "#triglyceride"
	    },
	    {
	      "reference": "#hdlcholesterol"
	    },
	    {
	      "reference": "#ldlcholesterol"
	    }
	  ]
	},
	{
	  "resourceType": "DiagnosticReport",
	  "id": "f202",
	  "text": {
	    "status": "generated",
	    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f202</p><p><b>contained</b>: </p><p><b>status</b>: final</p><p><b>category</b>: Laboratory test <span>(Details : {SNOMED CT code '15220000' = '15220000', given as 'Laboratory test'}; {http://hl7.org/fhir/v2/0074 code 'LAB' = 'Laboratory)</span></p><p><b>code</b>: Blood culture for bacteria, including anaerobic screen <span>(Details : {SNOMED CT code '104177005' = '104177005', given as 'Blood culture for bacteria, including anaerobic screen'})</span></p><p><b>subject</b>: <a>Roel</a></p><p><b>effective</b>: 11/03/2013 3:45:00 AM</p><p><b>issued</b>: 11/03/2013 10:28:00 AM</p><p><b>performer</b>: <a>AUMC</a></p><p><b>request</b>: id: req; Roel</p><p><b>result</b>: <a>Results for staphylococcus analysis on Roel's blood culture</a></p><p><b>conclusion</b>: Blood culture tested positive on staphylococcus aureus</p><p><b>codedDiagnosis</b>: Bacteremia due to staphylococcus <span>(Details : {SNOMED CT code '428763004' = '428763004', given as 'Bacteremia due to staphylococcus'})</span></p></div>"
	  },
	  "contained": [
	    {
	      "resourceType": "DiagnosticOrder",
	      "id": "req",
	      "subject": {
	        "reference": "Patient/f201",
	        "display": "Roel"
	      },
	      "orderer": {
	        "reference": "Practitioner/f201",
	        "display": "Dokter Bronsig"
	      },
	      "encounter": {
	        "reference": "Encounter/f203",
	        "display": "Roel's encounter on March eleventh 2013"
	      }
	    }
	  ],
	  "status": "final",
	  "category": {
	    "coding": [
	      {
	        "fhir_comments": [
	          "   Lab test   "
	        ],
	        "system": "http://snomed.info/sct",
	        "code": "15220000",
	        "display": "Laboratory test"
	      },
	      {
	        "system": "http://hl7.org/fhir/v2/0074",
	        "code": "LAB"
	      }
	    ]
	  },
	  "code": {
	    "coding": [
	      {
	        "system": "http://snomed.info/sct",
	        "code": "104177005",
	        "display": "Blood culture for bacteria, including anaerobic screen"
	      }
	    ]
	  },
	  "subject": {
	    "reference": "Patient/f201",
	    "display": "Roel"
	  },
	  "effectiveDateTime": "2013-03-11T03:45:00+01:00",
	  "issued": "2013-03-11T10:28:00+01:00",
	  "performer": {
	    "reference": "Organization/f201",
	    "display": "AUMC"
	  },
	  "request": [
	    {
	      "fhir_comments": [
	        "   No identifier was available   "
	      ],
	      "reference": "#req"
	    }
	  ],
	  "result": [
	    {
	      "reference": "Observation/f206",
	      "display": "Results for staphylococcus analysis on Roel's blood culture"
	    }
	  ],
	  "conclusion": "Blood culture tested positive on staphylococcus aureus",
	  "codedDiagnosis": [
	    {
	      "coding": [
	        {
	          "system": "http://snomed.info/sct",
	          "code": "428763004",
	          "display": "Bacteremia due to staphylococcus"
	        }
	      ]
	    }
	  ]
	},
	{
	  "resourceType": "DiagnosticReport",
	  "id": "f201",
	  "text": {
	    "status": "generated",
	    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f201</p><p><b>status</b>: final</p><p><b>category</b>: Radiology <span>(Details : {SNOMED CT code '394914008' = '394914008', given as 'Radiology'}; {http://hl7.org/fhir/v2/0074 code 'RAD' = 'Radiology)</span></p><p><b>code</b>: CT of head-neck <span>(Details : {SNOMED CT code '429858000' = '429858000', given as 'Computed tomography (CT) of head and neck'})</span></p><p><b>subject</b>: <a>Roel</a></p><p><b>effective</b>: 01/12/2012 12:00:00 PM</p><p><b>issued</b>: 01/12/2012 12:00:00 PM</p><p><b>performer</b>: <a>Blijdorp MC</a></p><p><b>imagingStudy</b>: HEAD and NECK CT DICOM imaging study</p><p><b>conclusion</b>: CT brains: large tumor sphenoid/clivus.</p><p><b>codedDiagnosis</b>: Malignant tumor of craniopharyngeal duct <span>(Details : {SNOMED CT code '188340000' = '188340000', given as 'Malignant tumor of craniopharyngeal duct'})</span></p></div>"
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
	        "code": "429858000",
	        "display": "Computed tomography (CT) of head and neck"
	      }
	    ],
	    "text": "CT of head-neck"
	  },
	  "subject": {
	    "reference": "Patient/f201",
	    "display": "Roel"
	  },
	  "effectiveDateTime": "2012-12-01T12:00:00+01:00",
	  "issued": "2012-12-01T12:00:00+01:00",
	  "performer": {
	    "reference": "Organization/f203",
	    "display": "Blijdorp MC"
	  },
	  "imagingStudy": [
	    {
	      "fhir_comments": [
	        "   The actual CT imagenot available -  following reference used to demonstrate the usage of the element  "
	      ],
	      "display": "HEAD and NECK CT DICOM imaging study"
	    }
	  ],
	  "conclusion": "CT brains: large tumor sphenoid/clivus.",
	  "codedDiagnosis": [
	    {
	      "coding": [
	        {
	          "system": "http://snomed.info/sct",
	          "code": "188340000",
	          "display": "Malignant tumor of craniopharyngeal duct"
	        }
	      ]
	    }
	  ]
	}
]

function get_lab_orders(){
	return data;
}
