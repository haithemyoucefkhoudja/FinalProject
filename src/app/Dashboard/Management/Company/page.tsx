import Company_info_card  from "@/prototyping_components/company_info_card.tsx";


export default async function Page(){
	let data=["Cevital Group"]

	const cards=data.map((item)=>{
		return <span className="m-[3vh]"><Company_info_card company_name={item}/></span>
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