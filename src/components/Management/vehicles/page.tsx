'use client';
import Truck_info_card  from "@/Oussamacomps/truck_info_card.tsx";
import Popup_form_create_truck from "@/Oussamacomps/popup_form_create_truck.tsx";
import { useState } from 'react'

type Props={
    model:string;
    id:number;
    plate:string;
    state:string;
}


export default function Page(){
    const data: Props[] = [
        {
            model: "Toyota Camry",
            id: 123456,
            plate: "ABC123",
            state: "California"
        },
        {
            model: "Honda Accord",
            id: 789012,
            plate: "XYZ789",
            state: "New York"
        },
        {
            model: "Ford Mustang",
            id: 345678,
            plate: "DEF456",
            state: "Texas"
        }
    ];
	const cards=data.map((item)=>{

        return <span className="m-[3vh]"><Truck_info_card model={item.model} id={item.id} plate={item.plate} state={item.state} run={0}/></span>
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