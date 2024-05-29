import FetchAllData from "@/actions/FetchData";
import { getServerSession } from "@/app/utils/getServerSession";
import { WrapperComponent } from "@/components/Management/Warehouse/WarehouseWrapperComponent";
import { NoData } from "@/components/ui/NoData";
import {   WarehouseType } from "@/types/Data";


export default async function Page() {
    const session =await getServerSession()
    if(!session)
        return <NoData></NoData>
    
    const Data = await FetchAllData(session.user.role)
    if(!Data)
        return<NoData/>
    const factoriesWithType = Data.factories.map(factory => ({
        ...factory,
        type: 'Factory' as WarehouseType,
        shipments:undefined
      }));
      
      const warehousesWithType = Data.warehouses.map(warehouse => ({
        ...warehouse,
        type: 'Warehouse' as WarehouseType,
      }));
      
      const MixedData = [...factoriesWithType, ...warehousesWithType];
	return(
		<div className="flex flex-col  items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	      	<WrapperComponent WareList={MixedData} />
		</div>
	)
}