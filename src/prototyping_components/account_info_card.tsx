import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import Popup_form_edit_account from "./popup_form_edit_account.tsx"

export default function(){
	const [pop,setPop]=useState(false)
	let Account_name="long bottom"
	let role="comedic relief"
	return(
	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1.5em]">
		<div className="flex pl-[1rem] items-center  w-[50%]">
			<img className="rounded-[50%] w-[3.5vw] h-[7vh] bg-blue-500 " src="" />
			<p className="pl-[0.5rem]">{Account_name}</p>
		</div>


		<div className="flex justify-center items-center h-[80%] w-[40%] flex-col  m-[3.75vh]">
			<p>role:{role}</p>
			<div className="flex justify-between w-[20%]">
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
			</div>
		</div>
	    {pop && <Popup_form_edit_account send={()=>{setPop(false)}}/>}
	</div>
	);
}