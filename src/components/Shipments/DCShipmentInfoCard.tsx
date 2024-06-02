'use client';
import {  DCShipment } from "@/types/Data";

  interface ShipmentProps{
    showProducts: (s_id:number) => void;
    shipment:DCShipment
    status: 'canceled' | 'done'
  }

export const DoneShipmentInfoCard = (props: ShipmentProps) => {
    return (
      <section className="flex w-full h-fit rounded-lg border-2 border-gray-500 my-5">
        <div className="flex text-wrap w-48 text-center  flex-col items-center justify-center h-full space-y-2 p-4 ">
          <label className="text-md ">From:</label>
          <p className="text-md ">{props.shipment.origin_factory}</p>
        </div>
        <div className="flex-1 flex-col space-y-2 p-2 border-gray-300 border-l-2 border-r-2">
          <div className="flex space-x-1">
            <label className="text-md ">Driver:</label>
            <p className="text-md ">{props.shipment.driver}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <label className="text-md ">Progress:</label>
            {props.status == 'done' ? (<p
              className="h-8 px-4 py-2 w-16 bg-green-700 text-gray-50 hover:bg-green-700/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  "
            >
              Done
            </p>):(<p
              className="h-8 px-4 py-2 w-20 bg-red-700 text-gray-50 hover:bg-red-700/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  "
            >
              Canceled
            </p>)}
            
          </div>
          <div className="my-5">
            <button
              onClick={() => {
                props.showProducts(props.shipment.id);
              }}
              className=" my-auto  h-8 px-4 py-2 w-20 bg-white text-gray-700  border-black border-2  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50"
              type="button"
            >
              Products
            </button>
          </div>
          {props.status == 'done' ? (<div className="flex space-x-2  items-end">
            <div className="flex space-x-1 flex-1">
              <label className="text-md ">Arrived at:</label>
              <p className="text-md ">{props.shipment.arrival_time}</p>
            </div>
            
          </div>): (<></>)}
          
        </div>
        <div className="flex text-wrap w-48 text-center  flex-col items-center justify-center h-full space-y-2 p-4 ">
          <label className="text-md ">To:</label>
          <p className="text-md ">{props.shipment.destination_warehouse}</p>
        </div>
      </section>
    );
  };