import FetchAllData from "@/actions/FetchData"
import { getServerSession } from "@/app/utils/getServerSession"
import { DoneWrapperComponent } from "@/components/Shipments/DCWrapperComponent"
import { NoData } from "@/components/ui/NoData"
import { DCShipment  } from "@/types/Data"

export default async  function Page() {
  
  const session = await getServerSession()
  if(!session)
    return(<NoData/>)
  const Data = await FetchAllData(session)
    if(!Data)
      return<NoData/> 
    let Shipments:DCShipment[] = [];
    Data.warehouses.map(warehouse=>{
      warehouse.shipments?.map(shipment=>{
        console.log(shipment.arrival_time )
        if(shipment.arrival_time == 'completed')
        Shipments.push({...shipment, destination_warehouse:warehouse.name });
      })
    })

    return(  
      <DoneWrapperComponent status="done" shipments={Shipments}>
      </DoneWrapperComponent>
    )
}