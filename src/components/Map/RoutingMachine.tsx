'use client'
import L, { Control } from "leaflet";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css'
import {  useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { RoutingMachineProps } from "./types/Routingmachine";
import LeafletTable from "./Table";
import ReactDOM from "react-dom";

const RoutingMachine = ({ fromcoords, data, tocoords, products, name, updateExternalState }:RoutingMachineProps) => {
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const map = useMap();
  useEffect(() => {
    // Initialize the Leaflet Routing Machine control
    const instance = L.Routing.control({
      waypoints: [new L.LatLng(fromcoords[0], fromcoords[1]), new L.LatLng(tocoords[0], tocoords[1])],
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
          L.icon({ iconUrl: '/empty-icon.png', iconSize: [0, 0] });
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
    const updatewaypoints = () =>{
      if (routingControlRef.current) {
        const currentWaypoint = routingControlRef.current.getWaypoints()[0];
        const newLat = currentWaypoint ? currentWaypoint.latLng.lat + 0.1 : fromcoords[0];
        const newLng = currentWaypoint ? currentWaypoint.latLng.lng + 0.1 : fromcoords[1];
        // Update the waypoints
        routingControlRef.current.setWaypoints(
          [
            L.latLng(newLat, newLng),
            L.latLng(tocoords[0], tocoords[1])
          ]
        );
        if(data?.user.id)
          updateExternalState(data?.user.id, [newLat, newLng])
      }
    }
    // Run the waypoint update every 10 seconds
    const intervalId = setInterval(updatewaypoints, 10000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return <div ></div>
}

export default RoutingMachine;
