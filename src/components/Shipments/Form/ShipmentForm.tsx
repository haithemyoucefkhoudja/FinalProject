import React, { useState } from 'react';
import { MenuForm } from './MenuForm';
import { ProductForm } from './ProductForm';
import { Factory, Warehouse } from '@/types/Data';
import { ShipmentProvider } from '@/context/ShipmentContext';


const ShipmentForm: React.FC<{Warehouses:Warehouse[], Factories:Factory[], updateShow:()=>void}> = ({Warehouses, Factories, updateShow}) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <section  className="w-full space-y-6">
      <ShipmentProvider>
      {!showProducts ? (
      <MenuForm Factories={Factories} Warehouses={Warehouses} updateShow={()=>{setShowProducts(true)}}/>
      ) : (
          <ProductForm updateshow={updateShow} Factories={Factories}/>
        
        )

      }
      </ShipmentProvider>

      
      
      
    </section>
  );
};

export default ShipmentForm;
