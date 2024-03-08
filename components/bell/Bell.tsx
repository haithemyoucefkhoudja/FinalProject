'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import {faBell} from "@fortawesome/free-solid-svg-icons"
export default function Home() {
  var number_of_notifications=10;
  return (
   <div className="flex items-center justify-center h-screen">
       <div className="flex items-center justify-center size-16 bg-blue-500 rounded">
       <div className="relative">
       <div className="bg-red-500 size-6 rounded-full flex item-center justify-center text-white circle">{number_of_notifications}</div>
       <FontAwesomeIcon icon={faBell} className="text-2xl"  />
       </div>
       </div>
   </div>
  );
}

