'use client';
import Truck_info_card  from "@/components/Management/vehicles/truck_info_card";
import Popup_form_create_truck from "@/components/Management/vehicles/popup_form_create_truck";
import { useState } from 'react'

type Props={
    model:string;
    id:number;
    plate:string;
    state:string;
}


export default function Page(){
    const data: Props[]  = [
        {
            model: "cevital_truck_rouge_1",
            id: 1,
            plate: "11111 111 11",
            state: "Occupied"
        },
        {
            model: "cevital_truck_rouge_2",
            id: 2,
            plate: "11111 111 12",
            state: "Occupied"
        },
        {
            model: "cevital_truck_gris_1",
            id: 3,
            plate: "11111 111 13",
            state: "Occupied"
        },
        {
            model: "cevital_truck_gris_2",
            id: 4,
            plate: "11111 111 14",
            state: "Occupied"
        },
        {
            model: "cevital_truck_gris_3",
            id: 5,
            plate: "11111 111 15",
            state: "Occupied"
        },
        {
            model: "testcar2",
            id: 7,
            plate: " 124444441",
            state: "Availabe"
        }
    ];
	const cards=data.map((item)=>{

        return <span className="m-[3vh]"><Truck_info_card model={item.model} id={item.id} plate={item.plate} state={item.state}/></span>
    })
    const [pop,setPop]=useState(false) //delete this

    return (
     <div>
	   <div className="flex flex-col items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
        <button className="mt-[2vh] bg-blue-500 w-[7.5vw] p-[0.5rem] text-white rounded" onClick={()=>{setPop(true)}}>Add vehicle</button>
	    <div className="flex flex-col items-center">
	     {cards}
	    </div>
	   </div>
        {pop && <Popup_form_create_truck send={()=>{setPop(false)}}  /> } 
	 </div>
	)
}