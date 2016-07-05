var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.json(get_lab_orders());
});

module.exports = router;

var data = {
  "resourceType": "",
  "id": "",
  "text": {
    "status": "",
    "div": ""
  },
  "subject": {
    "reference": ""
  },
  "orderer": {
    "reference": ""
  },
  "identifier": [
    {
      "type": {
        "coding": [
          {
            "system": "",
            "code": ""
          }
        ],
        "text": ""
      },
      "system": "",
      "value": ""
    }
  ],
  "encounter": {
    "reference": ""
  },
  "reason": [
    {
      "coding": [
        {
          "system": "",
          "code": "",
          "display": ""
        }
      ]
    }
  ],
  "supportingInformation": [
    {
      "reference": ""
    }
  ],
  "specimen":"",
  "status": "",
  "priority":"",
  "event": [
    {
      "status": "",
      "description": "",
      "dateTime": "",
      "actor": {
        "reference": ""
      }
    }
  ],
  "item": [
    {
      "code": {
        "coding": [
          {
            "system": "",
            "code": ""
          }
        ],
        "text": ""
      },
      "specimen": [
        {
          "reference": ""
        }
      ],
      "bodySite": "",
      "status": "",
      "event": "",
    }
  ],
  "note": [
    {
      "text": ""
    }
  ]
};

function get_lab_orders(){
  return data;
}