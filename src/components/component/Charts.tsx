"use client";
import { ResponsiveLine } from "@nivo/line"
export function Charts(){
    return(
        <>
    <div className="grid md:grid-cols-2 gap-6">
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm" >
      <div className="flex p-6 flex-col space-y-2">
        <p className="text-sm text-gray-500">Net Sales</p>
        <h3 className="font-semibold leading-none tracking-tight">$1,234.56</h3>
      </div>
      <div className="p-6 pt-0">
        <CurvedlineChart className="aspect-[2/1]" />
      </div>
    </div>
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ">
      <div className="flex p-6 flex-col space-y-2">
        <p className="text-sm text-gray-500">Gross Profit</p>
        <h3 className="font-semibold leading-none tracking-tight">$5,432.10</h3>
      </div>
      <div className="p-6 pt-0">
        <CurvedlineChart className="aspect-[2/1]" />
      </div>
    </div>
  </div>
  <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ">
    <div className="flex p-6 flex-col space-y-2">
      <p className="text-sm text-gray-500">Gross Margin</p>
      <h3 className="font-semibold leading-none tracking-tight">45%</h3>
    </div>
    <div className="p-6 pt-0">
      <LineChart className="aspect-[2/1]" />
    </div>
  </div>
  <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ">
    <div className="flex p-6 flex-col space-y-2">
      <h3 className="font-semibold leading-none tracking-tight">Drivers</h3>
      <p className="text-sm text-gray-500">Performance Metrics</p>
    </div>
    <div className="p-6 pt-0">
      
  <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100 ">
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ">Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ">ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ">Deliveries</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ">Issues</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ">Rating</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
            <td className=" p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">John Doe</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">12345</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">56</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">4.5</td>
          </tr>
          <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
            <td className=" p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">John Doe</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">12345</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">56</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">4.5</td>
          </tr>
          <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
            <td className=" p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">John Doe</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">12345</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">56</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">4.5</td>
          </tr>
          <tr className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
            <td className=" p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">John Doe</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">12345</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">56</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2</td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">4.5</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
  </>
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