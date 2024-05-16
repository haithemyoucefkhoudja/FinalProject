"use client";
import { ResponsiveBar } from "@nivo/bar"
import {BarDatum} from '@nivo/bar'
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
        <CurvedlineChart className="aspect-[2/1] overflow-x-auto max-w-fit"  />
      </div>
    </div>
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ">
      <div className="flex p-6 flex-col space-y-2">
        <p className="text-sm text-gray-500">Gross Profit</p>
        <h3 className="font-semibold leading-none tracking-tight">$5,432.10</h3>
      </div>
      <div className="p-6 pt-0">
        <CurvedlineChart className="aspect-[2/1] overflow-x-auto" />
      </div>
    </div>
  </div>
  <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ">
    <div className="flex p-6 flex-col space-y-2">
      <p className="text-sm text-gray-500">Gross Margin</p>
      <h3 className="font-semibold leading-none tracking-tight">45%</h3>
    </div>
    {/*<div className="p-6 pt-0">
      <LineChart className="aspect-[2/1]" />
    </div>*/}
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
  const data = [
    {
      "name": "Category A",
      "value": 40,
      "color": "red"
    },
    {
      "name": "Category B",
      "value": 30,
      "color": "blue"
    },
    {
      "name": "Category C",
      "value": 20,
      "color": "green"
    }
  ];
    return (
      <div {...props}>
        <ResponsiveBar
         data={data}
         keys={['value']}
         layout="horizontal"
         indexBy="name"
         padding={0.3}
         colors={({ index }) => data[index].color}
         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          
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
  
