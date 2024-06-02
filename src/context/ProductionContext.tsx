"use client";
import { Product } from '@/types/Data';
import { createContext, useState, useContext, ReactNode } from 'react';


interface ProductionData {
    factory_name: string;
    products:Product[]
}

interface ProductionDataContextType extends ProductionData {
  updateProductionData: <K extends keyof ProductionData>(data: ProductionData[K], type: K) => void;
}

const ProductionContext = createContext<ProductionDataContextType | undefined>(undefined);


export const ProductionProvider = ({ children, factory_name, products }: { children: ReactNode, factory_name:string, products:Product[] }) => { 
    const [data, setData] = useState<ProductionData>({
        factory_name,
        products
    });
    const updateProductionData = <K extends keyof ProductionData>(newData: ProductionData[K], type: K) => {
        setData(prev => ({
          ...prev,
          [type]: newData
        }));
      };

  return (
    <ProductionContext.Provider value={{
        factory_name:data.factory_name,
        updateProductionData:updateProductionData,
        products:data.products
    }}>
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction(): ProductionDataContextType {
    const context = useContext(ProductionContext);

    if (!context) {
        throw new Error('useWareData must be used within a WareDataProvider');
      }
      return context;
}