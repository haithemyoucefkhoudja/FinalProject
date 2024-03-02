
import { useState } from 'react'

const data=["Cahara","D'arce","Enki","Ragnvaldr"]




export default function (){
const [active,setActive]=useState(false);
return (
	<main className="border border-black rounded-md h-[3vh] z-[1] relative" onClick={()=>{setActive(!active)}} >
		{active ? <div className="border border-black rounded-md w-[100%] flex  flex-col  bg-white ">
		  {data.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
		</div> : <p></p>}

	</main>
	);


}