import React, { useState } from 'react';

import { MenuForm } from './ProductionForm';
import { ProductForm } from './ProductForm';
import { Warehouse } from '@/types/Data';


const PaginationForm: React.FC<{Warehouses: Warehouse[]}> = ({Warehouses}) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <section  className="w-full space-y-6">

      {!showProducts ? (
      <MenuForm updateShow={()=>{setShowProducts(true)}}/>
      ) : (
          <ProductForm/>
        
        )

      }

      
      
      
    </section>
  );
};

export default PaginationForm;
