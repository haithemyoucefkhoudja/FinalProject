'use client'

import Bell from './Bell.tsx'
import Map_dict from './map_dictionary.tsx'
import Truck_info_card from './truck_info_card.tsx'
import { useState } from 'react'
export default function Home() {
  
  return(
  <div className="bg-gray-100 bg-cover w-screen h-screen flex justify-center items-center">
  <header className="fixed top-[0] left-[0] flex items-center justify-between w-screen bg-white p-[1.25rem] h-[9vh] text-[1.3em]">
      <div>LOGO</div>
      <div className="flex align-items justify-between w-1/3"><p>home</p> <p>table</p> <p>shipments</p>  <p>schedule</p> <p>stats</p></div>
      <div className="flex align-items justify-between w-1/7"><Bell/><p>Name</p></div>
  </header>
  <Map_dict />
  <Truck_info_card/>  


  </div>
  );
}

