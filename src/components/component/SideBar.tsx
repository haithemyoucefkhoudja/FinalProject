"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useWidth } from "@/hooks/windowWidth"
import {Sidebar, Package2Icon, LineChartIcon, UsersIcon, MapIcon, RouteIcon, LogOut} from "lucide-react"
import { signOut } from "next-auth/react"
export default function SideBar({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const [isHidden, setHidden] = useState(true);
  // Width of the active window
  const  windowWidth = useWidth()
  return (
    <div className={`grid min-h-screen w-full ${isHidden ? 'lg:grid-cols-[0px_1fr]' : 'lg:grid-cols-[280px_1fr]'}`}>
      <div className={`border-r bg-white    flex-1 flex-col  z-10 h-screen transition-transform transform  ease-in-out duration-300   lg:relative absolute   ${isHidden ? '-translate-x-full' : '-translate-x-0'}`}>
        <div className="flex  flex-col gap-2 bg-white">
          <div className={`flex h-16 items-center border-b px-6 ${isHidden ? 'hidden' : ''}`}>
            <Link className={`flex items-center gap-2 font-semibold `} href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Mang Inc</span>
            </Link>
            {windowWidth < 1024 && <Button  className={`ml-auto h-8 w-8`} size="icon" variant="outline" onClick={()=> {setHidden(!isHidden)}}>
              <Sidebar className="h-4 w-4"  />
              <span className="sr-only">Toggle notifications</span>
            </Button>}
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 "
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
      </div>
      <div className="flex flex-col max-h-screen">
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6 ">
        <Button className="ml-auto h-8 w-8" size="icon" variant="outline" onClick={()=> {setHidden(!isHidden)}}>
              <Sidebar className="h-4 w-4" />
        </Button>
        <Button className="ml-auto h-8 w-8" size="icon" variant="outline" onClick={()=>signOut()}>
          <LogOut/>
        </Button>
          <div className="w-full flex-1">
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  )
}






