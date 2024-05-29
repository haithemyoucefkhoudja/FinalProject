
import FetchAllData from "@/actions/FetchData";
import { getServerSession } from "@/app/utils/getServerSession";
import { TablesButton } from "@/components/Tables/TablesButton";
import { Table } from "@/components/Tables/TableWareHouse";
import { NoData } from "@/components/ui/NoData";


export default async  function Page() {
    
    const session = await getServerSession()
    if(!session)
        return(<NoData/>)
    const Data = await FetchAllData(session.user.role)
    if(!Data)
        return<NoData/>
    if(session.user.role === 'worker')
    {
        const WarehouseName_Id = Data.warehouses.find(warehouse=>warehouse.name == session.user.warehouse ? [{id:warehouse.id, name:warehouse.name}]:[])
        return(
            <section>
            <ul className="space-y-4">
                {
                <Table company={session.user.company} Warehouse={Data.warehouses[0]}></Table>                
                }
            </ul>
            
            {WarehouseName_Id&& <TablesButton Warehouses={[WarehouseName_Id]} session={session}></TablesButton>}
            </section>
        )
    }
    if(session.user.role === 'admin')
        return(    
        <section>
            <ul className="space-y-4">
            {Data.warehouses.map((warehouse, index)=>{
                    return(   
                <li key={index}>
                <Table company={session.user.company} Warehouse={warehouse}></Table>
                
                </li>   
            )})}    
            </ul>
            <TablesButton Warehouses={Data.warehouses} session={session}></TablesButton>
        </section>
        )
    return(
        <section >
            <NoData/>
        </section>
)
}