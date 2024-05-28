import FetchAllData from "@/actions/FetchData"
import { getServerSession } from "@/app/utils/getServerSession"
import { DoneWrapperComponent } from "@/components/Shipments/DCWrapperComponent"
import { NoData } from "@/components/ui/NoData"
import { DCShipment } from "@/types/Data"

export default async  function Page() {
  
  const session = await getServerSession()
  if(!session)
    return(<NoData/>)
  const Data = await FetchAllData(session.user.role)
    if(!Data)
      return<NoData/> 
    let Shipments:DCShipment[] = [];
    Data.warehouses.map(warehouse=>{
      warehouse.shipments?.map(shipment=>{
        Shipments.push({...shipment, destination_warehouse:warehouse.name });
      })
    })

    return(  
      <DoneWrapperComponent status='canceled' shipments={Shipments}></DoneWrapperComponent>
    )
}