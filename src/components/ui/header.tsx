'use client'
import React, {  ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import {  LineChartIcon, LogOut, MapIcon, Package2Icon, RouteIcon,   LayoutGrid, Table, TextIcon, X, Menu  } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import LogoImage from '@/public/logo.png'
import { useWidth } from '@/hooks/windowWidth'
export  const  Header =  ({windowWidth}:{windowWidth:number}) :ReactElement => {
  
  const [isMobile, setIsMobile] = useState(false); 
  useEffect(()=>{
    setIsMobile(windowWidth < 768)
  },[windowWidth])
  return (
    <header className="flex w-full h-16 items-center gap-4  px-6 ">
        <Link className={`flex  items-center gap-2 font-semibold `} href="/Dashboard/Map/Inventories">
              <Image height={LogoImage.height * 0.1} width={LogoImage.width * 0.1} src={LogoImage} alt=''  />
        </Link>
        <div className='hidden md:block flex-1'/>
        {isMobile ? <button className='space-y-1 group md:hidden ml-auto md:ml-0  h-8 w-8 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 '>
          <Menu className='w-6 h-6'></Menu>

          {/* menu */}
          <ul className='bg-gray-700 text-white z-50 w-screen pb-10 absolute -top-full group-focus:top-0 right-0 duration-150 flex flex-col space-y-3'>
            <button className='px-10 py-8 relative ml-auto'>
              <X className="h-6 w-6"/>
            </button>
          <li key={'m-1'}>
              <Link
                className="flex items-center gap-3  rounded-lg px-3 py-4 text-gray-100 "
                href="/Dashboard/Map/Inventories"
              >
                <MapIcon className="h-4 w-4" />
                Map
              </Link>
          </li>
          <li key={'m-2'}>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-100  "
                href="/Dashboard/Tables/Company"
              >
                <Table className="h-4 w-4" />
                Tables
              </Link>
          </li>
          <li key={'m-3'}>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-100 "
                href="/Dashboard/Shipments/Current"
              >
                <Package2Icon className="h-4 w-4" />
                Shipments
              </Link>
          </li>
          <li key={'m-4'}>
              <Link
                className="flex items-center gap-3 rounded-lg  px-3 py-4 text-gray-100  "
                href="/Dashboard/Stats/Company"
              >
                <LineChartIcon className="h-4 w-4" />
                Stats
              </Link>
          </li>
          <li key={'m-5'}>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-gray-100"
                href="/Dashboard/Management/Company"
              >
                <LayoutGrid className="h-4 w-4" />
                Management
              </Link>
          </li>
          <li>
            
          </li>
          </ul>
        </button> : (<ul className='hidden md:flex'>
          <li key={'d-1'} className='hidden md:flex'>
              <Link
                className="flex items-center gap-3  rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Map/Inventories"
              >
          
                <MapIcon className="h-4 w-4" />
                Map
              </Link>
          </li>
          <li key={'d-2'} className='hidden md:flex'>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Tables/Company"
              >
                <Table className="h-4 w-4" />
                Tables
              </Link>
          </li>
          <li key={'d-3'} className='hidden md:flex'>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Shipments/Current"
              >
                <Package2Icon className="h-4 w-4" />
                Shipments
              </Link>
          </li>
          <li key={'d-4'} className='hidden md:flex'>
              <Link
                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-500  transition-all hover:text-gray-900 "
                href="/Dashboard/Stats/Company"
              >
                <LineChartIcon className="h-4 w-4" />
                Stats
              </Link>
          </li>
          <li key={'d-5'} className='hidden md:flex'>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="/Dashboard/Management/Company"
              >
                <LayoutGrid className="h-4 w-4" />
                Management
              </Link>
          </li>    
        </ul>)}
        <div className='flex md:flex-1 items-center  justify-end'>
            
            <button className=" h-8 w-8 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 "  onClick={()=>signOut()}>
            <LogOut/>
            </button>
        </div>
        
    </header>
  )
}


