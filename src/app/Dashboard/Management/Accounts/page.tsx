import Account_info_card  from "@/prototyping_components/account_info_card.tsx";


export default async function Page(){
	let data=["one"]

	const cards=data.map((item)=>{
		return <span className="m-[3vh]"><Account_info_card /></span>
	})
	return (
	 <>
	   <div className="rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	    <div className="flex flex-col items-center">
	     {cards}
	    </div>
	   </div>
	 </>
	)
}