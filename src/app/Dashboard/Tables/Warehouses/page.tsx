
import FetchAllData from "@/actions/FetchData";
import { getServerSession } from "@/app/utils/getServerSession";
import { TableFactory } from "@/components/Tables/TableFactory";
import { TablesButton } from "@/components/Tables/TablesButton";
import { Table } from "@/components/Tables/TableWareHouse";
import { NoData } from "@/components/ui/NoData";
import { Common } from "@/types/Data";


export default async  function Page() {
    
    const session = await getServerSession()
    if(!session)
        return(<NoData/>)
    const Data = await FetchAllData(session)
    if(!Data)
        return<NoData/>
        
    if(session.user.role === 'worker')
    {
        const WarehouseName_Id = Data.warehouses.find(warehouse=>warehouse.name == session.user.warehouse ? [{id:warehouse.id, name:warehouse.name}]:null)
        const FactoryName_Id = Data.factories.find(factory=>factory.name == session.user.warehouse ? [{id:factory.id, name:factory.name}]:null)

        if(!WarehouseName_Id && !FactoryName_Id)
            return<NoData></NoData>
        return(
            <section>
            <ul className="space-y-4">
                
            {
            WarehouseName_Id && 
            <Table Warehouse={{...WarehouseName_Id, type:'Warehouse'} as Common} company={session.user.company} >
            </Table>
            }
            { FactoryName_Id &&
                <TableFactory company={session.user.company} Warehouse={{...FactoryName_Id, type:'Factory'}}></TableFactory>                
                }
            </ul>
            
            {WarehouseName_Id && <TablesButton Warehouses={[WarehouseName_Id]} session={session}></TablesButton>}
            {FactoryName_Id && <TablesButton Warehouses={[FactoryName_Id]} session={session}></TablesButton>}
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
                <Table company={session.user.company} Warehouse={{...warehouse, type:'Warehouse'}}></Table>
                
                </li>   
            )})}    
            {Data.factories.map((factory, index)=>{
                    return(   
                <li key={index}>
                <TableFactory company={session.user.company} Warehouse={{...factory, type:'Factory'}}></TableFactory>
                
                </li>   
            )})}    
            </ul>
            <TablesButton Warehouses={Data.factories} session={session}></TablesButton>
        </section>
        )
    return(
        <section >
            <NoData/>
        </section>
)
}