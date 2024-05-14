import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react'
import Popup_form_edit_company from "./popup_form_edit_company"

export default function company_info_card(){
	const [nameEdit,setNameEdit]=useState(false)
	let company_name="DN productions"

	return (
		<>
	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1.5em] relative text-black">
		<div className="w-[100%] h-[100%] relative border-black border flex justify-center items-center">
			<p className="text-[1.5em] absolute top-[0] left-[0.5vw] m-[1rem] ">company name:</p>
			<p className="text-[1.25em]">"{company_name}"</p>
			<FontAwesomeIcon className="absolute right-[0] bottom-[0] m-[1rem]"  icon={faPenToSquare} onClick={()=>{setNameEdit(true)}}/>
			{nameEdit && <Popup_form_edit_company send={()=>{setNameEdit(false)}}/>}
		</div>
	</div>
	</>
	);

}