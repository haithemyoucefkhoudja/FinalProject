'use client'
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css'
import {  useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { route } from "./types/route";

const ShippingRoute = ({route}:{route :route}) => {
const Ref = useRef<any>(null);
const map = useMap();

useEffect(() => {
    // Initialize the Leaflet Routing Machine control
    const instance = (L as any).Routing.control({
    waypoints: [route.from_coords, route.to_coords],
    lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    hide: false, 
    showInstructions: false, 
    show: false,
    addWaypoints: true,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    routeLine: function (route:any, options:any) {
        return L.polyline(route.coordinates, options);
    },
    createMarker: function (i:any, waypoint:any, n:any) {
        const isStart = i === 0;
        const icon = isStart ? L.icon({ iconUrl: '/marker-icon.png', iconSize: [24, 41] }) : L.icon({ iconUrl: '/marker-icon.png', iconSize: [24, 41] });
        const marker = L.marker(waypoint.latLng, {icon:icon});
        // You can customize the popup content if needed
        if (isStart) {
        marker.bindPopup('Start Waypoint'+ waypoint.latLng);
        } else {
        marker.bindPopup('Waypoint ' + i + waypoint.latLng);
        }
        return marker;
    },
    });
    // Set the control instance to the Ref
    Ref.current = instance;
    // Add the control instance to the map
    instance.addTo(map);
}, [map]);
return <></>
}

export default ShippingRoute;
