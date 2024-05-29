'use client';
import {ProductCompany, ProductWareHouse,  } from "@/types/Data";
import { useState } from "react";
import { ProductList } from "./ProductCollection";
import { AddButton } from "./ProductAddButton"
import { ProductUpdatedProps } from "@/types/ProductType";

interface WrapperComponentProps {
    productList:ProductCompany[]
}
export const WrapperComponent:React.FC<WrapperComponentProps> = ({productList}) =>{
    const [products, setProducts] = useState<ProductCompany[]>(productList)
    return(
        <>
            <AddButton product_id={-1} updateWarehouses={({product})=>{ 
                setProducts(prev=> [...prev, {
                    id: product.product_id,
                    name: product.product_name,
                    mid_price: product.price,
                    description:product.product_desc
                } as ProductCompany])
            } }></AddButton>
            <div className="flex flex-col items-center">
                <ProductList updateData={
                    ({product})=>{ 
                        setProducts(prevProducts => 
                            prevProducts.map(prevProduct => 
                              prevProduct.id === product.product_id
                                ? {
                                    ...prevProduct,
                                    name: product.product_name,
                                    description: product.product_desc,
                                    mid_price: product.price,
                                    safety_level: product.safety_level
                                  } as ProductCompany
                                : prevProduct
                            )
                          );
                    }
                } Products={products}/>
            </div>
        </>
    )
}