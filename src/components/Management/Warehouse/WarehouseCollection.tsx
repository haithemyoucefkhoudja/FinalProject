'use client';

import { Warehouse } from "@/types/Data";
import { UpdatedProps } from "@/types/WarehouseType";
import WarehouseInfoCard from "./WarehouseInfoCard";
import { Session } from "next-auth";

type WarehouseType = 'Factory' | 'Warehouse';
interface MixedData extends Warehouse{
    type: WarehouseType
}
interface WareListProps {
    WareList:MixedData[];
    session:Session
}
export const WarehouseList:React.FC<WareListProps> = ({WareList, session}) =>{
    return(WareList.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]">
                    <WarehouseInfoCard session={session} warehouse_name={item.name} type={item.type} long={item.longitude} lat={item.latitude} id={item.id}  />
                </div>
	}))
}