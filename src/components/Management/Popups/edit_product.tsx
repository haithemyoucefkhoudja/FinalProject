import React, { useEffect, useState } from 'react';
import { MenuForm } from '../Form/ProductForm/ProductDescreption';

import { X } from 'lucide-react';
import { ProductUpdatedProps } from '@/types/ProductType';
import { WarehouseFill } from '../Form/ProductForm/WarehouseFill';
import { Warehouse } from '@/types/Data';
import FetchAllData from '@/actions/FetchData';

interface EditProduct extends ProductUpdatedProps {
  updateData: ({product}:{ product: ProductUpdatedProps}) => void;
  send: () => void;
}
const EditProduct: React.FC<EditProduct> = (props) => {
  const [showProducts, setShowProducts] = useState(false);
  const [data, setData] = useState<Warehouse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        
        const result = await FetchAllData('admin');
        if(!result?.warehouses)
          throw new Error('No warehouses are available')
        setData(result.warehouses);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once
  return (
    
    <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
       {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
          <div className="fixed inset-0 flex  items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md max-h-fit">
              <button
                onClick={()=> {
                    props.send()}}
                className=" text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X></X>
              </button>
        
              {!error && <section  className="w-full space-y-6">
      {!showProducts ? (
      <MenuForm updateShow={()=>{setShowProducts(true)}}/>
      ) : (
          <WarehouseFill Warehouses={data || []}/>
        
        )

      }
    </section>}
    </div>
    </div>
    </div>
  );
};

export default EditProduct;
