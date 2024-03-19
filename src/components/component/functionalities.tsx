"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useState } from "react"
export function Functionalities() {
  const [isHidden, setHidden] = useState(true);
  return (
    <div className={`grid min-h-screen w-full ${isHidden ? 'lg:grid-cols-[0px_1fr]' : 'lg:grid-cols-[280px_1fr]'}`}>
      <div className={`border-r bg-white    flex-1 flex-col  z-10 h-screen transition-transform transform  ease-in-out duration-300   lg:relative absolute   ${isHidden ? '-translate-x-full' : '-translate-x-0'}`}>
        <div className="flex  flex-col gap-2 bg-white">
          <div className={`flex h-16 items-center border-b px-6 ${isHidden ? 'hidden' : ''}`}>
            <Link className={`flex items-center gap-2 font-semibold `} href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
            <Button className={`ml-auto h-8 w-8`} size="icon" variant="outline" onClick={()=> {setHidden(!isHidden)}}>
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
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
                <PackageIcon className="h-4 w-4" />
                Deliveries
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <LandmarkIcon className="h-4 w-4" />
                Routes
              </Link>
              <Link
                className="flex items-center gap-3  rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 "
                href="#"
              >
                <MapPinIcon className="h-4 w-4" />
                Map
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-h-screen">
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6 ">
        <Button className="ml-auto h-8 w-8" size="icon" variant="outline" onClick={()=> {setHidden(!isHidden)}}>
              <BellIcon className="h-4 w-4" />
          </Button>
          {isHidden? 'hidden' :'not hidden'}
          <div className="w-full flex-1">
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto ">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardDescription>Net Sales</CardDescription>
                <CardTitle>$1,234.56</CardTitle>
              </CardHeader>
              <CardContent>
                <CurvedlineChart className="aspect-[2/1]" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Gross Profit</CardDescription>
                <CardTitle>$5,432.10</CardTitle>
              </CardHeader>
              <CardContent>
                <CurvedlineChart className="aspect-[2/1]" />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardDescription>Gross Margin</CardDescription>
              <CardTitle>45%</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[2/1]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Drivers</CardTitle>
              <CardDescription>Performance Metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Deliveries</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>12345</TableCell>
                    <TableCell>56</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>4.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>54321</TableCell>
                    <TableCell>72</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>4.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mike Johnson</TableCell>
                    <TableCell>98765</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Lee</TableCell>
                    <TableCell>13579</TableCell>
                    <TableCell>63</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>4.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kevin Brown</TableCell>
                    <TableCell>24680</TableCell>
                    <TableCell>37</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>4.0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
type SvgProps = React.SVGProps<SVGSVGElement>;

function Package2Icon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function BellIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function HomeIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LineChartIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}


function UsersIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


function PackageIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function LandmarkIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  )
}


function SearchIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function CurvedlineChart(props:any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function LineChart(props:any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function MapPinIcon(props:SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

