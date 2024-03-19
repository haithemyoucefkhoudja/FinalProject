'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Ref, useCallback, useMemo, useRef, useState } from 'react'
import { Icon, IconOptions,} from 'leaflet'
import LeafletTable from './Table'
interface MarkerType{
    id:number,
    geocode:[number, number],
    Popup:string,
    address:string
}
interface DraggableMarkerProps {
    externalmarker: MarkerType;
    icon: Icon<IconOptions> | undefined;
    updateExternalState: (id:number,newCords: [number, number]) => void;
  }
  const Products = [
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
  const DraggableMarker: React.FC<DraggableMarkerProps> = ({ externalmarker, icon, updateExternalState }) => {
    const [draggable, setDraggable] = useState(true);
    const [position, setPosition] = useState<[number, number]>(externalmarker.geocode)

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            const latlng = (marker as any).getLatLng();
            updateExternalState(externalmarker.id, [latlng.lat, latlng.lng])
            setPosition([latlng.lat, latlng.lng])
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker
      icon={icon}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        
        <Popup minWidth={90} closeOnEscapeKey={true}>
        <LeafletTable Products={Products} name=''></LeafletTable>
        </Popup>
      </Marker>
    )
  }

const CreateWMap = () => {
    const initMarkers:MarkerType[] = [{
        id:1,
        geocode:[35.8689, 7.1108],
        Popup:'hello im popup1',
        address:''
    },
    {
        id:2,
        geocode:[35.650, 7.1108],
        Popup:'hello im popup2',
        address:''
    }
    ]
const [markersPosition, setMarkersPosition] = useState<MarkerType[]>([{
    id:1,
    geocode:[35.8689, 7.1108],
    Popup:'hello im popup1',
    address:''
},
{
    id:2,
    geocode:[35.650, 7.1108],
    Popup:'hello im popup2',
    address:''
}
]);
function reverseGeocode(coordinates: [number, number]): Promise<string> {
    
    return fetch(`https://api.openrouteservice.org/geocode/reverse?api_key=${process.env.NEXT_PUBLIC_MAP_KEY}&point.lon=${coordinates[1]}&point.lat=${coordinates[0]}`)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const locationName = data.features[0].properties.label;
          return locationName;
        } else {
          return 'Location not found.';
        }
      })
      .catch(error => {
        console.error("Error fetching reverse geocoding data:", error);
        return 'error';
      });
  }
  
const updateMarkerPosition = async (id: number, newPosition: [number, number]) =>  {
    const newaddress:string = await reverseGeocode(newPosition);
    setMarkersPosition((prev) =>
      prev.map((marker) =>
        marker.id === id ? { ...marker, address:newaddress, geocode: newPosition } : marker
      )
    );
  };
var customIcon = new Icon({
    iconUrl:'/marker-icon.png',
    iconSize:[25,41],
    
})
    return (
        
        <div>        
            <ul>
        {markersPosition.map((marker) => (
          <li key={marker.id}>
            Marker {marker.id}: ({marker.geocode[0]}, {marker.geocode[1]}: {marker.address}  ) 
          </li>
        ))}
      </ul>
            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }} center={[35.8689, 7.1108]} zoom={13} scrollWheelZoom={false}>
                 <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {initMarkers.map((marker, index) => {
          return (
            <DraggableMarker
              key={index}
              externalmarker={marker}
              icon={customIcon}
              updateExternalState={updateMarkerPosition}
            >
            </DraggableMarker>
          );
        })}
            </MapContainer>
        </div>
    )
}
export default CreateWMap;