'use client'
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css'
import {  useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { RoutingMachineProps } from "./types/Routingmachine";

const RoutingMachine = ({ coords, updateExternalState }:RoutingMachineProps) => {
  const Ref = useRef<any>(null);
  const map = useMap();

  useEffect(() => {
    // Initialize the Leaflet Routing Machine control
    const instance = (L as any).Routing.control({
      waypoints: [],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      routeLine: function (route:any, options:any) {
        return L.polyline(route.coordinates, options);
      },
      createMarker: function (i:any, waypoint:any, n:any) {
        console.log(i);
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
    const updatewaypoints = () =>{
      if (Ref.current) {
        const currentWaypoint = Ref.current.getWaypoints()[1].latLng;
        
        const newLat = currentWaypoint ? currentWaypoint.lat + 0.01 : 36;
        const newLng = currentWaypoint ? currentWaypoint.lng + 0.01 : 6;
        // Update the waypoints
        Ref.current.setWaypoints([
          L.latLng(coords[0], coords[1]),  
          L.latLng(newLat, newLng),
        ]);
      }
    }
    // Run the waypoint update every 10 seconds
    const intervalId = setInterval(updatewaypoints, 10000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [map]);
  return <div ></div>
}

export default RoutingMachine;
