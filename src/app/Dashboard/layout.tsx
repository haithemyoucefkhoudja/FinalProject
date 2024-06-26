import { SidebarProvider } from "@/context/SideBarContext"
import { Toaster } from "react-hot-toast";

import {SideBar}  from "@/components/component/SideBar"
import { ReactNode } from "react"
import { CheckDataProvider } from "@/context/checkProvider";
export default function DashboardLayout({
    children, 
  }: {
    children: ReactNode
  }) {
    return (
      <CheckDataProvider>
        <SidebarProvider>
            <SideBar>
              <Toaster position="top-right" />
                {children}
            </SideBar>
        </SidebarProvider>
      </CheckDataProvider>
    )
  }

