import { SideBar } from "@/components/component/SideBar"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        // inside SideBar you have to replace Links with buttons*/
        // each button will perform Action On Page (children) good luck homie
        <SideBar>
            <section>
                {children}
            </section>
      </SideBar>
    )
  }