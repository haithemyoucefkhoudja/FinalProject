'use client'

import Bell from './Bell.tsx'
import { useState } from 'react'
export default function Home() {
  
  return(
  <div className="bg-gray-100 bg-cover w-screen h-screen">
  <header className="flex items-center justify-between w-screen header bg-white">
      <div>LOGO</div>
      <div className="flex align-items justify-between w-1/3"><p>home</p> <p>table</p> <p>shipments</p>  <p>schedule</p> <p>stats</p></div>
      <div className="flex align-items justify-between w-1/7"><Bell/><p>Name</p></div>
  </header>
  </div>
  );
}

