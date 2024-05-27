'use client';

import Warehouse_info_card from "@/prototyping_components/warehouse_info_card";
import { Warehouse } from "@/types/Data";
import { useState } from "react";

type WarehouseType = 'Factory' | 'Warehouse';
interface MixedData extends Warehouse{
    type: WarehouseType
}
interface WareListProps {
    WareList:MixedData[]
}
export const WarehouseList:React.FC<WareListProps> = ({WareList}) =>{
    return(WareList.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]">
                    <Warehouse_info_card warehouse_name={item.name} type={item.type} long={item.longitude} lat={item.latitude} id={item.id}  />
                </div>
	}))
}