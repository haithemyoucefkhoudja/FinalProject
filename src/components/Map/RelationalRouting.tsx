'use client'
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
const factories = [
  { id: 1, name: 'Factory A', coords: [36.123, 5.987] },
  
  { id: 2, name: 'Factory B', coords: [36.123, 6.5] },
  // ... more factories
];

const depots = [
  { id: 1, name: 'Depot 1',  coords: [36.012, 6.123], factoryId: 1 },
  { id: 2, name: 'Depot 2',  coords: [36.156, 6.056], factoryId: 1 },
  { id: 3, name: 'Depot 3',  coords: [36.156, 6.776], factoryId: 2 },
  { id: 4, name: 'Depot 4',  coords: [36.156, 6.86], factoryId: 2 },
  // ... more depots
];
const generateWaypoints = () => {
  
  const waypointsByFactory:Map<string, L.LatLng[]> = new Map();

  factories.forEach(factory => {
      waypointsByFactory.set(String(factory.id), [L.latLng(factory.coords[0], factory.coords[1])]);
      const relatedDepots = depots.filter(depot => depot.factoryId === factory.id);
      relatedDepots.forEach(depot => {
        waypointsByFactory.get(String(factory.id))!.push(L.latLng(depot.coords[0], depot.coords[1]));
      });
  });
  return waypointsByFactory;
};
const RelationalRoutingMachine = ({coords, updateExternalState}:{coords:[number, number], updateExternalState: (newCords: [number, number]) => void}) => {  
  const Ref = useRef(null);
  const map = useMap();

  useEffect(() => {
    // Initialize the Leaflet Routing Machine control
    /*const instance = L.Routing.control({
      waypoints: generateWaypoints(),
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      hide: true, // Add this line to hide the route list
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
    });*/
    // Set the control instance to the Ref
    //Ref.current = instance;
    const waypointsByFactory = generateWaypoints();
    console.log(waypointsByFactory)

    Object.keys(waypointsByFactory).forEach(factoryId => {
      const factoryWaypoints = waypointsByFactory.get(String(factoryId));
      
      // Customize route line options for each factory if needed
      const lineOptions = {
          styles: [{ color: '#6FC1EC', weight: 4 }] 
      };

      (L as any).Routing.control({
          waypoints: factoryWaypoints,
          routeWhileDragging: true,
          lineOptions: lineOptions,        
          draggableWaypoints: true, // Set this to true
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
    
          // ... other options that don't override those set earlier 
      }).addTo(map);
  });
      // Initialize routing control ... (your existing code) ...
  
      // Function to generate waypoints for all factories and depots
      
  
    // Add the control instance to the map
    //instance.addTo(map);
    /*const updatewaypoints = () =>{
      if (Ref.current) {
        const currentWaypoint = Ref.current.getWaypoints()[1].latLng;
        const newLat = currentWaypoint ? currentWaypoint.lat + 0.01 : 36;
        const newLng = currentWaypoint ? currentWaypoint.lng + 0.01 : 6;
        // Update the waypoints
        Ref.current.setWaypoints([
          L.latLng(newLat, newLng),
        ]);
      }
    }
    // Run the waypoint update every 10 seconds
    const intervalId = setInterval(updatewaypoints, 10000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);*/
  }, [map]);
return <></>
}

export default RelationalRoutingMachine;
