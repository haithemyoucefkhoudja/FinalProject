'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react'
import popup_form_edit_company from "./popup_form_edit_company"



export default function Company_info_card(props:any){
	const [nameEdit,setNameEdit]=useState(false)


	return (
		<>
	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1.5em] relative text-black">
		<div className=" w-[100%] h-[100%] relative border-black border flex justify-center items-center">
			<p className="text-[1.5em] absolute top-[0] left-[0.5vw] m-[1rem] ">company name:</p>
			<p className="text-[1.25em]">"{props.company_name}"</p>
			<FontAwesomeIcon className="absolute right-[0] bottom-[0] m-[1rem]"  icon={faPenToSquare} /*replace this >*/onClick={()=>{setNameEdit(true)}}/>
			{/*delete this*/nameEdit && <popup_form_edit_company send={()=>{setNameEdit(false)}}/>}
		</div>
	</div>
	</>
	);

}