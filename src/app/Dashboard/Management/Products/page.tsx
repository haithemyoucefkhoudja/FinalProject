import FetchAllData from "@/actions/FetchData";
import get_ProductsInfo from "@/actions/FetchProductsInfoCard";
import { getServerSession } from "@/app/utils/getServerSession";
import { WrapperComponent } from "@/components/Management/Product/ProductWrapper";
import { NoData } from "@/components/ui/NoData";
export default async function Page(){
	const session =await getServerSession()
    if(!session)
        return <NoData></NoData>
    const WareData = await FetchAllData(session);
	if(!WareData)
		return(<NoData/>)
    const Data = await get_ProductsInfo()
    if(!Data.success || !Data.products)
        return<NoData/>
    const Warehouses = WareData.warehouses
	const Products = Data.products

	/*const cards=Data.warehouses.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]"><Product_info_card product_name={item.product_name}  /></div>
	})*/
	return(
		<div className="flex flex-col items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
		   <WrapperComponent session={session} productList={Products} warehouses={Warehouses}  />
		</div>
	)
}