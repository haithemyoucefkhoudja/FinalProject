"use client";
import { Data, ProductWareHouse } from "@/types/Data";
import { ResponsiveBar } from "@nivo/bar"
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
export function Charts({data}:{data:Data}){
  const ProductsCompanySales = data.company.products.map((product, index)=> {
    return({name:product.name, predicted_sales:product.quantity * product.mid_price, color:materialDesignLightColors[index % materialDesignLightColors.length ]})
  })
  const WarehousesSales = data.warehouses.map((warehouse, index) =>{
    const products = warehouse.products.map((product)=> {
      return(product.quantity * product.price )
    })
    const totalPredictedSales = products.reduce((acc, predicted_sales) => acc + predicted_sales, 0);

    const data= {
      name:warehouse.name,
      total:totalPredictedSales,
      color:materialDesignLightColors[index % materialDesignLightColors.length ]
    }
    return data
  
  })
    return(
        <>
    <div className="grid md:grid-cols-2 gap-6">
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm" >
      <div className="flex p-6 flex-col space-y-2">
        <h3 className="font-semibold leading-none tracking-tight"> Predicted Sales</h3>
      </div>
      <div className="p-6 pt-0 flex justify-center">
        <PredictedSalesChart  productCompanySales={ProductsCompanySales}  />
      </div>
    </div>
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ">
      <div className="flex p-6 flex-col space-y-2">
        <h3 className="font-semibold leading-none tracking-tight">Total Predicted Sales of Each Warehouse</h3>
      </div>
      <div className="p-6 pt-0">
        <TpsoewChart WarehousesSales={WarehousesSales} />
      </div>
    </div>
  </div>
  
  </>
    )
}
function TpsoewChart({WarehousesSales}:{WarehousesSales:{
  name: string;
  total: number;
  color: string;
}[]}) {
    return (
      <div className="aspect-[2/1] w-full overflow-x-auto ">
        <ResponsiveBar
         data={WarehousesSales}
         keys={['total']}
         layout="horizontal"
         indexBy="name"
         padding={0.3}
         colors={({ index }) => WarehousesSales[index].color}
         margin={{ top: 10, right: 10, bottom: 40, left: 150 }}
          
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
  
  function PredictedSalesChart({productCompanySales}:{productCompanySales: {
    name: string;
    predicted_sales: number;
    color:string
}[]}) {
    return (
      <div className="aspect-[2/1] w-full overflow-x-auto ">
        <ResponsiveBar

         data={productCompanySales}
         keys={['predicted_sales']}
         layout="horizontal"
         indexBy="name"
         padding={0.3}
         colors={({ index }) => productCompanySales[index].color}
         margin={{ top: 10, right: 10, bottom: 40, left: 150 }}
          
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
  
