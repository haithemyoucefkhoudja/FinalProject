import { SidebarProvider } from "@/context/SideBarContext"

import SideBar  from "@/components/component/SideBar"
import { ReactNode } from "react"
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: ReactNode
  }) {
    return (
      <SidebarProvider>
          <SideBar>
              {children}
          </SideBar>
      </SidebarProvider>
    )
  }

