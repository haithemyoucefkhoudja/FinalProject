import Company_info_card  from "@/prototyping_components/company_info_card.tsx";

type Props={
company_name:string;
}
export default async function Page(){

   const data:Props[] = [
    {
    company_name: "Cevital Group",
    },
   
    ];

	const cards=data.map((item)=>{
		return <span className="m-[3vh]"><Company_info_card company_name={item.company_name}/></span>
	})
	return (
	 <>
	   <div className=" rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	    <div className="flex flex-col items-center">
	     {cards}
	    </div>
	 </>
	)
}