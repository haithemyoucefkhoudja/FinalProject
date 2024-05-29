'use client';
import { ProductCompany } from "@/types/Data";
import ProductInfoCard from "./ProductInfoCard";
import { ProductUpdatedProps } from "@/types/ProductType";

interface WareListProps {
    Products:ProductCompany[];
    updateData: ({product}:{product: ProductUpdatedProps}) => void;
}
export const ProductList:React.FC<WareListProps> = ({Products, updateData}) =>{
    return(
        <div className="flex flex-col justify-evenly items-center">
        {Products.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]"><ProductInfoCard product_desc={item.description} product_name={item.name} price={item.mid_price} safety_level={item.safety_level} product_id={item.id}   /></div>
	})}
    </div>)
}