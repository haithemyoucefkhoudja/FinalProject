
import { getServerSession } from "@/app/utils/getServerSession";
import { TablesButton } from "@/components/Tables/TablesButton";
import { Table } from "@/components/Tables/TableWareHouse";
import { Data, Warehouse } from "@/types/Data";

const data:Data = {
    "company" : {
      "name": "Cevital Group",
      "longitude": "",
      "latitude": "",
      "products": [
          {
              "id": 1,
              "name": "Elio 5L Olive Oil",
              "quantity": 50000,
              "mid_price": 650.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 1000,
              "color": "green" 
          },
          {
              "id": 2,
              "name": "Elio 2L Olive Oil",
              "quantity": 80000,
              "mid_price": 270.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "green" 
          },
          {
              "id": 3,
              "name": "Skor 5kg Granulated Sugar",
              "quantity": 80000,
              "mid_price": 270.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "green" 
          },
          {
              "id": 4,
              "name": "Skor 2kg Granulated Sugar",
              "quantity": 105000,
              "mid_price": 180.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 4000,
              "color": "green" 
          },
          {
              "id": 5,
              "name": "Skor 1kg Granulated Sugar",
              "quantity": 105000,
              "mid_price": 90.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 4000,
              "color": "green" 
          }
        ]
    },
    "factories": [
      {
        "id": 1,
        "name": "Factory Bejaia N1",
        "longitude": 5.0754,
        "latitude": 36.7416,
        "products": [
          {
              "id": 1,
              "name": "Elio 5L Olive Oil",
              "quantity": 10000,
              "price": 650.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 1000,
              "color": "green" 
          },
          {
              "id": 2,
              "name": "Elio 2L Olive Oil",
              "quantity": 16000,
              "price": 270.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "green" 
          },
          {
              "id": 3,
              "name": "Skor 5kg Granulated Sugar",
              "quantity": 16000,
              "price": 270.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "green" 
          },
          {
              "id": 4,
              "name": "Skor 2kg Granulated Sugar",
              "quantity": 7000,
              "price": 180.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 4000,
              "color": "orange" 
          },
          {
              "id": 5,
              "name": "Skor 1kg Granulated Sugar",
              "quantity": 4500,
              "price": 90.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 5000,
              "color": "red" 
          }
        ]
      }
    ],
    "warehouses": [
      {

        "id": 1,
        "name": "Warehouse Oum El Bouaghi N2",
        "longitude": 7.1505,
        "latitude": 35.8819,
        "products": [
          {
              "id": 1,
              "name": "Elio 5L Olive Oil",
              "quantity": 10000,
              "price": 650.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 1000,
              "color": "green" 
          },
          {
              "id": 2,
              "name": "Elio 2L Olive Oil",
              "quantity": 16000,
              "price": 270.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "green" 
          },
          {
              "id": 3,
              "name": "Skor 5kg Granulated Sugar",
              "quantity": 16000,
              "price": 270.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "green" 
          },
          {
              "id": 4,
              "name": "Skor 2kg Granulated Sugar",
              "quantity": 7000,
              "price": 180.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 4000,
              "color": "orange" 
          },
          {
              "id": 5,
              "name": "Skor 1kg Granulated Sugar",
              "quantity": 4500,
              "price": 90.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 5000,
              "color": "red" 
          }
        ],
        "shipments" : [
          {
            "id": 2,
            "name": "shipment B-M N38",
            "driver" : "cevitam_driver_Bejaia_1" ,
            "origin_factory_id" : 1,
            "products":[
              {
              "id": 1,
              "name": "Elio 5L Olive Oil",
              "quantity": 10000,
              "price": 650.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 1000,
              "color": "" 
          },
          {
              "id": 2,
              "name": "Elio 2L Olive Oil",
              "quantity": 16000,
              "price": 270.00,
              "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "" 
          },
          {
              "id": 3,
              "name": "Skor 5kg Granulated Sugar",
              "quantity": 16000,
              "price": 270.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed",
              "safety_level": 3000,
              "color": "" 
          },
          {
              "id": 4,
              "name": "Skor 2kg Granulated Sugar",
              "quantity": 40,
              "price": 180.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 4000,
              "color": "" 
          },
          {
              "id": 5,
              "name": "Skor 1kg Granulated Sugar",
              "quantity": 100,
              "price": 90.00,
              "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
              "safety_level": 4000,
              "color": "" 
          }
            ]
          }

        ]
    },
    {
      "id": 2,
      "name": "Warehouse Mostaganem N3",
      "longitude": 0.1157,
      "latitude": 35.9393,
      "products": [
        {
            "id": 1,
            "name": "Elio 5L Olive Oil",
            "quantity": 10000,
            "price": 650.00,
            "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
            "safety_level": 1000,
            "color": "green" 
        },
        {
            "id": 2,
            "name": "Elio 2L Olive Oil",
            "quantity": 16000,
            "price": 270.00,
            "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
            "safety_level": 3000,
            "color": "green" 
        },
        {
            "id": 3,
            "name": "Skor 5kg Granulated Sugar",
            "quantity": 16000,
            "price": 270.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed",
            "safety_level": 3000,
            "color": "green" 
        },
        {
            "id": 4,
            "name": "Skor 2kg Granulated Sugar",
            "quantity": 7000,
            "price": 180.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
            "safety_level": 4000,
            "color": "orange" 
        },
        {
            "id": 5,
            "name": "Skor 1kg Granulated Sugar",
            "quantity": 4500,
            "price": 90.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
            "safety_level": 5000,
            "color": "red" 
        }
      ],
      "shipments" : ""
    },
    {
      "id": 3,
      "name": "Warehouse Ouargla N4",
      "longitude": 5.3225,
      "latitude": 31.9449,
      "products": [
        {
            "id": 1,
            "name": "Elio 5L Olive Oil",
            "quantity": 10000,
            "price": 650.00,
            "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
            "safety_level": 1000,
            "color": "green" 
        },
        {
            "id": 2,
            "name": "Elio 2L Olive Oil",
            "quantity": 16000,
            "price": 270.00,
            "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
            "safety_level": 3000,
            "color": "green" 
        },
        {
            "id": 3,
            "name": "Skor 5kg Granulated Sugar",
            "quantity": 16000,
            "price": 270.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed",
            "safety_level": 3000,
            "color": "green" 
        },
        {
            "id": 4,
            "name": "Skor 2kg Granulated Sugar",
            "quantity": 7000,
            "price": 180.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
            "safety_level": 4000,
            "color": "orange" 
        },
        {
            "id": 5,
            "name": "Skor 1kg Granulated Sugar",
            "quantity": 4500,
            "price": 90.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
            "safety_level": 5000,
            "color": "red" 
        }
      ],

      "shipments" : ""
    }
  ]
}
    
export default async  function Page() {
    const session = await getServerSession()
    return(
        <section >
        {}
        {!session ? 
        (
            <></>
        ): session.user.role == 'worker'? (
            <>
            <ul className="space-y-4">
                {
                <Table Warehouse={data.warehouses.find(warehouse => warehouse.name === session.user.warehouse)}></Table>                
                }
            </ul>
            <TablesButton></TablesButton>
            </>
        ) :
        session.user.role == "admin" ? (
            <ul className="space-y-4">
        {
            data.warehouses.map((warehouse, index)=>{
                return(   
            <li key={index}>
              <Table Warehouse={warehouse}></Table>
            </li>
            
        )
                
            })
            }    
        </ul>
        ):
        (<></>)}
        
        </section>
)
}