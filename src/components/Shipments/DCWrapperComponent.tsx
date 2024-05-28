'use client'

import { DCShipment,  Product } from "@/types/Data"
import { useState } from "react"
import { DoneShipmentInfoCard } from "./DCShipmentInfoCard"
import { X } from "lucide-react"
import LeafletTable from "../Map/Table"

export const DoneWrapperComponent = ({shipments, status}:{shipments:DCShipment[], status:'canceled' | 'done'})=>{
    const [showProducts, setShow] = useState(false)

    const [selectedProducts, setSelected] = useState({
        name:'',
        Products:[] as Product[]})
    return(  
        <section>
        {shipments.map(shipment => {
            return(
                <DoneShipmentInfoCard status={status} key={shipment.id *21} shipment={shipment} 
    
                  showProducts={(s_id:number)=>{
                  
                  const selectedShipment = shipments.find(shipment => shipment.id === s_id);
                  if(selectedShipment) {
                          setSelected({name:selectedShipment.name,Products:selectedShipment.products})
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