'use client';
import {  ProductInfo, Warehouse } from "@/types/Data";
import ProductInfoCard from "./ProductInfoCard";

interface WareListProps {
    Products:ProductInfo[];
    warehouses:Warehouse[]
}
export const ProductList:React.FC<WareListProps> = ({Products, warehouses}) =>{
    return(
        <div className="flex flex-col justify-evenly items-center">
        {Products.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]"><ProductInfoCard {...item}    /></div>
	})}
    </div>)
}