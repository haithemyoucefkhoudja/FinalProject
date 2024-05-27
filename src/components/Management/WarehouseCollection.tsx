'use client';

import Warehouse_info_card from "@/prototyping_components/warehouse_info_card";
import { Warehouse } from "@/types/Data";
import { UpdatedProps } from "@/types/WarehouseType";

type WarehouseType = 'Factory' | 'Warehouse';
interface MixedData extends Warehouse{
    type: WarehouseType
}
interface WareListProps {
    WareList:MixedData[];
    updateData: ({ware_data, mode}:{mode:'Creation'|'Edit', ware_data: UpdatedProps}) => void;
}
export const WarehouseList:React.FC<WareListProps> = ({WareList, updateData}) =>{
    return(WareList.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]">
                    <Warehouse_info_card warehouse_name={item.name} type={item.type} long={item.longitude} lat={item.latitude} id={item.id}  updateData={updateData}/>
                </div>
	}))
}