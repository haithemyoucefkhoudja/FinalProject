import Company_info_card  from "@/Oussamacomps/company_info_card.tsx";
import FetchAllData from "@/actions/FetchData";
import { getServerSession } from "@/app/utils/getServerSession";
import { NoData } from "@/components/ui/NoData";

type Props={
company_name:string;
}
export default async function Page(){
	const session =await getServerSession()
    if(!session)
        return <NoData></NoData>
	
    const Data = await FetchAllData(session)
    if(!Data)
        return<NoData/>
	

	return (
		<>
		<div className=" rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
			<div className="flex flex-col items-center">
			<span className="m-[3vh]"><Company_info_card company_name={Data.company.name}/></span>
			</div>
		</div>
	  	</>
	)
}