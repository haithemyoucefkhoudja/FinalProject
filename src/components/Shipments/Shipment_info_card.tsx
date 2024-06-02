'use client'

import { ExtendedShipment } from "@/types/Data";
import { CancelButton } from "./CancelButton";
import { CompleteButton } from "./ConfirmButton";
import { User } from "next-auth";
    interface ShipmentMapPoint extends ExtendedShipment {
    coords:[number, number]
    user:User | null,
    progress:number;
  }
  interface ShipmentProps{
    updateShipment: (d_id:number) => void;
    showProducts: (s_id:number) => void;
    shipment:ShipmentMapPoint

  }
export const ShipmentInfoCard = (props:ShipmentProps) =>{
    
    return(<section className="flex w-full h-fit rounded-lg border-2 border-gray-500 my-5">
        <div className="flex text-wrap w-48 text-center  flex-col items-center justify-center h-full space-y-2 p-4 ">
            <label className="text-md ">From:</label>
            <p className="text-md ">{props.shipment.origin_factory}</p>
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-2 border-gray-300 border-l-2 border-r-2">
            <div className="flex space-x-1">
                <label className="text-md ">Driver:</label>
                <p className="text-md ">{props.shipment.driver}</p>
            </div>
            <div className="flex space-x-1">
                <label className="text-md ">Progress:</label>
                <div className="w-full  border-2 rounded-full border-gray-600">
                    <div className=" bg-blue-300 h-full rounded-full" style={{width:`${props.shipment.progress == -1 ? 0: props.shipment.progress}%`}}></div>
                </div>
            </div>
            <div className="my-5">
            <button onClick={()=>{props.showProducts(props.shipment.id)}} className=" my-auto  h-8 px-4 py-2 w-20 bg-white text-gray-700  border-black border-2  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50" type="button">
                Products
            </button>
            </div>
            <div className="flex space-x-2  items-end">
                <div className="flex space-x-1 flex-1">
                <label className="text-md ">To arrive at:</label>
                <p className="text-md ">{props.shipment.arrival_time}</p>
                </div>
                
                <CompleteButton updateShipment={props.updateShipment} id={props.shipment.id}/>
                <CancelButton updateShipment={props.updateShipment} id={props.shipment.id}/>
            </div>
        </div>
        <div className="flex text-wrap w-48 text-center  flex-col items-center justify-center h-full space-y-2 p-4 ">
            <label className="text-md ">To:</label>
            <p className="text-md ">{props.shipment.destination_warehouse}</p>
        </div>
    </section>)

}