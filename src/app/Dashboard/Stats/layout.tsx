import SideBar  from "@/components/component/SideBar"

export default function StatsLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <SideBar>
              {children}
      </SideBar>
    )
  }