'use server';
/*{
    "company_name": "CEVITAL",
    "name": "shipment to Oum El Bouaghi-7",
    "driver": "cevital_driver_Bejaia_2",
    "origin_factory": "Bejaia",
    "origin_factory": "target_warehouse_name",
    "arrival_time": "2024-04-27T06:52:00Z",
    "vehicle": "cevital_truck_rouge_2",
    "products": [
      {
        "id": 11,
        "name": "ELIO 5L",
        "quantity": 117
      }
    ]
  }*/
import { getURL } from "@/lib/backend_baseurl";
import { ShipmentFormSchema } from "@/schemas/Shipment";
import { z } from "zod";
  
export default async function createShipment(values:z.infer<typeof ShipmentFormSchema>, products:{id:number, name:string, quantity:number}[], company_name:string){
      //insert user in backend
      try {
          //  Get Registration URL
          const URL = getURL('p/create_shipment');
          
          // Send POST Request with Credentials
          const response = await fetch(URL, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json' 
              },
              body: JSON.stringify({...values, products, vehicle:values.mean_transportation, target_warehouse_name:values.destination_warehouse, company_name}) 
          });
          const res_data = await response.json(); 
          if (!res_data.success) {
              throw new Error(res_data.message); 
          }
          return {message:res_data.message, success:res_data.success};
      }
      catch(error:any)
      {
          return {"error":error.message} 
      }
  }