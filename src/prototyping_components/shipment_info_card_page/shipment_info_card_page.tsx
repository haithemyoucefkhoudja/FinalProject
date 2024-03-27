'use client'
import Shipment_info_card from "./shipment_info_card.tsx"
import { useState } from 'react'
export default function Home() {
  const shipmentData = [
    { driver_name: 'jason', progress: '40%', arival: '2024-03-08 11:21' },
    { driver_name: 'jeff', progress: '90%', arival: '2024-03-10 16:14' },
    { driver_name: 'long bottom', progress: '10%', arival: '2024-03-12 12:47' },
  ];


  return(
  <main className="overflow-auto flex items-center  flex-col ">
    {shipmentData.map((shipment, index) => (
        <Shipment_info_card
          key={index} // Make sure to use a unique key for each item in the array
          driver_name={shipment.driver_name}
          progress={shipment.progress}
          arival={shipment.arival}
        />
      ))}
   



  </main>
  );
}
