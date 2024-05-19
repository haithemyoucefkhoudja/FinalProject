'use client'
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css'
import {  useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { RoutingMachineProps } from "./types/Routingmachine";

const RoutingMachine = ({ fromcoords, tocoords,  updateExternalState }:RoutingMachineProps) => {
  const routingControlRef = useRef<any>(null);
  const map = useMap();
  useEffect(() => {
    // Initialize the Leaflet Routing Machine control
    const instance = (L as any).Routing.control({
      waypoints: [],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      fitSelectedRoutes:false,
      routeLine: (route: { coordinates: L.LatLngExpression[] | L.LatLngExpression[][]; }, options: L.PolylineOptions | undefined) => L.polyline(route.coordinates, options),
      createMarker: (i: string | number, waypoint: { latLng: string | L.LatLngLiteral | L.LatLngTuple; }, n: any) => {
        const isStart = i === 0;
        const icon = isStart
          ? L.icon({ iconUrl: '/marker-icon.png', iconSize: [24, 41] })
          : L.icon({ iconUrl: '/marker-icon.png', iconSize: [24, 41] });
        const marker = L.marker((waypoint as any).latLng, { icon });
        if (isStart) {
          marker.bindPopup('Dest Waypoint ' + waypoint.latLng);
        } else {
          marker.bindPopup('Waypoint ' + i + ' ' + waypoint.latLng);
        }
        return marker;
      }
    });

    // Set the control instance to the ref
    routingControlRef.current = instance;

    // Add the control instance to the map
    instance.addTo(map);

    return () => {
      // Cleanup the control instance on unmount
      map.removeControl(instance);
    };
  }, [map]);
  useEffect(() => {
    
    const updatewaypoints = () =>{
      if (routingControlRef.current) {
        const currentWaypoint = routingControlRef.current.getWaypoints()[1].latLng;
        
        const newLat = currentWaypoint ? currentWaypoint.lat + 0.01 : fromcoords[0];
        const newLng = currentWaypoint ? currentWaypoint.lng + 0.01 : fromcoords[1];
        // Update the waypoints
        routingControlRef.current.setWaypoints(
          [
            L.latLng(tocoords[0], tocoords[1]), // Ensure correct order: [latitude, longitude]
            L.latLng(newLat, newLng)
          ]
        );
  
      }
    }
    // Run the waypoint update every 10 seconds
    const intervalId = setInterval(updatewaypoints, 10000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [tocoords, updateExternalState]);
  return <div ></div>
}

export default RoutingMachine;
