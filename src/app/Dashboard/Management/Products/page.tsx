import FetchAllData from "@/actions/FetchData";
import { getServerSession } from "@/app/utils/getServerSession";
import { WrapperComponent } from "@/components/Management/Product/ProductWrapper";
import { NoData } from "@/components/ui/NoData";
export default async function Page(){
	const session =await getServerSession()
    if(!session)
        return <NoData></NoData>
    
    const Data = await FetchAllData(session.user.role)
    if(!Data)
        return<NoData/>
    const Warehouses = Data.warehouses
	const Products = Data.company.products

	/*const cards=Data.warehouses.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]"><Product_info_card product_name={item.product_name}  /></div>
	})*/
	return(
		<div className="flex flex-col items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
		   <WrapperComponent productList={Products}  />
		</div>
	)
}