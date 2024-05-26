'use client'
import { Icon, IconOptions, LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import RoutingMachine from '@/components/Map/RoutingMachine'
import { Eye } from 'lucide-react'
import { MapControl } from './MapControl'
import LeafletTable from './Table'
import { IProduct } from './types/product'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
const ware_data = {
    "company" : "Cevital Group",
    "factories": [
      {
        "id": 1,
        "name": "Factory Bejaia N1",
        "longitude":  5.0754,
        "latitude": 36.7416,
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
        "longitude":  7.1505,
        "latitude": 35.8819,
        "shipments":[
            {
              "id": 1,
              "name": "shipment B-O N19",
              "driver" : "cevitam_driver_Bejaia_2" ,
              "origin_factory_id" : 1,
              "destination_warehouse_id" : 1,
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
            }],
        
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
        "longitude": 0.1467,
        "latitude":  35.9158,
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
        "longitude": 5.3345,
        "latitude":  31.9526,
        "shipments":[{
            "id": 2,
            "name": "shipment B-M N38",
            "driver" : "cevitam_driver_Bejaia_1" ,
            "origin_factory_id" : 1,
            "longitude": 0.7123,
            "latitude":  35.8977,
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
          }],
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
  }
  

interface IWarehouse {
  id:number;
  name: string;
  longitude: number;
  latitude: number;
  products: IProduct[];
}
interface WareHouseMarkerProps {
  externalmarker: IWarehouse;
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
  products:{ id: number;
    name: string;
    quantity: number;
    unit_price: number;}[]
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
    products:[
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
    products:[
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
  },
};
const Map = () => {
    const [center, setCenter] = useState<[number, number] | undefined>([35.8689, 7.1108]);
    const [Driverscoords, setDriversCoords] = useState<Record<string, infos>>(FakeDriverscoords);
    const {data, status} = useSession()
    const [role, setRole] = useState('driver');
    const updateExternalState = (driverId: string ,newCoords:[number, number]) => {
      console.log('newCoords:',newCoords);
      setDriversCoords(prev => ({
        ...prev,

        [driverId]: {
          coords:newCoords,
          user:prev[driverId].user,
          destionation_warehouse:prev[driverId].destionation_warehouse,
          products:prev[driverId].products
          
        }
      }));
      /*socket.current?.send(JSON.stringify({
        type: "update_location",
        latitude: newCoords[0],
        longitude: newCoords[1],
        user:data.user
      }));*/
      
      };
      
    const socket = useRef<WebSocket | null>(null);
    useEffect(() => {

      if(!socket.current){
      if(status == 'loading')
        return;
      if(!data)
        return
      socket.current =  new WebSocket('ws://127.0.0.1:8000/ws/some_path/');
      
      socket.current.onmessage = (event) => {
        console.log('hellowedasd')
        const s_data = JSON.parse(event.data);
        console.log('s_data:',s_data);
        if(s_data.type == 'driver_location_update' &&  data?.user.username == "Youcef Khoudja Haithem"){
        // Update the front end with the received data
        const longitude = s_data.longitude;
        const latitude = s_data.latitude;
        const newCoords = [latitude, longitude]
        const driver:User = s_data.driver
        setDriversCoords(prevCoords => ({
          ...prevCoords,
          [driver.id]: {
            coords:newCoords, 
            user:driver
          }
        }));
      }
    }
      socket.current.onopen = () => {
        if(data.user.username == "cevital_admin_Bejaia_1")
          {
            setRole('admin');
            socket.current?.send(JSON.stringify({ type: "identify", user:data.user }));

          }  
        else {
          const user_info:User = {...data.user, role: "driver"}; // Driver identification
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat =position.coords.latitude;
                const long = position.coords.longitude;
                /*setDriversCoords(prev=> {[user_info.id]: {
                  user:user_info,
                  coords:[lat, long],
                  destionation_warehouse:
                }})*/
              })
          }
          socket.current?.send(JSON.stringify({ type: "identify", user:user_info }));

        
        }
      };
      
      socket.current.onclose = () =>{

      }
      socket.current.onerror = () =>{}
  
  }
},[status, data?.user])
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
            
            <MapContainer className=' min-h-full flex-shrink flex-1' center={[36,6]} zoom={13} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {ware_data.factories.map((factory, index) => {
      return (<WareHouseMarker externalmarker={factory} icon={customIcon} key={index}/>)
    })}
    {ware_data.warehouses.map((warehouse, index) => {
      return (<WareHouseMarker externalmarker={warehouse} icon={customIcon} key={index}/>)
    })}
                {/*ware_data.warehouses.map((warehouse, warehouseIndex) => (
        warehouse.shipments?.map((shippment, shipmentIndex) => (
          <RoutingMachine
            data={data}
            products={shippment.products}
            name={shippment.driver}
            key={`${warehouseIndex}-${shipmentIndex}`}
            fromcoords={[shippment.longitude, shippment.latitude]} 
            tocoords ={[warehouse.longitude,warehouse.latitude]}
            updateExternalState={updateExternalState}
          />
        ))
      ))*/}
       {Object.entries(Driverscoords).map(([driver, infos]) => (
        <RoutingMachine
        data={data}
        products={infos.products}
        name={driver}
        fromcoords={infos.coords} 
        tocoords ={infos.destionation_warehouse}
        updateExternalState={updateExternalState}
      />
       ))}
                
                <MapControl center={center}></MapControl>
            </MapContainer>
            
            <section className="bg-white   hidden rounded-xl lg:flex flex-col items-center mx-5 drop-shadow-xl">
            <div className='p-4 w-full'>
      <h2 className="text-black text-xl w-full my-2  border-4 border-gray-700  border-l-0 border-r-0  text-center ">Factories</h2>
    	<ul className="mt-4 flex space-y-2 flex-col items-center  overflow-y-auto ">    		
              {ware_data.factories.map((factory, index) => {
                
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
      <h2 className="text-black text-xl w-full my-2  border-4 border-gray-700  border-l-0 border-r-0  text-center ">Warehouses</h2>
    	<ul className="mt-4 flex space-y-2 flex-col items-center  overflow-y-auto ">    		
              {ware_data.warehouses.map((warehouse, index) => {
                
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
    	<ul className="mt-4 flex space-y-2 flex-col items-center  overflow-y-auto ">    		
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
    {Object.entries(Driverscoords).map(([driver, infos]) => {

      return(
      <li key={infos.user.username} className='flex justify-between items-center   border-b-2 text-left w-full '>
      <p className='mr-4'>{driver}</p>
  <button  onClick={()=>{
    setCenter([infos.coords[0], infos.coords[1]])}} className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
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