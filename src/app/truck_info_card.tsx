
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
export default function(){
	let Account_model="honda civic"
	let Account_id="42069"
	let plate="800-70-14-idk"
	let run="what's a run"
	let state="Texas"
	return(
	<div className="w-[35vw] h-[20vh] border border-black rounded flex justify-between text-[1.5em] relative">
		<div className="flex flex-col   w-[50%]  m-[1rem]">
			<p className="">Model: {Account_model}</p>
			<p className="">Id: {Account_id}</p>
		</div>


		<div className="flex   h-[100%] w-[40%] flex-col  m-[1rem] ">
				<p className="pl-[0.5rem]">plate: {plate}</p>
			    <p className="pl-[0.5rem]">run: {run}</p>
			    <p className="pl-[0.5rem]">state: {state}</p>
		
		</div>
		<div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
				
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} />
			</div>
	</div>
	);
}