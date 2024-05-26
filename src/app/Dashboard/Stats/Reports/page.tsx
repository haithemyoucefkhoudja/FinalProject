import { LineCharts } from "@/components/component/LineChart";
const warehouses =  [
  {
    "id": "Factory Bejaia N1",
    "color": "#ffe0b2",
    "data": [
      {
        "x": "2024-04-20",
        "y": 1463
      },
      {
        "x": "2024-04-21",
        "y": 1379
      },
      {
        "x": "2024-04-22",
        "y": 583
      },
      {
        "x": "2024-04-23",
        "y": 964
      },
      {
        "x": "2024-04-24",
        "y": 795
      },
      {
        "x": "2024-04-25",
        "y": 679
      },
      {
        "x": "2024-04-26",
        "y": 138
      },
      {
        "x": "2024-04-27",
        "y": 1161
      },
      {
        "x": "2024-04-28",
        "y": 789
      },
      {
        "x": "2024-04-29",
        "y": 645
      },
      {
        "x": "2024-04-30",
        "y": 853
      },
      {
        "x": "2024-05-01",
        "y": 1337
      }
    ]
  },
  {
    "id": "Warehouse Oum El Bouaghi N2",
    "color": "#f0f4c3",
    "data": [
      {
        "x": "2024-04-20",
        "y": 317
      },
      {
        "x": "2024-04-21",
        "y": 1468
      },
      {
        "x": "2024-04-22",
        "y": 412
      },
      {
        "x": "2024-04-23",
        "y": 825
      },
      {
        "x": "2024-04-24",
        "y": 1442
      },
      {
        "x": "2024-04-25",
        "y": 989
      },
      {
        "x": "2024-04-26",
        "y": 221
      },
      {
        "x": "2024-04-27",
        "y": 567
      },
      {
        "x": "2024-04-28",
        "y": 1484
      },
      {
        "x": "2024-04-29",
        "y": 1237
      },
      {
        "x": "2024-04-30",
        "y": 295
      },
      {
        "x": "2024-05-01",
        "y": 741
      }
    ]
  },
  {
    "id": "Warehouse Mostaganem N3",
    "color": "#cfd8dc",
    "data": [
      {
        "x": "2024-04-20",
        "y": 1338
      },
      {
        "x": "2024-04-21",
        "y": 433
      },
      {
        "x": "2024-04-22",
        "y": 1204
      },
      {
        "x": "2024-04-23",
        "y": 328
      },
      {
        "x": "2024-04-24",
        "y": 754
      },
      {
        "x": "2024-04-25",
        "y": 1219
      },
      {
        "x": "2024-04-26",
        "y": 619
      },
      {
        "x": "2024-04-27",
        "y": 1453
      },
      {
        "x": "2024-04-28",
        "y": 455
      },
      {
        "x": "2024-04-29",
        "y": 549
      },
      {
        "x": "2024-04-30",
        "y": 1152
      },
      {
        "x": "2024-05-01",
        "y": 952
      }
    ]
  },
  {
    "id": "Warehouse Ouargla N4",
    "color": "#d7ccc8",
    "data": [
      {
        "x": "2024-04-20",
        "y": 946
      },
      {
        "x": "2024-04-21",
        "y": 1495
      },
      {
        "x": "2024-04-22",
        "y": 1443
      },
      {
        "x": "2024-04-23",
        "y": 998
      },
      {
        "x": "2024-04-24",
        "y": 497
      },
      {
        "x": "2024-04-25",
        "y": 1039
      },
      {
        "x": "2024-04-26",
        "y": 885
      },
      {
        "x": "2024-04-27",
        "y": 1334
      },
      {
        "x": "2024-04-28",
        "y": 202
      },
      {
        "x": "2024-04-29",
        "y": 1451
      },
      {
        "x": "2024-04-30",
        "y": 123
      },
      {
        "x": "2024-05-01",
        "y": 1176
      }
    ]
  }
]
  
export default async function Page() {
    return(    
    <LineCharts  data={warehouses}>
    </LineCharts>
    )
}