'use client'
import React, {  ReactElement } from 'react'
import Link from 'next/link'
import {  LineChartIcon, LogOut, MapIcon, Package2Icon, RouteIcon,   LayoutGrid, Table, TextIcon  } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import LogoImage from '@/public/logo.png'
export  const  Header =  () :ReactElement => {
  return (
    <header className="flex w-full h-16 items-center gap-4  px-6 ">
        <Link className={`flex  items-center gap-2 font-semibold `} href="/Dashboard/Map/Inventories">
              <Image height={LogoImage.height * 0.1} width={LogoImage.width * 0.1} src={LogoImage} alt=''  />
        </Link>
        <div className='flex-1'/>
        <div className='flex '>
              <Link
                className="flex items-center gap-3  rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Map/Inventories"
              >
                <MapIcon className="h-4 w-4" />
                Map
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Tables/Company"
              >
                <Table className="h-4 w-4" />
                Tables
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Shipments/Current"
              >
                <Package2Icon className="h-4 w-4" />
                Shipments
              </Link>
        <Link
            className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-500  transition-all hover:text-gray-900 "
              href="/Dashboard/Stats/Company"
              >
                <LineChartIcon className="h-4 w-4" />
                Stats
              </Link>
              <Link
            className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-500  transition-all hover:text-gray-900 "
              href="/Dashboard/Reports"
              >
                <TextIcon className="h-4 w-4" />
                Reports
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Management/Company"
              >
                <LayoutGrid className="h-4 w-4" />
                Management
              </Link>
              
              
              
        </div>
        <div className='flex items-center flex-1 justify-end'>
            
            <button className=" h-8 w-8 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "  onClick={()=>signOut()}>
            <LogOut/>
            </button>
        </div>
        
    </header>
  )
}


