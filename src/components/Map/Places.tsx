'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import { Icon, IconOptions, LatLngExpression,} from 'leaflet'
import LeafletTable from './Table'
import { route } from './types/route'
import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'
import { IProduct } from './types/product'
import { MapControl } from './MapControl'
type Coords = [number, number]; // A tuple with latitude and longitude


interface IWarehouse {
    id:number;
    name: string;
    longitude: number;
    latitude: number;
    products: IProduct[];
}
const data = {
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
    },
    {
      "id": 1,
      "name": "shipment B-M N38",
      "driver" : "cevitam_driver_Bejaia_1" ,
      "origin_factory_id" : 1,
      "destination_warehouse_id" : 3,
      "longitude": 35.8977,
      "latitude": 0.7123,
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


interface WareHouseMarkerProps {
    externalmarker: IWarehouse;
    icon: Icon<IconOptions> | undefined;
  }
  
  const WareHouseMarker: React.FC<WareHouseMarkerProps> = ({ externalmarker, icon }) => {
    
    return (
      <Marker
        icon={icon}
        position={[externalmarker.longitude, externalmarker.latitude]}
        >
        <Popup minWidth={90} closeOnEscapeKey={true}>
        <LeafletTable Products={externalmarker.products} name={externalmarker.name}></LeafletTable>
        </Popup>
      </Marker>
    )
  }
  

const Places = () => {
  const [center, setCenter] = useState<[number, number] | undefined>([35.8689, 7.1108]);
  
var customIcon = new Icon({
    iconUrl:'/marker-icon.png',
    iconSize:[25,41],
    
})
    return (
        <div className="min-h-full z-0 flex min-w-full">
          
            <MapContainer className=' min-h-full flex-shrink flex-1'   center={center} zoom={13} scrollWheelZoom={false}>
                 <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapControl center={center}></MapControl>
    {data.factories.map((factory, index) => {
      return (<WareHouseMarker externalmarker={factory} icon={customIcon} key={index}/>)
    })}
    {data.warehouses.map((warehouse, index) => {
      return (<WareHouseMarker externalmarker={warehouse} icon={customIcon} key={index}/>)
    })}
            </MapContainer>
            <section className="bg-white   hidden rounded-xl lg:flex flex-col items-center mx-5 drop-shadow-xl">
              <div className='p-4 w-full'>
      <h2 className="text-black text-xl w-full my-2  border-4 border-gray-700  border-l-0 border-r-0  text-center ">Factories</h2>
    	<ul className="mt-4 flex space-y-2 flex-col items-center  overflow-y-auto ">    		
              {data.factories.map((factory, index) => {
                
      return (
        <li className='flex justify-between items-center   border-b-2 text-left w-full '>
          <p className='mr-4'>{factory.name}</p>
      <button  onClick={()=>{
        setCenter([factory.longitude, factory.latitude])}} className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
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
              {data.warehouses.map((warehouse, index) => {
                
      return (
        <li className='flex justify-between items-center   border-b-2 text-left w-full '>
          <p className='mr-4'>{warehouse.name}</p>
      <button  onClick={()=>{
        setCenter([warehouse.longitude, warehouse.latitude])}} className="hover:bg-gray-200 hover:text-gray-900 rounded-full inline-flex items-center justify-center whitespace-nowrap p-1 text-sm font-medium ring-offset-white transition-colors ">
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
export default Places;