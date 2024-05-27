'use client';
import { ProductWareHouse, Warehouse, WarehouseType } from "@/types/Data";
import { useState } from "react";
import { WarehouseList } from "./WarehouseCollection";
import { AddButton } from "./AddButton"
import { UpdatedProps } from "@/types/WarehouseType";

interface MixedData extends Warehouse{
    type: WarehouseType
}
interface WrapperComponentProps {
    WareList:MixedData[]
}
export const WrapperComponent:React.FC<WrapperComponentProps> = ({WareList}) =>{
    const [warehouses, setWarehouses] = useState<MixedData[]>(WareList)
    return(
        <>
            <AddButton warehouse_own_id={-1} updateWarehouses={({ware_data,mode})=>{ 
                setWarehouses(prev=> [...prev, {
                    id: ware_data.warehouse_own_id,
                    name: ware_data.warehouse_name,
                    longitude: ware_data.warehouse_Long,
                    latitude: ware_data.warehouse_Lat,
                    products: [] as ProductWareHouse[],
                    shipments: undefined,
                    type:ware_data.warehouse_type
                } as MixedData])
            } }></AddButton>
            <div className="flex flex-col items-center">
                <WarehouseList updateData={
                    ({ware_data,mode})=>{ 
                        setWarehouses(prevWarehouses => 
                            prevWarehouses.map(warehouse => 
                              warehouse.id === ware_data.warehouse_own_id ? { ...warehouse, 
                                latitude:ware_data.warehouse_Lat,
                                longitude:ware_data.warehouse_Long,
                                name:ware_data.warehouse_name,
                                type:ware_data.warehouse_type
                               } : warehouse
                            )
                          );
                    }
                } WareList={warehouses}/>
            </div>
        </>
    )
}