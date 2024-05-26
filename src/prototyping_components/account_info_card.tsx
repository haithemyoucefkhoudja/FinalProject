"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import Popup_form_edit_account from "./popup_form_edit_account.tsx"

type Props={
	Account_name:string;
	role:string;
	position:string;
}



export default function Account_info_card(props:Props) {
     const [Data, setData] = useState<UpdatedProps>({
    Account_name:props.Account_name,
	role:props.role,
	position:props.position,	
    });
	const [pop,setPop]=useState(false)

	
	return(
	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1em]">
		<div className="flex pl-[1rem] items-center  w-[50%]">
			<img className="rounded-[50%] w-[3.5vw] h-[7vh] bg-blue-500 " src="" />
			<p className="pl-[0.5rem]">{Data.Account_name}</p>
		</div>


		<div className="flex justify-center items-center h-[80%] w-[80%] flex-col  m-[3.75vh]">
			<span className="flex flex-col "><p>Role:{Data.role}</p>
			<p>Position:{Data.position}</p></span>
			<div className="flex justify-between w-[10%] mt-[1rem]">
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
			</div>
		</div>
		{pop && <Popup_form_edit_account {...Data} send={()=>{setPop(false)}} updateData={(newData:UpdatedProps)=>{setData(newData)}}/>}
	</div>
	);
}