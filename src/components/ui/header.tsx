'use client'
import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import {  LineChartIcon, LogOut, MapIcon, Package2Icon, RouteIcon,   LayoutGrid, Table  } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function Header() {
  return (
    <header className="flex w-full h-16 items-center gap-4  px-6 ">
        <Link className={`flex flex-1 items-center gap-2 font-semibold `} href="/Dashboard">
              <Package2Icon className="h-6 w-6" />
              <span>Mang Inc</span>
        </Link>
        <div className='flex '>
        <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 "
                href="#"
              >
                <LineChartIcon className="h-4 w-4" />
                Stats
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <LayoutGrid className="h-4 w-4" />
                Management
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <Package2Icon className="h-4 w-4" />
                Shipments
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <Table className="h-4 w-4" />
                Table
              </Link>
              <Link
                className="flex items-center gap-3  rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <MapIcon className="h-4 w-4" />
                Map
              </Link>
        </div>
        <div className='flex items-center flex-1 justify-end'>
            
            <Button className=" h-8 w-8" size="icon" variant="outline" onClick={()=>signOut()}>
            <LogOut/>
            </Button>
        </div>
        
    </header>
  )
}


