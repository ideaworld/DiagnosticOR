/* author: Bowen */
var report = {
  resourceType: 'DiagnosticReport',
  id: 'dg1',
  text: {
    status: 'generated',
    div: "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: dg1</p><p><b>contained</b>: , , , , </p><p><b>status</b>: final</p><p><b>category</b>: Laboratory test <span>(Details : {SNOMED CT code '15220000' = 'Laboratory test (procedure)', given as 'Laboratory test'}; {http://hl7.org/fhir/v2/0074 code 'LAB' = 'Laboratory)</span></p><p><b>code</b>: ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span></p><p><b>subject</b>: <a>Molecular Lab Patient ID: HOSP-23456</a></p><p><b>effective</b>: 2014-3-4 8:30:00</p><p><b>issued</b>: 2014-5-16 10:28:00</p><p><b>performer</b>: <a>Molecular Diagnostic Laboratory</a></p><p><b>specimen</b>: <a>Molecular Specimen ID: MLD45-Z4-1234</a></p><p><b>result</b>: </p><ul><li>Genetic analysis master panel for ABCB4 -variant1. Generated Summary: id: od-1; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li><li>Genetic analysis master panel for ABCB4 -variant2. Generated Summary: id: od-2; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li><li>Genetic analysis master panel for ABCB4 -variant3. Generated Summary: id: od-3; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li><li>Genetic analysis master panel for ABCB4 -variant4. Generated Summary: id: od-4; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li></ul></div>"
  },
  contained: [
    {
      resourceType: 'Condition',
      id: 'c1',
      patient: {
        reference: 'Patient/p1'
      },
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: 254626006
          }
        ],
        text: 'Adenocarcinoma of lung' 
      },
      category: {
        coding: [
          {
            system: 'http://hl7.org/fhir/condition-category',
            code: 'finding',
            display: 'Finding'
          }
        ]
      },
      verificationStatus: 'provisional'
    },
    {
      resourceType: 'Observation',
      id: 'od-1',
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence',
          valueReference: {
            reference: 'Sequence/seq2-1'
          }
        },
        {
          extension: [
            {
              url: 'genomeBuild',
              valueCodeableConcept: {
                text: 'GRCh 38'
              }
            },
            {
              url: 'name',
              valueCodeableConcept: {
                text: 'c.2708T>C'
              }
            }
          ],
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS'
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsGene',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://www.genenames.org',
                code: 5244,
                display: 'ABCB4'
              }
            ]
          }
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion',
          valueCodeableConcept: {
            text: 'Exon 23'
          }
        }
      ],
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '49874-1',
            display: 'ABCB4 gene mutation analysis'
          }
        ]
      },
      interpretation: {
        coding: [
          {
            system: 'http://hl7.org/fhir/v2/0078',
            code: 'POS'
          }
        ],
        text: 'positive'
      },
      component: [
        {
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '53037-8',
                display: 'Genetic disease sequence variation interpretation'
              }
            ]
          },
          valueCodeableConcept: {
            coding: [
              {
                code: 'LA6682-4',
                display: 'Unknown significance'
              }
            ]
          }
        }
      ]
    },
    {
      resourceType: 'Observation',
      id: 'od-2',
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence',
          valueReference: {
            reference: 'Sequence/seq2-2'
          }
        },
        {
          extension: [
            {
              url: 'genomeBuild',
              valueCodeableConcept: {
                text: 'GRCh 38'
              }
            },
            {
              url: 'name',
              valueCodeableConcept: {
                text: 'c.181T>G'
              }
            }
          ],
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS'
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsGene',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://www.genenames.org',
                code: 5244,
                display: 'ABCB4'
              }
            ]
          }
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion',
          valueCodeableConcept: {
            text: 'Exon 6'
          }
        }
      ],
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '49874-1',
            display: 'ABCB4 gene mutation analysis'
          }
        ]
      },
      interpretation: {
        coding: [
          {
            system: 'http://hl7.org/fhir/v2/0078',
            code: 'POS'
          }
        ],
        text: 'positive'
      },
      component: [
        {
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '53037-8',
                display: 'Genetic disease sequence variation interpretation'
              }
            ]
          },
          valueCodeableConcept: {
            coding: [
              {
                code: 'LA6675-8',
                display: 'Benign'
              }
            ]
          }
        }
      ]
    },
    {
      resourceType: 'Observation',
      id: 'od-3',
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence',
          valueReference: {
            reference: 'Sequence/seq2-3'
          }
        },
        {
          extension: [
            {
              url: 'genomeBuild',
              valueCodeableConcept: {
                text: 'GRCh 38'
              }
            },
            {
              url: 'name',
              valueCodeableConcept: {
                text: 'c.2211+16C>T'
              }
            }
          ],
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS'
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsGene',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://www.genenames.org',
                code: 5244,
                display: 'ABCB4'
              }
            ]
          }
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion',
          valueCodeableConcept: {
            text: 'intron 16'
          }
        }
      ],
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '49874-1',
            display: 'ABCB4 gene mutation analysis'
          }
        ]
      },
      interpretation: {
        coding: [
          {
            system: 'http://hl7.org/fhir/v2/0078',
            code: 'POS'
          }
        ],
        text: 'positive'
      },
      component: [
        {
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '53037-8',
                display: 'Genetic disease sequence variation interpretation'
              }
            ]
          },
          valueCodeableConcept: {
            coding: [
              {
                code: 'LA6675-8',
                display: 'Benign'
              }
            ]
          }
        }
      ]
    },
    {
      resourceType: 'Observation',
      id: 'od-4',
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence',
          valueReference: {
            reference: 'Sequence/seq2-4'
          }
        },
        {
          extension: [
            {
              url: 'genomeBuild',
              valueCodeableConcept: {
                text: 'GRCh 38'
              }
            },
            {
              url: 'name',
              valueCodeableConcept: {
                text: 'c.3487-16T>C'
              }
            }
          ],
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS'
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsGene',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://www.genenames.org',
                code: 5244,
                display: 'ABCB4'
              }
            ]
          }
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion',
          valueCodeableConcept: {
            text: 'intron 26'
          }
        }
      ],
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '49874-1',
            display: 'ABCB4 gene mutation analysis'
          }
        ]
      },
      interpretation: {
        coding: [
          {
            system: 'http://hl7.org/fhir/v2/0078',
            code: 'POS'
          }
        ],
        text: 'positive'
      },
      component: [
        {
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '53037-8',
                display: 'Genetic disease sequence variation interpretation'
              }
            ]
          },
          valueCodeableConcept: {
            coding: [
              {
                code: "LA6675-8",
                display: 'Benign'
              }
            ]
          }
        }
      ]
    }
  ],
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsAssessedCondition',
      valueReference: {
        reference: '#c1'
      }
    },
    {
      extension: [
        {
          url: 'type',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '51968-6',
                display: 'Genetic Disease Analysis Overall Interpretation'
              }
            ]
          }
        },
        {
          url: 'interpretation',
          valueCodeableConcept: {
            coding: [
              {
                code: 'LA9663-1' ,
                display: 'Inconclusive'
              }
            ]
          }
        }
      ],
      url: 'http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsAnalysis'
    }
  ],
  status: 'final',
  category: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: 15220000,
        display: 'Laboratory test'
      },
      {
        system: 'http://hl7.org/fhir/v2/0074',
        code: 'LAB'
      }
    ]
  },
  code: {
    coding: [
      {
        system: 'http://loinc.org',
        code: '49874-1',
        display: 'ABCB4 gene mutation analysis'
      }
    ]
  },
  subject: {
    reference: 'Patient/genetics-example2',
    display: 'Molecular Lab Patient ID: HOSP-23456'
  },
  effectiveDateTime: '2014-03-04T08:30:00+11:00',
  issued: '2014-05-16T10:28:00+01:00',
  performer: {
    reference: 'Practitioner/genetics-example2',
    display: 'Molecular Diagnostic Laboratory'
  },
  specimen: [
    {
      reference: "Specimen/genetics-example2",
      display: 'Molecular Specimen ID: MLD45-Z4-1234'
    }
  ],
  result: [
    {
      reference: '#od-1',
      display: 'Genetic analysis master panel for ABCB4 -variant1'
    },
    {
      reference: '#od-2',
      display: 'Genetic analysis master panel for ABCB4 -variant2'
    },
    {
      reference: '#od-3',
      display: 'Genetic analysis master panel for ABCB4 -variant3'
    },
    {
      reference: '#od-4',
      display: 'Genetic analysis master panel for ABCB4 -variant4'
    }
  ]
}


var order = {
  "resourceType": "DiagnosticOrder",
  "id": "example",
  "text": {
    "status": "generated",
    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example</p><p><b>contained</b>: </p><p><b>subject</b>: <a>Patient/example</a></p><p><b>orderer</b>: <a>Practitioner/example</a></p><p><b>identifier</b>: Placer = 2345234234234</p><p><b>encounter</b>: <a>Encounter/example</a></p><p><b>reason</b>: Fam hx-ischem heart dis <span>(Details : {ICD-9 code 'V173' = 'V173', given as 'Fam hx-ischem heart dis'})</span></p><p><b>supportingInformation</b>: unknown resource Observation</p><p><b>status</b>: received</p><h3>Events</h3><table><tr><td>-</td><td><b>Status</b></td><td><b>DateTime</b></td><td><b>Actor</b></td></tr><tr><td>*</td><td>requested</td><td>2013-5-2 16:16:00</td><td><a>Practitioner/example</a></td></tr></table><h3>Items</h3><table><tr><td>-</td><td><b>Code</b></td><td><b>Specimen</b></td></tr><tr><td>*</td><td>Lipid Panel <span>(Details : {http://acme.org/tests code 'LIPID' = 'LIPID)</span></td><td><a>Specimen/101</a></td></tr></table><p><b>note</b>: patient is afraid of needles</p></div>"
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
}

module.exports ={
  report:report,
  order:order
}
