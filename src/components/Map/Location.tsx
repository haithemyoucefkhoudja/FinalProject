'use client'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useState } from 'react'
import RoutingMachine from '@/components/Map/RoutingMachine'


const Map = () => {

    const [coord, setCoord] = useState<[number, number]>([36, 5])
    const updateExternalState = (newCoords:[number, number]) => {
        setCoord(newCoords);
      };
    
    const GetMyLocation = () => {

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
                console.log("Geolocation is not supported by this browser.")
            }
    }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }
    return (
        
        <div>
            <GetMyLocation />
            {coord &&
            (<>
            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }} center={[36,6]} zoom={13} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RoutingMachine coords={coord} updateExternalState={updateExternalState} />
            </MapContainer>
            </>)}
        </div>
    )
}
export default Map;