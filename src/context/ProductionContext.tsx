"use client";
import { Product } from '@/types/Data';
import { createContext, useState, useContext, ReactNode } from 'react';


interface ProductionData {
    warehouse_name: string;
    products:Product[]
}

interface ProductionDataContextType extends ProductionData {
  updateProductionData: <K extends keyof ProductionData>(data: ProductionData[K], type: K) => void;
}

const WareDataContext = createContext<ProductionDataContextType | undefined>(undefined);


export const WareDataProvider = ({ children, warehouse_name, products }: { children: ReactNode, warehouse_name:string, products:Product[] }) => { 
    const [data, setData] = useState<ProductionData>({
        warehouse_name,
        products
    });
    const updateProductionData = <K extends keyof ProductionData>(newData: ProductionData[K], type: K) => {
        setData(prev => ({
          ...prev,
          [type]: newData
        }));
      };

  return (
    <WareDataContext.Provider value={{
        warehouse_name:data.warehouse_name,
        updateProductionData:updateProductionData,
        products:data.products
    }}>
      {children}
    </WareDataContext.Provider>
  );
}

export function useWareData(): ProductionDataContextType {
    const context = useContext(WareDataContext);

    if (!context) {
        throw new Error('useWareData must be used within a WareDataProvider');
      }
      return context;
}