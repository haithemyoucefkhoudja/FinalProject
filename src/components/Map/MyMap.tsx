'use client'

import L from 'leaflet'
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import RoutingMachine from '@/components/RoutingMachine'
import RelationalRoutingMachine from './RelationalRouting'

const Map = () => {

    const [coord, setCoord] = useState([51.505, -0.09])

    const SearchLocation = () => {
        return (
            <div className="search-location">
                <input type="text" placeholder="Search Location" />
            </div>
        )
    }

    const GetMyLocation = () => {
        const getMyLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCoord([position.coords.latitude, position.coords.longitude])
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
            <SearchLocation />
            <GetMyLocation />
            <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }} center={coord} zoom={13} scrollWheelZoom={false}>
                <TileLayer                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker icon={
                    new L.Icon({
                        iconUrl: "/warehouse.png",
                        iconRetinaUrl: '/warehouse.png',
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow.src,
                        shadowSize: [41, 41],
                    })
                } position={[51.505, -0.09]}>
                     <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <RelationalRoutingMachine coords={[36,5]} />
            </MapContainer>
        </div>
    )
}
export default Map;