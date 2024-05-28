import FetchAllData from "@/actions/FetchData"
import { getServerSession } from "@/app/utils/getServerSession"
import { CWrapperComponent } from "@/components/Shipments/CWrapperComponent"
import { NoData } from "@/components/ui/NoData"
import { ExtendedShipment } from "@/types/Data"


export default async  function Page() {
    
  const session = await getServerSession()
  if(!session)
    return(<NoData/>)
  const Data = await FetchAllData(session.user.role)
    if(!Data)
      return<NoData/> 
    let Shipments:ExtendedShipment[] = [];
    Data.warehouses.map(warehouse=>{
      warehouse.shipments?.map(shipment=>{
        const factory = Data.factories.find(factory=>factory.name == shipment.origin_factory)
        if(!factory)
          return [] as ExtendedShipment[]
        Shipments.push({...shipment, destination_warehouse:warehouse.name,destination_warehouse_coords:[warehouse.latitude, warehouse.longitude], origin_factory_coords:[factory?.latitude,factory?.longitude]});
      })
    })
    return(  
      <CWrapperComponent shipments={Shipments} session={session}></CWrapperComponent>
    )
}