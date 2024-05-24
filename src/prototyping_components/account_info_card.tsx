"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import Popup_form_edit_account from "./popup_form_edit_account.tsx"
type Props={
	Account_name:string;
	role:string;
	Position:string;
}



export default function Account_info_card(props:Props){
	const [pop,setPop]=useState(false)
	let Account_name="placeholder" //props.account_name
	let role="placeholder" //props.role             /*this ofc these should be a props, but I can't recall who summons it*/
	let warehouse_name="placeholder"//props.warehouse_na  /*	change it once you hook em up*/
	
	return(
	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1em]">
		<div className="flex pl-[1rem] items-center  w-[50%]">
			<img className="rounded-[50%] w-[3.5vw] h-[7vh] bg-blue-500 " src="" />
			<p className="pl-[0.5rem]">{Account_name}</p>
		</div>


		<div className="flex justify-center items-center h-[80%] w-[80%] flex-col  m-[3.75vh]">
			<span className="flex flex-col "><p>Role:{role}</p>
			<p>Position:{warehouse_name}</p></span>
			<div className="flex justify-between w-[10%] mt-[1rem]">
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
			</div>
		</div>
	    {pop && <Popup_form_edit_account send={()=>{setPop(false)}}/>}
	</div>
	);
}