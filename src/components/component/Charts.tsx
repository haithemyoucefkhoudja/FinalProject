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
  
