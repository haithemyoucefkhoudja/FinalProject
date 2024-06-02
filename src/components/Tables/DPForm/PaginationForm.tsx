import React, { useState } from 'react';

import { MenuForm } from './MenuForm';
import { ProductForm } from './ProductForm';
import { Warehouse } from '@/types/Data';
import { ProductionProvider } from '@/context/ProductionContext';


const PaginationForm: React.FC<{Warehouses: Warehouse[]}> = ({Warehouses}) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <section  className="w-full space-y-6">
      <ProductionProvider factory_name='' products={[]}>
      {!showProducts ? (
      <MenuForm updateShow={()=>{setShowProducts(true)}} factorys={Warehouses}/>
      ) : (
          <ProductForm updateShow={()=>{setShowProducts(false)}} />
        
        )

      }
      </ProductionProvider>

      
      
      
    </section>
  );
};

export default PaginationForm;
