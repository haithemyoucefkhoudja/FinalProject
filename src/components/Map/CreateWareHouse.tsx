'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Ref, useCallback, useMemo, useRef, useState } from 'react'
import { Icon, IconOptions, Marker as IMarker} from 'leaflet'
import LeafletTable from './Table'
import { useWareData } from '@/context/WarehouseContext'
import { LucideCornerDownLeft, LucideDoorOpen } from 'lucide-react'

interface DraggableMarkerProps {
    externalmarker: [number, number];
    icon: Icon<IconOptions> | undefined;
    updateExternalState: (newCords: [number, number]) => void;
  }
  
  const DraggableMarker: React.FC<DraggableMarkerProps> = ({ externalmarker, icon, updateExternalState }) => {
    const [draggable, setDraggable] = useState(true);
    const [position, setPosition] = useState<[number, number]>(externalmarker)

    const markerRef = useRef<IMarker| null>(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker:IMarker | null = markerRef.current
          if (marker != null) {
            const latlng = marker.getLatLng();
            const newPos:[number, number] = [parseFloat((latlng.lat.toFixed(2))), parseFloat((latlng.lng.toFixed(2)))]
            updateExternalState(newPos)
            setPosition(newPos)
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
      </Marker>
    )
  }

const CreateWMap: React.FC<any> = (props) => {
    const {warehouse_pos, updateWareData} = useWareData()
    const [Marker, setMarkersPosition] = useState<[number, number]>(warehouse_pos)

  
const updateMarkerPosition = async (newPosition: [number, number]) =>  {
    updateWareData(newPosition, 'warehouse_pos')
    setMarkersPosition(
        newPosition 
    );
  };
const customIcon = new Icon({
    iconUrl:'/marker-icon.png',
    iconSize:[25,41],
    
})
    return (
        
        <div>        
              <MapContainer  className=' w-96 h-96 ' center={Marker} zoom={10} scrollWheelZoom={false}>
                  <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Marker &&
            <DraggableMarker
            
            externalmarker={Marker}
            icon={customIcon}
            updateExternalState={updateMarkerPosition}
          >
          </DraggableMarker>
          }
              </MapContainer>
        <div className='flex justify-center p-4'>
        <button  onClick={()=>props.showMap()} className=" h-8 w-8 border border-gray-800 bg-white hover:bg-gray-300 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " type="button">
          <LucideCornerDownLeft color='green' className='w-6 h-6'></LucideCornerDownLeft>
        </button>
        </div>
        </div>
    )
}
export default CreateWMap;