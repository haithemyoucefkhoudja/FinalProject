import Account_info_card  from "@/prototyping_components/account_info_card.tsx";

type Props={
	Account_name:string;
	role:string;
	position:string;
}

export default async function Page(){
	
	
const data:Props[] = [
    {
    Account_name:"name 1",
    role:"role 1",
    position:"position 1"
    },
    ];
	const cards=data.map((item)=>{
		return <span className="m-[3vh]"><Account_info_card Account_name={item.Account_name} role={item.role} position={item.position} /></span>
	})
	return (
	 <>
	   <div className="flex flex-col  items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	    <button className="mt-[2vh] bg-blue-500 w-[7.5vw] p-[0.5rem] text-white rounded">Add account</button>
	    <div className="flex flex-col items-center">
	     {cards}
	    </div>
	   </div>
	 </>
	)
}