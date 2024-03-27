'use client'
import Progress_bar from "./progress_bar.tsx"
export default function shipment_info_card(props:any){

return(
	<div className="w-[90vw] h-[19vh] border border-black border-[3px] flex m-[1.75rem] rounded-[1rem]">
		
		<div className="w-[15%] h-[100%]  flex items-center flex-col ">
			<p className="text-[1.75em] m-[1rem] ">From:</p>
			<p className="text-[1.75em] m-[1rem]">future link</p>
		</div>
		
		<div className="w-[70%] h-[100%] border-r border-l border-black text-[1.45em] flex justify-evenly flex-col">
			<p className="ml-[1em]">Driver: {props.driver_name}</p>
			<div className="ml-[1em] flex items-center justify-evenly"><p>Progress:  </p> <p>{props.progress}</p> <Progress_bar progress={props.progress}/></div>
		    <button className="border border-black w-[6vw] ml-[1em]">Products</button>
		    <p className="ml-[1em]">To arive at: {props.arival}</p>
		</div>
		
		<div className="w-[15%] h-[100%]  flex items-center flex-col ">
			<p className="text-[1.75em] m-[1rem]">To:</p>
			<p className="text-[1.75em] m-[1rem]">future link</p>
		</div>
	</div>
	);
}