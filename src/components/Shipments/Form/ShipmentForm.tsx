import React, { useState } from 'react';
import { MenuForm } from './MenuForm';
import { ProductForm } from './ProductForm';


const ShipmentForm: React.FC = () => {
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

export default ShipmentForm;
