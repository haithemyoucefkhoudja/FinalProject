"use client";
import { ResponsiveLine } from '@nivo/line'

const materialDesignLightColors = [
  "#e1bee7",
  "#bbdefb",
  "#b2dfdb",
  "#c8e6c9",
  "#dcedc8",
  "#f0f4c3",
  "#fff9c4",
  "#ffecb3",
  "#ffe0b2",
  "#ffccbc",
  "#d7ccc8",
  "#f5f5f5",
  "#cfd8dc"   
];
export function LineCharts({data}:{data: {
    id: string;
    color: string;
    data: {
        x: string;
        y: number;
    }[];
}[]}){

    return(
    <div className="gap-6 max-h-1/2">
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm" >
      <div className="flex p-6 flex-col">
        <h3 className="font-semibold leading-none tracking-tight"> Company Sales Report</h3>
      </div>
      <div className=" pt-0 flex">
        <MyResponsiveLine  data={data}  />
      </div>
    </div>
  </div>
  
    )
}

const MyResponsiveLine = ({ data  }:{data: {
    id: string;
    color: string;
    data: {
        x: string;
        y: number;
    }[];
}[]}) => (
    <div className='aspect-[2.5/1] w-full overflow-x-auto '>
        <ResponsiveLine
            data={data}
            margin={{ top: 100, right: 200, bottom: 100, left: 100 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'sales',
                legendOffset: -50,
                legendPosition: 'middle',
                truncateTickAt: 0,
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
)