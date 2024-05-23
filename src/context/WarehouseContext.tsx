"use client";
import { createContext, useState, useContext, ReactNode, ReactElement } from 'react';

type WarehouseType = 'Factory' | 'Warehouse';

interface WareData {
  warehouse_name: string;
  warehouse_type: WarehouseType;
  warehouse_pos: [number, number];
}

interface WareDataContextType extends WareData {
  updateWareData: <K extends keyof WareData>(data: WareData[K], type: K) => void;
}

const WareDataContext = createContext<WareDataContextType | undefined>(undefined);


export const WareDataProvider = ({ children, warehouse_name, warehouse_pos, warehouse_type }: { children: ReactNode, warehouse_name:string, warehouse_pos:[number, number], warehouse_type:WarehouseType }) => { 
    const [data, setData] = useState<WareData>({
        warehouse_name,
        warehouse_pos,
        warehouse_type
    });
    const updateWareData = <K extends keyof WareData>(newData: WareData[K], type: K) => {
        setData(prev => ({
          ...prev,
          [type]: newData
        }));
      };

  return (
    <WareDataContext.Provider value={{
        warehouse_name:data.warehouse_name,
        warehouse_type:data.warehouse_type,
        warehouse_pos:data.warehouse_pos,
        updateWareData   
    }}>
      {children}
    </WareDataContext.Provider>
  );
}

export function useWareData(): WareDataContextType {
    const context = useContext(WareDataContext);

    if (!context) {
        throw new Error('useWareData must be used within a WareDataProvider');
      }
      return context;
}