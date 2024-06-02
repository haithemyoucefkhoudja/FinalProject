'use client';
import { ProductWareHouse, Warehouse, WarehouseType } from "@/types/Data";
import { useState } from "react";
import { WarehouseList } from "./WarehouseCollection";
import { AddButton } from "./WarehouseAddButton"
import { Session } from "next-auth";

interface MixedData extends Warehouse{
    type: WarehouseType
}
interface WrapperComponentProps {
    WareList:MixedData[]
    session:Session
}
export const WrapperComponent:React.FC<WrapperComponentProps> = ({WareList, session}) =>{
    return(
        <>
            <AddButton warehouse_own_id={-1}></AddButton>
            <div className="flex flex-col items-center">
                <WarehouseList 
                session={session}
                WareList={WareList}/>
            </div>
        </>
    )
}