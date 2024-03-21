'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { Icon, IconOptions,} from 'leaflet'
import LeafletTable from './Table'
import { IProduct } from './types/product'
import ShippingRoute from './shippingRoute'
import { route } from './types/route'
type Coords = [number, number]; // A tuple with latitude and longitude


interface IWarehouse {
    name: string;
    coords: Coords;
    type: "Factory" | "Warehouse"; 
    Products: IProduct[];
}

const shippingRoutes:route[] =  [
    {
      from_coords: [35.8689, 7.108],
      to_coords: [36.7538, 3.0588]
    },
  ]
const Warehouse:IWarehouse[] = [
    {
      name: "F:Alger",
      coords:[36.7538, 3.0588],
      type: "Factory",
      Products: [
        {
          p_name: "Milk",
          p_quantity: 3000,
          p_unit_price: 11,
          p_soft_limit: 1000,
          p_hard_limit: 800
        },
        {
          p_name: "Yogurt",
          p_quantity: 10000,
          p_unit_price: 20,
          p_soft_limit: 2000,
          p_hard_limit: 1400
        }
      ]
    },
    {
      name: "W:Djelfa",
      coords: [34.3839, 3.1518],
      type: "Warehouse",
      Products: [
        {
          p_name: "Milk",
          p_quantity: 500,
          p_unit_price: 11,
          p_soft_limit: 250,
          p_hard_limit: 90
        },
        {
          p_name: "Yogurt",
          p_quantity: 4000,
          p_unit_price: 20,
          p_soft_limit: 150,
          p_hard_limit: 75
        }
      ]
    },
    {
      name: "W:Oum el bouaghi",
      coords: [35.8689, 7.1108],
      type: "Warehouse",
      Products: [
       {
          p_name: "Milk",
          p_quantity: 200,
          p_unit_price: 11,
          p_soft_limit: 250,
          p_hard_limit: 90
        },
        {
          p_name: "Yogurt",
          p_quantity: 20,
          p_unit_price: 20,
          p_soft_limit: 150,
          p_hard_limit: 75
        }
      ]
    }
  ]
interface WareHouseMarkerProps {
    externalmarker: IWarehouse;
    icon: Icon<IconOptions> | undefined;
  }
  
  const WareHouseMarker: React.FC<WareHouseMarkerProps> = ({ externalmarker, icon }) => {
    
    return (
      <Marker
        icon={icon}
        position={externalmarker.coords}
        >
        <Popup minWidth={90} closeOnEscapeKey={true}>
        <LeafletTable Products={externalmarker.Products} name={externalmarker.name}></LeafletTable>
        </Popup>
      </Marker>
    )
  }

const Places = () => {

var customIcon = new Icon({
    iconUrl:'/marker-icon.png',
    iconSize:[25,41],
    
})
    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex-1">
            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }} center={[35.8689, 7.1108]} zoom={13} scrollWheelZoom={false}>
                 <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    {shippingRoutes.map((route, index) => {
      return (<ShippingRoute route={route} key={index}/>)
    })}
            </MapContainer>
        </div>
        </div>
    )
}
export default Places;