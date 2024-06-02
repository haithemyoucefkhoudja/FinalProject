"use client";
import { createContext, useState, useContext, ReactNode } from 'react';


interface ShipmentData {
    origin_factory:string;
    destination_warehouse:string;
    driver:string;
    mean_transportation:string;
    arrival_time:string;
}

interface ShipmentDataContextType extends ShipmentData {
  updateShipmentData: <K extends keyof ShipmentData>(data: ShipmentData[K], type: K) => void;
}

const ProductionContext = createContext<ShipmentDataContextType | undefined>(undefined);


export const ShipmentProvider = ({ children}: { children: ReactNode, }) => { 
    const [data, setData] = useState<ShipmentData>({

    } as ShipmentData);
    const updateShipmentData = <K extends keyof ShipmentData>(newData: ShipmentData[K], type: K) => {
        setData(prev => ({
          ...prev,
          [type]: newData
        }));
      };

  return (
    <ProductionContext.Provider value={{...data, updateShipmentData:updateShipmentData}}>
      {children}
    </ProductionContext.Provider>
  );
}

export function useShipment(): ShipmentDataContextType {
    const context = useContext(ProductionContext);

    if (!context) {
        throw new Error('useWareData must be used within a ShipmentProvider');
      }
      return context;
}