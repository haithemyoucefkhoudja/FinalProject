import FetchAllData from "@/actions/FetchData"
import { getServerSession } from "@/app/utils/getServerSession"
import { CWrapperComponent } from "@/components/Shipments/CWrapperComponent"
import { NoData } from "@/components/ui/NoData"
import { ExtendedShipment } from "@/types/Data"


export default async  function Page() {
    
  const session = await getServerSession()
  if(!session)
    return(<NoData/>)
  const Data  = await FetchAllData(session)
    if(!Data)
      return<NoData/> 
    let Shipments:ExtendedShipment[] = [];
    Data.warehouses.map(warehouse=>{
      warehouse.shipments?.map(shipment=>{
        console.log(shipment)
        if(shipment.arrival_time !== 'canceled' && shipment.arrival_time !== 'completed')
        Shipments.push({...shipment, destination_warehouse:warehouse.name,destination_warehouse_coords:[warehouse.latitude, warehouse.longitude], origin_factory_coords:[shipment?.origin_latitude,shipment?.origin_longitude]});
      })
    })
    return(  
      <CWrapperComponent shipments={Shipments} Warehouses={Data.warehouses} Factories={Data.factories} session={session}></CWrapperComponent>
    )
}