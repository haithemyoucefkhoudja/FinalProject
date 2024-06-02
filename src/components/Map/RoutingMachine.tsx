'use client'
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css'
import {  useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { RoutingMachineProps } from "./types/Routingmachine";
import LeafletTable from "./Table";
import ReactDOM from "react-dom";
function moveCoordsCloser(
  currentCoords: [number, number],
  targetCoords: [number, number],
  fraction: number = 0.1,
  smallest_distance: number = 0.02

): [number, number] {
  const [currentLat, currentLng] = currentCoords;
  const [targetLat, targetLng] = targetCoords;
  if(Math.abs(targetLat - currentLat) <=  smallest_distance || Math.abs(targetLng - currentLng) <= smallest_distance)
    return[-1000, -1000]
  const newLat = currentLat + (targetLat - currentLat) * fraction;
  const newLng = currentLng + (targetLng - currentLng) * fraction;

  return [newLat, newLng];
}
const RoutingMachine = ({ coords, session, shipment_id, tocoords, products, name, updateExternalState }:RoutingMachineProps) => {
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const map = useMap();
  useEffect(() => {
    // Initialize the Leaflet Routing Machine control
    const instance = L.Routing.control({
      waypoints: [new L.LatLng(coords[0], coords[1]), new L.LatLng(tocoords[0], tocoords[1])],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance:2
      }, 
      fitSelectedRoutes:false,
      createMarker: (i: string | number, waypoint: { latLng: string | L.LatLngLiteral | L.LatLngTuple; }, n: any) => {
        const isStart = i === 0;
        const icon = isStart
          ? L.icon({ iconUrl: '/marker-icon.png', iconSize: [24, 41] }): 
          L.icon({ iconUrl: '/marker-icon.png', iconSize: [0, 0] });
        const marker = L.marker((waypoint as any).latLng, { icon });
        const popupContent = document.createElement('div');
        ReactDOM.render(<LeafletTable Products={products} name={name} />, popupContent);
        if (isStart) {
          marker.bindPopup(popupContent);
        } else {
          marker.bindPopup('');
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
    let intervalId:NodeJS.Timeout | null = null;
    const updatewaypoints = () =>{
      if (routingControlRef.current) {
        const currentWaypoint = routingControlRef.current.getWaypoints()[0];
        const Lat = currentWaypoint ? currentWaypoint.latLng.lat  : coords[0];
        const Lng = currentWaypoint ? currentWaypoint.latLng.lng  : coords[1];
        const newCoords = moveCoordsCloser([Lat, Lng], tocoords)
        if(newCoords[0] === -1000 && intervalId)
          return clearInterval(intervalId);
        // Update the waypoints
        routingControlRef.current.setWaypoints(
          [
            L.latLng(newCoords[0], newCoords[1]),
            L.latLng(tocoords[0], tocoords[1])
          ]
        );
        updateExternalState(name,shipment_id, [newCoords[0], newCoords[1]])
      }
    }
    // Run the waypoint update every 10 seconds
    if(session.user.role == 'driver')
    {  
      intervalId = setInterval(updatewaypoints, 10000);
      // Cleanup the interval on component unmount
      return ()=>{
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
}
    
  }, [session]);
  useEffect(()=>{
    
    if(!routingControlRef.current)
      return;

    if(session.user.role == 'driver')
      return;
    routingControlRef.current.setWaypoints(
      [
        L.latLng(coords[0], coords[1]),
        L.latLng(tocoords[0], tocoords[1])
      ]
    );
  }, [session, coords])
  return <div ></div>
}

export default RoutingMachine;
