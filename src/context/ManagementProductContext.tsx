"use client";
import { DataPerWarehouse, Product, ProductInfo } from '@/types/Data';
import { createContext, useState, useContext, ReactNode } from 'react';


interface ProductInfoContextType extends ProductInfo {
  updateProductInfo: <K extends keyof ProductInfo>(data: ProductInfo[K], type: K) => void;
}

const ProductManagContext = createContext<ProductInfoContextType | undefined>(undefined);


export const ProductManagProvider = ({ children, name, data_per_warehouse, description,id }: { children: ReactNode, name:string, data_per_warehouse:DataPerWarehouse[], description:string, id:number }) => { 
    const [data, setData] = useState<ProductInfo>({
        id,
        name,
        description,
        data_per_warehouse
    });
    const updateProductInfo = <K extends keyof ProductInfo>(newData: ProductInfo[K], type: K) => {
        setData(prev => ({
          ...prev,
          [type]: newData
        }));
      };

  return (
    <ProductManagContext.Provider value={{
        name:data.name,
        updateProductInfo:updateProductInfo,
        id:data.id,
        description:data.description,
        data_per_warehouse:data.data_per_warehouse
    }}>
      {children}
    </ProductManagContext.Provider>
  );
}

export function useProductManag(): ProductInfoContextType {
    const context = useContext(ProductManagContext);

    if (!context) {
        throw new Error('useWareData must be used within a WareDataProvider');
      }
      return context;
}