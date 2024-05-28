'use client'
import { Icon, IconOptions} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import RoutingMachine from '@/components/Map/RoutingMachine'
import { Eye } from 'lucide-react'
import { MapControl } from './MapControl'
import LeafletTable from './Table'
import { Session, User } from 'next-auth'
import { Data, Factory, Shipment, Warehouse } from '@/types/Data'


interface WareHouseMarkerProps {
  externalmarker: Warehouse | Factory;
  icon: Icon<IconOptions> | undefined;
}
  const WareHouseMarker: React.FC<WareHouseMarkerProps> = ({ externalmarker, icon }) => {
    
    return (
      <Marker
        icon={icon}
        position={[externalmarker.latitude, externalmarker.longitude]}
        >
        <Popup minWidth={90} closeOnEscapeKey={true}>
        <LeafletTable Products={externalmarker.products} name={externalmarker.name}></LeafletTable>
        </Popup>
      </Marker>
    )
  }
interface infos  {
  user:User,
  coords:[number, number]
  destionation_warehouse:[number, number]
}
const FakeDriverscoords: Record<string, infos> = {
  "shipment B-O N19": {
    user: {
      id: 1,
      username: "cevitam_driver_Bejaia_2",
      email: "driver2@cevital.com",
      company: "Cevital Group",
      warehouse: "Warehouse Oum El Bouaghi N2",
      role: "driver",
    },
    destionation_warehouse:[35.8819,7.1505],
    coords: [36.7416, 5.0754],
    
  },
  "shipment B-M N38": {
    user: {
      id: 2,
      username: "cevitam_driver_Bejaia_1",
      email: "driver1@cevital.com",
      company: "Cevital Group",
      warehouse: "Warehouse Mostaganem N3",
      role: "driver",
    },
    destionation_warehouse:[31.9526,5.3345],
    coords: [36.7416, 5.0754],
  },
};
interface ShipmentMapPoint extends Shipment {
  destionation_warehouse:[number, number];
  coords:[number, number]
  user:User | null,
}
const Map = ({session, Ware_data}:{session:Session, Ware_data:Data}) => {
    const [center, setCenter] = useState<[number, number] | undefined>([35.8689, 7.1108]);
    const [shipments, setShipments] = useState<ShipmentMapPoint[]>([]);
    const socket = useRef<WebSocket | null>(null);

    const updateExternalState = (driverId: string , shipment_name: string, newCoords:[number, number]) => {
      setShipments((prevShipments) => 
        {
        return(  prevShipments.map(shipment => {
          return(shipment.driver === driverId ? { ...shipment, coords:newCoords } : shipment)
        }
        ))
      }
      );
      if(session.user.role == 'driver')
        socket.current?.send(JSON.stringify({  
        type: "update_location",
        shipment_name:shipment_name,
        latitude: newCoords[0],
        longitude: newCoords[1],
        user:session.user
        }));
      
      };
    useEffect(() => {
      let AvailableShipments = [] as ShipmentMapPoint[]

      Ware_data.warehouses.map(warehouse=> {
        warehouse.shipments?.map(shipment=>{
          AvailableShipments.push({...shipment,
            destionation_warehouse:[warehouse.latitude, warehouse.longitude],
            user:null,
            coords:[36.7416, 5.0754]
          });
        })
      })
      setShipments(AvailableShipments);
      if (!socket.current) {
        socket.current = new WebSocket('ws://127.0.0.1:8000/ws/some_path/');
        
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
              prevShipments.map(shipment =>
                shipment.name === shipment_name
                  ? { ...shipment, user: driver, coords: newCoords }
                  : shipment
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
    const customIcon = new Icon({
        iconUrl:'/marker-icon.png',
        iconSize:[25,41],
        
    })
    
    /*const GetMyLocation = () => {

        const getMyLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat =position.coords.latitude;
                    const long = position.coords.longitude;
                    if(lat !== coord[0] && long !== coord[1])
                        {
                            if(coord)
                            setCoord([lat, long])
                            
                        }
                })
            } else {
                alert("Geolocation is not supported by this browser.")
            }
    }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }*/
    return (
        <div className="min-h-full z-0 flex min-w-full">
            {/*<GetMyLocation />*/}
            
            <MapContainer className=' min-h-full flex-shrink flex-1' center={center} zoom={6} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {Ware_data.factories && Ware_data.factories.map((factory, index) => {
      return (<WareHouseMarker externalmarker={factory} icon={customIcon} key={index}/>)
    })}
    {Ware_data.warehouses && Ware_data.warehouses.map((warehouse, index) => {
      return (<WareHouseMarker externalmarker={warehouse} icon={customIcon} key={index}/>)
    })}
      {shipments.map(shipment=>{
        if(!shipment.driver)
          return<></>
        if(!shipment.user)
          return<></>;
        
        return<RoutingMachine session={session} products={shipment.products}
         name={shipment.driver}
        tocoords={shipment.destionation_warehouse}
        coords={shipment.coords}
        shipment_id={shipment.name}
        updateExternalState={updateExternalState} ></RoutingMachine>
      })}
                
                <MapControl center={center}></MapControl>
            </MapContainer>
            
            <section className="bg-white   hidden rounded-xl lg:flex flex-col items-center mx-5 drop-shadow-xl">
            <div className='p-4 w-full'>
            {Ware_data.factories &&<h2 className="text-black text-xl w-full my-2  border-4 border-gray-700  border-l-0 border-r-0  text-center ">Factories</h2>}
    	<ul className="mt-4 flex space-y-2 flex-col items-center  overflow-y-auto  max-h-36 ">    		
              {Ware_data.factories.length != 0 && Ware_data.factories.map((factory, index) => {
                
      return (
        <li className='flex justify-between items-center   border-b-2 text-left w-full '>
          <p className='mr-4'>{factory.name}</p>
      <button  onClick={()=>{
        setCenter([factory.latitude, factory.longitude])}} className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
      <Eye className='h-6 w-6 self-start'></Eye>
      </button>
      
    </li>
      )
    })}
    	</ul>
      </div>
      <div className='p-4 w-full'>
      {Ware_data.warehouses.length != 0 && <h2 className="text-black text-xl w-full my-2  border-4 border-gray-700  border-l-0 border-r-0  text-center ">Warehouses</h2>}
    	<ul className="mt-4 flex space-y-2 flex-col items-center  overflow-y-auto  max-h-36  ">  
              {Ware_data.warehouses && Ware_data.warehouses.map((warehouse, index) => {
                
      return (
        <li className='flex justify-between items-center   border-b-2 text-left w-full '>
          <p className='mr-4'>{warehouse.name}</p>
      <button  onClick={()=>{
        setCenter([warehouse.latitude, warehouse.longitude])}} className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
      <Eye className='h-6 w-6 self-start'></Eye>
      </button>
      
    </li>
      )
    })}
    	</ul>
      </div>
              <div className='p-4 w-full'>
      <h2 className="text-black text-xl w-full my-2  border-4 border-gray-700  border-l-0 border-r-0  text-center ">Shipments</h2>
    	<ul className="mt-4 flex space-y-2 flex-col items-center  overflow-y-auto  max-h-36 ">    		
        {/*ware_data.warehouses.map((warehouse, warehouseIndex) => (
        warehouse.shipments?.map((shipment, shipmentIndex) => (       
      (
        <li className='flex justify-between items-center   border-b-2 text-left w-full '>
          <p className='mr-4'>{shipment.name}</p>
      <button  onClick={()=>{
        setCenter(Driverscoords[shipment.driver])}} className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
      <Eye className='h-6 w-6 self-start'></Eye>
      </button>
      
    </li>)
      ))
    ))*/}

    {shipments && shipments.map(shipment => {

      return(
      <li key={shipment.id} className='flex justify-between items-center   border-b-2 text-left w-full '>
      <p className='mr-4'>{shipment.name}</p>
  <button  onClick={()=>{
    setCenter([shipment.coords[0], shipment.coords[1]])}} 
    className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
    <Eye className='h-6 w-6 self-start'></Eye>
  </button>
  
</li>
    
    )
    })}

    
    </ul>
      </div>
      
      </section>
        </div>
    )
}
export default Map;