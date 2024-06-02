'use client';
import { ProductInfo,  Warehouse  } from "@/types/Data";
import { useState } from "react";
import { ProductList } from "./ProductCollection";
import { AddButton } from "./ProductAddButton"
import { Session } from "next-auth";

interface WrapperComponentProps {
    productList:ProductInfo[];
    warehouses:Warehouse[];
    session:Session;
}
export const WrapperComponent:React.FC<WrapperComponentProps> = ({productList, warehouses, session}) =>{
    return(
        <>
            <AddButton Products={productList} warehouses={warehouses} ></AddButton>
            <div className="flex flex-col items-center">
                <ProductList warehouses={warehouses}  Products={productList}/>
            </div>
        </>
    )
}