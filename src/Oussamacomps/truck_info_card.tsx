"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import Popup_form_edit_truck from "./popup_form_edit_truck.tsx"
type Props={
	model:string;
	id:number;
	plate:string;
	run:number;
	state:string;
}

export default function(props:Props) {
     const [Data, setData] = useState<UpdatedProps>({
      model:props.model,
	id:props.id,
	plate:props.plate,
	run:props.run,
	state:props.state
    });
	const [pop,setPop]=useState(false)
	
	return(

	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1em] relative">
		<div className="flex flex-col   w-[50%]  m-[1rem]">
			<p className="">Model: {Data.model}</p>
			<p className="">Id: {Data.id}</p>
		</div>


		<div className="flex   h-[100%] w-[40%] flex-col  m-[1rem] ">
				<p className="pl-[0.5rem]">plate: {Data.plate}</p>
			    <p className="pl-[0.5rem]">run: {Data.run}</p>
			    <p className="pl-[0.5rem]">state: {Data.state}</p>
		
		</div>
		<div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
				
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
			</div>
	      {pop && <Popup_form_edit_truck {...Data} send={()=>{setPop(false)}} updateData={(newData:UpdatedProps)=>{setData(newData)}}/>}
	</div>
	);
}