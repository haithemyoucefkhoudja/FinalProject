"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useWidth } from "@/hooks/windowWidth"
import {Sidebar, Package2Icon, LineChartIcon, UsersIcon, MapIcon, RouteIcon, User} from "lucide-react"
import Header from "../ui/header"
import UserCard from "./userCard"
import { useSidebar } from "@/context/SideBarContext"
import useRouterSegments from "@/hooks/pathhook"
import * as Lucid from 'lucide-react'
export default function SideBar({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const [isHidden, setHidden] = useState(true);
  /*
  ^: Matches the beginning of the string.
  \/: Matches a forward slash (escaped with \).
  ([^/]+): Matches one or more characters that are not forward slashes. This captures the first route segment.
  \/: Matches another forward slash.
  ([^/]+): Matches one or more characters that are not forward slashes. This captures the second route segment.

*/
  const { sidebarItems} = useSidebar();
  const routes = useRouterSegments();
  const pathName = '/' + routes?.firstRoute + '/' + routes?.secondRoute + '/' + routes?.thirdRoute;
  const relevantItems = sidebarItems['/' + routes?.firstRoute + '/' + routes?.secondRoute] || [];
  
  // Width of the active window
  const  windowWidth = useWidth()
  return (
    <div className={`flex  min-h-screen w-full `}>
      <aside className={`bg-white ${windowWidth < 1024 ? 'border-r-2' : ''}  flex flex-1 flex-col z-10 h-screen transition-transform transition-width transform ease-in-out duration-300 lg:relative absolute ${isHidden ? '-translate-x-full w-0' : ' -translate-x-0  w-[280px]'}`}>
        <div className="flex  flex-col gap-2 bg-white">
        
          {windowWidth < 1024 &&<div className={`flex h-16 items-center border-b px-6 ${isHidden ? 'hidden' : ''} `}>
              
              <Button  className={`ml-auto h-8 w-8`} size="icon" variant="outline" onClick={()=> {setHidden(!isHidden)}}>
                <Sidebar className="h-4 w-4"></Sidebar>
              </Button>
            </div>}
          <div className="flex-1 overflow-auto py-2">
            
            <nav className="grid items-start px-4 text-sm font-medium">
            {relevantItems.map((item) => (
        <Link
        className={`flex items-center gap-3 rounded-lg  px-3 py-2 ${item.href === pathName ? 'text-gray-900 bg-gray-100' : 'text-gray-500' }   transition-all hover:text-gray-900`}
        href="#" key={item.href}
      >
        {<>{item.icon}</>}
        {item.label}
      </Link>
    ))}
              <Link
                className={`flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900`}
                href="#"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Drivers
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <Package2Icon className="h-4 w-4" />
                Deliveries
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <RouteIcon className="h-4 w-4" />
                Routes
              </Link>
              <Link
                className="flex items-center gap-3  rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <MapIcon className="h-4 w-4" />
                Map
              </Link>
            </nav>
          </div>
        </div>
        <UserCard isHidden={isHidden}></UserCard>
      </aside>
      
      <div className=" flex flex-col w-5 items-center justify-center ml-2">
        <div className=" bg-gray-300 w-[2px] h-4" />
        <Button className=" h-8 w-8 my-auto" size="icon" variant="outline" onClick={()=> {setHidden(!isHidden)}}>
                  <Sidebar className="h-4 w-4" />
        </Button>
        <div className=" bg-gray-300 w-[2px] flex-1 " />
      </div>

      <main className={`flex flex-col max-h-screen flex-grow ${isHidden ? 'w-full' : ''}`}>
        <Header />
        <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto ">
          {children}
        </section>
      </main>
    </div>
  )
}







