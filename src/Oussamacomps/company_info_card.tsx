'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react'
import Popup_form_edit_company  from "./popup_form_edit_company"

type Props={
	company_name:string;
}

export default function Company_info_card(props:Props){
	const [Data, setData] = useState<Props>({
        	company_name:props.company_name,
    });
    const [pop,setPop]=useState(false) //delete this
	return (
		<>
	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1em] relative text-black">
		<div className=" w-[100%] h-[100%] relative border-black border flex justify-center items-center">
			<p className="text-[1.5em] absolute top-[0] left-[0.5vw] m-[1rem] ">company name:</p>
			<p className="text-[1.25em]">"{Data.company_name}"</p>
			<FontAwesomeIcon className="absolute right-[0] bottom-[0] m-[1rem]"  icon={faPenToSquare} /*replace this >*/onClick={()=>{setPop(true)}}/>
		</div>
	</div>
         {pop && <Popup_form_edit_company {...Data} send={()=>{setPop(false)}} updateData={(newData:Props)=>{setData(newData)}} /> } 
	</>
	);

}