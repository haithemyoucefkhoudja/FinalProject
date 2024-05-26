import React, { useState } from 'react';

import { MenuForm } from './ProductionForm';
import { ProductForm } from './ProductForm';


const PaginationForm: React.FC = () => {
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
