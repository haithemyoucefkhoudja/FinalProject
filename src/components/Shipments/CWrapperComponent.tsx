"use client";
import { ExtendedShipment, Product, Warehouse } from "@/types/Data";
import { Session, User } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { ShipmentInfoCard } from "./Shipment_info_card";
import { X } from "lucide-react";
import LeafletTable from "../Map/Table";
import ShipmentForm from "./Form/ShipmentForm";
import { calculateProgress } from "@/lib/calculateProgress";
interface ShipmentMapPoint extends ExtendedShipment {
  coords:[number, number]
  user:User | null,
  progress:number;
}
export const CWrapperComponent:React.FC<{shipments:ExtendedShipment[], Warehouses:Warehouse[], Factories:Warehouse[],session:Session}> =({shipments, Warehouses, Factories,session})=>{
    const [showProducts, setShow] = useState(false)
    const [showForm, setShowForm] = useState(false);
    
    const [selectedProducts, setSelected] = useState({
        name:'',
        Products:[] as Product[]})
    
    const [Shipments, setShipments] = useState<ShipmentMapPoint[]>([])
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        let AvailableShipments = [] as ShipmentMapPoint[]
  
          shipments.map(shipment=>{
            AvailableShipments.push({...shipment,
              user:null,
              coords:[36.7416, 5.0754],
              progress:-1
            });
          })
        setShipments(AvailableShipments);
        if (!socket.current) {
          socket.current = new WebSocket('ws://127.0.0.1:8080/ws/some_path/');
          
          socket.current.onopen = () => {
            if (session.user.role === 'admin' || session.user.role === 'driver') {
              if(socket.current)
                socket.current.send(JSON.stringify({ type: "identify", user: session.user }));
            }
            
            if (session.user.role === 'driver') {
              if(socket.current)
              socket.current.send(JSON.stringify({  
                type: "update_location",
                shipment_name:AvailableShipments[0].name,
                latitude: 36.7416,
                longitude: 5.0754,
                user:session.user
                }));
              setShipments(prevShipments =>
                prevShipments.map(shipment =>
                  shipment.driver === session.user.username
                    ? { ...shipment, coords: [36.7416, 5.0754], user:session.user }
                    : shipment
                )
              );
            }
          };
    
          socket.current.onmessage = (event) => {
            const s_data = JSON.parse(event.data);
    
            if (s_data.type === 'driver_location_update' && session.user.role === 'admin') {
              const shipment_name = s_data.shipment_name;
              const longitude = s_data.longitude;
              const latitude = s_data.latitude;
              const newCoords:[number, number] = [latitude, longitude];
              const driver = s_data.driver;
              setShipments(prevShipments =>
                prevShipments.map(shipment =>{
                if(shipment.name === shipment_name)
                  {
                    console.log('shipment origin factory:', shipment.origin_factory_coords)
                    console.log('shipment destination warehouse:', shipment.destination_warehouse_coords)
                    console.log('curr:',newCoords);
                  }
                 return( shipment.name === shipment_name
                    ? { ...shipment, user: driver, coords: newCoords, progress:calculateProgress(shipment.origin_factory_coords,newCoords,shipment.destination_warehouse_coords) }
                    : shipment)}
                )
              );
            }
          };
    
          socket.current.onerror = (error) => {
            console.error("WebSocket error:", error);
          };
    
          socket.current.onclose = () => {
            console.log("WebSocket connection closed");
          };
        }
    
        // Clean up the WebSocket connection when the component unmounts
        return () => {
          if (socket.current) {
            socket.current.close();
            socket.current = null;
          }
        };
        
        
  },[session, socket])
    const updateData = (d_id:number) => {
        setShipments(prev=> prev.filter(shipment=> shipment.id !== d_id))
    }
    return(
        <section>
      {session.user.role === 'admin' && 
      <button onClick={()=>{setShowForm(prev=> !prev)}} className="w-full h-12 my-5 px-4 py-2  bg-gray-900 text-gray-50 hover:bg-gray-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors">
        Create New Shipment
      </button>
      }
      {Shipments.map(shipment => {
        return(
            <ShipmentInfoCard key={shipment.id *21} shipment={shipment} 
              updateShipment={updateData}
              showProducts={(s_id:number)=>{
              
              const selectedShipment = Shipments.find(shipment => shipment.id === s_id);
              if(selectedShipment) {
                      setSelected({name:selectedShipment.destination_warehouse,Products:selectedShipment.products})
                      setShow(true)
              }
            }} >
            </ShipmentInfoCard>
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
    {showForm &&
        <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
            <div className="fixed inset-0 flex  items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-md p-6 w-3/4 max-w-md">
                    <button
                    onClick={()=> {setShowForm(false)}}
                    className=" text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                    <X className="h-6 w-6"></X>
                    </button>
                    
                    <ShipmentForm updateShow={()=>setShowForm(false)} Warehouses={Warehouses} Factories={Factories} ></ShipmentForm>
                </div>
            </div>
    </div>
    }
 
        </section>
    )
}