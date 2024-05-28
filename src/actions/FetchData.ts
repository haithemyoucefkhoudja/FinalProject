'use server';
import { Data } from "@/types/Data";
const Admin_Observer_Data:Data = {
  "company": {
    "name": "CEVITAL",
    "longitude": "",
    "latitude": "",
    "products": [
      {
        "id": 1,
        "name": "ELIO 5L",
        "quantity": 6907,
        "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
        "safety_level": 1650,
        "mid_price": 612.5
      },
      {
        "id": 2,
        "name": "SKOR 1KG",
        "quantity": 47900,
        "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
        "safety_level": 7900,
        "mid_price": 90
      }
    ]
  },
  "factories": [
    {
      "id": 1,
      "name": "Bejaia",
      "longitude": 5,
      "latitude": 36.66,
      "products": [
        {
          "id": 1,
          "name": "ELIO 5L",
          "quantity": 3407,
          "price": 650,
          "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
          "safety_level": 1000,
          "color": "green"
        },
        {
          "id": 5,
          "name": "SKOR 1KG",
          "quantity": 19900,
          "price": 90,
          "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
          "safety_level": 5000,
          "color": "green"
        }
      ]
    }
  ],
  "warehouses": [
    {
      "id": 2,
      "name": "Oum El Bouaghi",
      "longitude": 7.1505,
      "latitude": 35.8819,
      "products": [
        {
          "id": 2,
          "name": "ELIO 5L",
          "quantity": 1000,
          "price": 600,
          "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
          "safety_level": 200,
          "color": "green"
        },
        {
          "id": 6,
          "name": "SKOR 1KG",
          "quantity": 9000,
          "price": 90,
          "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
          "safety_level": 1000,
          "color": "green"
        }
      ],
      "shipments": [
        {
          "id": 7,
          "name": "shipment to Oum El Bouaghi-7",
          "driver": "cevital_driver_Bejaia_1",
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-27T06:52:00Z",
          "products": [
            {
              "id": 11,
              "name": "ELIO 5L",
              "quantity": 117
            }
          ]
        },
        {
          "id": 8,
          "name": "shipment to Oum El Bouaghi-8",
          "driver": "cevital_driver_Bejaia_3",
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-27T06:52:00Z",
          "products": []
        },
        {
          "id": 9,
          "name": "shipment to Oum El Bouaghi-9",
          "driver": "cevital_driver_Bejaia_4",
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-27T06:52:00Z",
          "products": []
        },
        {
          "id": 11,
          "name": "shipment to Oum El Bouaghi-11",
          "driver": "cevital_driver_Bejaia_5",
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-27T08:58:00Z",
          "products": [
            {
              "id": 1,
              "name": "ELIO 5L",
              "quantity": 3407
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Mostaganem",
      "longitude": 0.1467,
      "latitude": 35.9158,
      "products": [
        {
          "id": 3,
          "name": "ELIO 5L",
          "quantity": 1500,
          "price": 600,
          "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
          "safety_level": 300,
          "color": "green"
        },
        {
          "id": 7,
          "name": "SKOR 1KG",
          "quantity": 11000,
          "price": 90,
          "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
          "safety_level": 1000,
          "color": "green"
        }
      ],
      "shipments": []
    },
    {
      "id": 4,
      "name": "Ouargla",
      "longitude": 5.3345,
      "latitude": 31.9526,
      "products": [
        {
          "id": 4,
          "name": "ELIO 5L",
          "quantity": 1000,
          "price": 600,
          "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
          "safety_level": 150,
          "color": "green"
        },
        {
          "id": 8,
          "name": "SKOR 1KG",
          "quantity": 8000,
          "price": 90,
          "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
          "safety_level": 900,
          "color": "green"
        }
      ],
      "shipments": [
        {
          "id": 1,
          "name": "shipment to Ouargla-1",
          "driver": null,
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-30T08:51:00Z",
          "products": [
            {
              "id": 9,
              "name": "ELIO 5L",
              "quantity": 100
            },
            {
              "id": 10,
              "name": "SKOR 1KG",
              "quantity": 100
            }
          ]
        },
        {
          "id": 2,
          "name": "shipment to Ouargla-2",
          "driver": null,
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-30T08:51:00Z",
          "products": []
        },
        {
          "id": 3,
          "name": "shipment to Ouargla-3",
          "driver": null,
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-30T08:51:00Z",
          "products": []
        },
        {
          "id": 4,
          "name": "shipment to Ouargla-4",
          "driver": null,
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-30T08:51:00Z",
          "products": []
        },
        {
          "id": 5,
          "name": "shipment to Ouargla-5",
          "driver": null,
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-30T08:51:00Z",
          "products": []
        },
        {
          "id": 6,
          "name": "shipment to Ouargla-6",
          "driver": null,
          "origin_factory": "Bejaia",
          "arrival_time": "2024-04-30T08:51:00Z",
          "products": []
        }
      ]
    }
  ]
}
const workerData:Data = {
  "company": {
    "name": "",
    "longitude": "",
    "latitude": "",
    "products": []
  },
  "factories": [],
  "warehouses": [{
    "id": 2,
    "name": "Oum El Bouaghi",
    "longitude": 7.1505,
    "latitude": 35.8819,
    "products": [
      {
        "id": 2,
        "name": "ELIO 5L",
        "quantity": 1000,
        "price": 600,
        "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
        "safety_level": 200,
        "color": "green"
      },
      {
        "id": 6,
        "name": "SKOR 1KG",
        "quantity": 9000,
        "price": 90,
        "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
        "safety_level": 1000,
        "color": "green"
      }
    ],
    "shipments": [
      {
        "id": 7,
        "name": "shipment to Oum El Bouaghi-7",
        "driver": "cevital_driver_Bejaia_1",
        "origin_factory": "Bejaia",
        "arrival_time": "2024-04-27T06:52:00Z",
        "products": [
          {
            "id": 11,
            "name": "ELIO 5L",
            "quantity": 117
          }
        ]
      },
      {
        "id": 8,
        "name": "shipment to Oum El Bouaghi-8",
        "driver": "cevital_driver_Bejaia_3",
        "origin_factory": "Bejaia",
        "arrival_time": "2024-04-27T06:52:00Z",
        "products": []
      },
      {
        "id": 9,
        "name": "shipment to Oum El Bouaghi-9",
        "driver": "cevital_driver_Bejaia_4",
        "origin_factory": "Bejaia",
        "arrival_time": "2024-04-27T06:52:00Z",
        "products": []
      },
      {
        "id": 11,
        "name": "shipment to Oum El Bouaghi-11",
        "driver": "cevital_driver_Bejaia_5",
        "origin_factory": "Bejaia",
        "arrival_time": "2024-04-27T08:58:00Z",
        "products": [
          {
            "id": 1,
            "name": "ELIO 5L",
            "quantity": 3407
          }
        ]
      }
    ]
  }]
}
const DriverData:Data = {
  "company": {
    "name": "",
    "longitude": "",
    "latitude": "",
    "products": []
  },
  "factories": [
    {
      "id": 1,
      "name": "Bejaia",
      "longitude": 5,
      "latitude": 36.66,
      "products": [
        {
          "id": 1,
          "name": "ELIO 5L",
          "quantity": 3407,
          "price": 650,
          "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
          "safety_level": 1000,
          "color": "green"
        },
        {
          "id": 5,
          "name": "SKOR 1KG",
          "quantity": 19900,
          "price": 90,
          "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
          "safety_level": 5000,
          "color": "green"
        }
      ]
    }
  ],
  "warehouses": [{
    "id": 2,
    "name": "Oum El Bouaghi",
    "longitude": 7.1505,
    "latitude": 35.8819,
    "products": [
      {
        "id": 2,
        "name": "ELIO 5L",
        "quantity": 1000,
        "price": 600,
        "description": "Vegetable cooking oil , stays in dry non-humid areas in recommended temprature 15-25° , last for 7 months  , without cholesterol , HALAL",
        "safety_level": 200,
        "color": "green"
      },
      {
        "id": 6,
        "name": "SKOR 1KG",
        "quantity": 9000,
        "price": 90,
        "description": "White refined sugar , stays in dry non-humid areas in recommended temprature 15-25° , last for 2 years  , HALAL , state supported",
        "safety_level": 1000,
        "color": "green"
      }
    ],
    "shipments": [
      {
        "id": 7,
        "name": "shipment to Oum El Bouaghi-7",
        "driver": "cevital_driver_Bejaia_1",
        "origin_factory": "Bejaia",
        "arrival_time": "2024-04-27T06:52:00Z",
        "products": [
          {
            "id": 11,
            "name": "ELIO 5L",
            "quantity": 117
          }
        ]
      }
    ]
  }]
}
export default async function FetchAllData(role:'admin'|'worker'|'driver'|'observer'){
    if(role=='worker')
      return(workerData)
    if(role=="driver")
      return(DriverData)
    if(role)
      return(Admin_Observer_Data)
    return(null)
}