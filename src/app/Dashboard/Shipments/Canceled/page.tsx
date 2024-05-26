'use client'
import LeafletTable from "@/components/Map/Table"
import { DoneShipmentInfoCard } from "@/components/Shipments/Done_CanceledShipment_info_card"
import { X } from "lucide-react"
import { useState } from "react"
const data =  {
  "company" : "Cevital Group",
  "factories": [
    {
      "id": 1,
      "name": "Factory Bejaia N1",
      "longitude": 36.7416,
      "latitude": 5.0754,
      "products": [
        {
          "id" : 1 ,
          "name" :"Elio 5L Olive Oil" ,
          "quantity" : 10000,
          "unit_price" : 650.00 
        },
        {
          "id" : 2 ,
          "name" :"Elio 2L Olive Oil" ,
          "quantity" : 16000,
          "unit_price" : 270.00 
        },
        {
          "id" : 3 ,
          "name" :"Skor 5kg Granulated Sugar" ,
          "quantity" : 9000,
          "unit_price" : 300.00 
        },
        {
          "id" : 4 ,
          "name" :"Skor 2kg Granulated Sugar" ,
          "quantity" : 21000,
          "unit_price" : 180.00 
        },
        {
          "id" : 5 ,
          "name" :"Skor 1kg Granulated Sugar" ,
          "quantity" : 21000,
          "unit_price" : 90.00 
        }
      ]
    }
  ],
  "warehouses": [
    {
      "id": 1,
      "name": "Warehouse Oum El Bouaghi N2",
      "longitude": 35.8819,
      "latitude": 7.1505,
      "products": [
        {
          "id" : 1 ,
          "name" :"Elio 5L Olive Oil" ,
          "quantity" : 7000,
          "unit_price" : 650.00 
        },
        {
          "id" : 2 ,
          "name" :"Elio 2L Olive Oil" ,
          "quantity" : 9000,
          "unit_price" : 270.00 
        },
        {
          "id" : 3 ,
          "name" :"Skor 5kg Granulated Sugar" ,
          "quantity" : 3000,
          "unit_price" : 300.00 
        },
        {
          "id" : 4 ,
          "name" :"Skor 2kg Granulated Sugar" ,
          "quantity" : 11100,
          "unit_price" : 180.00 
        },
        {
          "id" : 5 ,
          "name" :"Skor 1kg Granulated Sugar" ,
          "quantity" : 700,
          "unit_price" : 90.00 
        }
      ]
    },
    {
      "id": 2,
      "name": "Warehouse Mostaganem N3",
      "longitude": 35.9158,
      "latitude": 0.1467,
      "products": [
        {
          "id" : 1 ,
          "name" :"Elio 5L Olive Oil" ,
          "quantity" : 630,
          "unit_price" : 670.00 
        },
        {
          "id" : 2 ,
          "name" :"Elio 2L Olive Oil" ,
          "quantity" : 9700,
          "unit_price" : 290.00 
        },
        {
          "id" : 3 ,
          "name" :"Skor 5kg Granulated Sugar" ,
          "quantity" : 3900,
          "unit_price" : 300.00 
        },
        {
          "id" : 4 ,
          "name" :"Skor 2kg Granulated Sugar" ,
          "quantity" : 12200,
          "unit_price" : 190.00 
        },
        {
          "id" : 5 ,
          "name" :"Skor 1kg Granulated Sugar" ,
          "quantity" : 1000,
          "unit_price" : 90.00 
        }
      ]
    },
    {
      "id": 3,
      "name": "Warehouse Ouargla N4",
      "longitude": 31.9526,
      "latitude": 5.3345,
      "products": [
        {
          "id" : 1 ,
          "name" :"Elio 5L Olive Oil" ,
          "quantity" : 800,
          "unit_price" : 670.00 
        },
        {
          "id" : 2 ,
          "name" :"Elio 2L Olive Oil" ,
          "quantity" : 9500,
          "unit_price" : 290.00 
        },
        {
          "id" : 3 ,
          "name" :"Skor 5kg Granulated Sugar" ,
          "quantity" : 3600,
          "unit_price" : 300.00 
        },
        {
          "id" : 4 ,
          "name" :"Skor 2kg Granulated Sugar" ,
          "quantity" : 12100,
          "unit_price" : 170.00 
        },
        {
          "id" : 5 ,
          "name" :"Skor 1kg Granulated Sugar" ,
          "quantity" : 1700,
          "unit_price" : 90.00 
        }
      ]
    }
  ],
  "shipments": [
    {
      "id": 1,
      "name": "shipment B-O N19",
      "driver" : "cevitam_driver_Bejaia_2" ,
      "arrival":"2024-07-17 18:45",
      "origin_factory" : "Factory Bejaia N1",
      "destination_warehouse" : "Warehouse Oum El Bouaghi N2" ,
      "longitude": 36.1735,
      "latitude": 5.2968,
      "progress":75,
      "products": [
        {
          "id" : 1 ,
          "name" :"Elio 5L Olive Oil" ,
          "quantity" : 1000,
          "unit_price" : 650.00 
        },
        {
          "id" : 2 ,

          "name" :"Elio 2L Olive Oil" ,
          "quantity" : 1000,
          "unit_price" : 270.00 
        },
        {
          "id" : 3 ,
          "name" :"Skor 5kg Granulated Sugar" ,
          "quantity" : 1500,
          "unit_price" : 300.00 
        },
        {
          "id" : 4 ,
          "name" :"Skor 2kg Granulated Sugar" ,
          "quantity" : 700,
          "unit_price" : 180.00 
        },
        {
          "id" : 5 ,
          "name" :"Skor 1kg Granulated Sugar" ,
          "quantity" : 100,
          "unit_price" : 90.00 
        }
      ]
    },
    {
      "id": 1,
      "name": "shipment B-M N38",
      "driver" : "cevitam_driver_Bejaia_1" ,
      "origin_factory" : "Factory Bejaia N1",
      "destination_warehouse" : "Warehouse Ouargla N4" ,
      "arrival":"2024-07-15 16:45",
      "longitude": 35.8977,
      "latitude": 0.7123,
      "progress":57,
      "products": [
        {
          "id" : 1 ,
          "name" :"Elio 5L Olive Oil" ,
          "quantity" : 800,
          "unit_price" : 650.00 
        },
        {
          "id" : 2 ,
          "name" :"Elio 2L Olive Oil" ,
          "quantity" : 980,
          "unit_price" : 270.00 
        },
        {
          "id" : 3 ,
          "name" :"Skor 5kg Granulated Sugar" ,
          "quantity" : 1500,
          "unit_price" : 300.00 
        },
        {
          "id" : 4 ,
          "name" :"Skor 2kg Granulated Sugar" ,
          "quantity" : 800,
          "unit_price" : 180.00 
        },
        {
          "id" : 5 ,
          "name" :"Skor 1kg Granulated Sugar" ,
          "quantity" : 190,
          "unit_price" : 90.00 
        }
      ]
    }
  ]
}
const shipments = [
    {
      "id": 1,
      "name": "shipment B-O N19",
      "driver" : "cevitam_driver_Bejaia_2" ,
      "origin_factory" : "Factory Bejaia N1",
      "destination_warehouse" : "Warehouse Oum El Bouaghi N2" ,
      "longitude": 36.1735,
      "latitude": 5.2968,
      "products": [
        {
          "id" : 1 ,
          "name" :"Elio 5L Olive Oil" ,
          "quantity" : 1000,
          "unit_price" : 650.00 
        },
        {
          "id" : 2 ,

          "name" :"Elio 2L Olive Oil" ,
          "quantity" : 1000,
          "unit_price" : 270.00 
        },
        {
          "id" : 3 ,
          "name" :"Skor 5kg Granulated Sugar" ,
          "quantity" : 1500,
          "unit_price" : 300.00 
        },
        {
          "id" : 4 ,
          "name" :"Skor 2kg Granulated Sugar" ,
          "quantity" : 700,
          "unit_price" : 180.00 
        },
        {
          "id" : 5 ,
          "name" :"Skor 1kg Granulated Sugar" ,
          "quantity" : 100,
          "unit_price" : 90.00 
        }
      ]
    },

]

interface Product {
    id: number;
    name: string;
    quantity: number;
    unit_price: number;
  }

export default  function Page() {
    const [showProducts, setShow] = useState(false)

    const [selectedProducts, setSelected] = useState({
        name:'',
        Products:[] as Product[]})
    const [Shipments, setShipments] = useState(shipments)
    const updateData = (d_id:number) => {
        setShipments(prev=> prev.filter(shipment=> shipment.id !== d_id))
    }
    return(  
    <section>
    {data.shipments.map(shipment => {
        return(
            <DoneShipmentInfoCard status="canceled" key={shipment.id *21} shipment={shipment} 

              showProducts={(s_id:number)=>{
              
              const selectedShipment = Shipments.find(shipment => shipment.id === s_id);
              if(selectedShipment) {
                      setSelected({name:selectedShipment.destination_warehouse,Products:selectedShipment.products})
                      setShow(true)
              }
            }} >
            </DoneShipmentInfoCard>
        )
    })}
    {showProducts && 
           <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
           <div className="fixed inset-0 flex  items-center justify-center z-50">
             <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md">
               <button
                 onClick={()=> {setShow(false)}}
                 className=" text-gray-500 hover:text-gray-700 focus:outline-none"
               >
                 <X className="h-6 w-6"></X>
               </button>
               
               <LeafletTable name={selectedProducts.name} Products={selectedProducts.Products}></LeafletTable>
             </div>
           </div>
         </div>
    }
    </section>
    )
}