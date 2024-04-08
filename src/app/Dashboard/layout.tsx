import { SidebarProvider } from "@/context/SideBarContext"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <SidebarProvider>
        {children}  
      </SidebarProvider>
    )
  }