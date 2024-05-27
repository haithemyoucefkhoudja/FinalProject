'use client';

import Warehouse_info_card from "@/prototyping_components/warehouse_info_card";
import { Warehouse, WarehouseType } from "@/types/Data";
import { useState } from "react";
import { WarehouseList } from "./WarehouseCollection";
import { AddButton } from "./AddButton"
import { Session } from "next-auth";
import { UpdatedProps } from "@/types/WarehouseType";

interface MixedData extends Warehouse{
    type: WarehouseType
}
interface WrapperComponentProps {
    WareList:MixedData[]
    session:Session;
}
export const WrapperComponent:React.FC<WrapperComponentProps> = ({WareList}) =>{
    const [warehouses, setWarehouses] = useState<MixedData[]>(WareList)
    return(
        <>
            <AddButton warehouse_own_id={-1} updateWarehouses={(newData:UpdatedProps)=>{ 
                setWarehouses(prev=> [...prev, {} as MixedData])
            } }></AddButton>
            <div className="flex flex-col items-center">
                <WarehouseList WareList={warehouses}/>
            </div>
        </>
    )
}