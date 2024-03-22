'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import {faBell} from "@fortawesome/free-solid-svg-icons"
export default function Bell() {
  var number_of_notifications=2;
  return (

       <div className="flex items-center justify-center size-8 bg-white rounded">
       <div className="relative">
       { number_of_notifications>0 &&<div className="bg-red-500 size-5 rounded-full flex item-center justify-center text-white absolute left-[-8px] top-[-3px] text-[0.75em]">{number_of_notifications}</div>}
       <FontAwesomeIcon icon={faBell} className="text-2xl"  />
       </div>
       </div>
  );
}

