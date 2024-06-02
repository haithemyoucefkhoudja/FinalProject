import React, {  useState } from 'react';
import { MenuForm } from '../Form/ProductForm/ProductDescreption';

import { X } from 'lucide-react';
import { WarehouseFill } from '../Form/ProductForm/WarehouseFill';
import { ProductInfo } from '@/types/Data';
import { ProductManagProvider } from '@/context/ManagementProductContext';

interface EditProduct extends ProductInfo {
  send: () => void;
}
const EditProduct: React.FC<EditProduct> = (props) => {
  const [showProducts, setShowProducts] = useState(false);
  
  return (
    
    <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
       
          <div className="fixed inset-0 flex  items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md max-h-fit">
              <button
                onClick={()=> {
                    props.send()}}
                className=" text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X></X>
              </button>{
                <ProductManagProvider {...props}>
                <section  className="w-full space-y-6">
                  
                {!showProducts ? (
                <MenuForm {...props} updateShow={()=>{setShowProducts(true)}}/>
                ) : (
                    <WarehouseFill send={()=>{props.send()}} Warehouses={props.data_per_warehouse }/>
                  
                  )

                }
              </section>
              
              </ProductManagProvider>
    }
    </div>
    </div>
    </div>
  );
};

export default EditProduct;
