import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "@/components/ui/buttonLoading";
import { ProductsFormSchema } from "@/schemas/Product";

import { Trash } from "lucide-react";
import { ProductInput } from "./ProductItem";
import { useProduction } from "@/context/ProductionContext";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { checkChanges } from "@/actions/check";
import get_Products from "@/actions/FetchAvailableProducts";
import production from "@/actions/Production";
  
interface IProductForm {
  updateShow:()=>void
}
export const ProductForm:React.FC<IProductForm> = ({updateShow}) => {
    const [AvailableProducts, setAvailableProducts] = useState([])
    const { factory_name} = useProduction()
    const {data, status} = useSession()
    const router = useRouter()
    useEffect(()=>{
      if(status !== 'authenticated')
        return;
    async function FetchProducts() {
       if(!data)
        return;
      const Change = await checkChanges({user_id:data.user.id, role:data.user.role, company_name:data.user.company, warehouse_name:data.user.warehouse})
      if(Change.change) {
            router.refresh()
      }
      if(Change.deleted) {
          signOut()
      }
      const AvailableProducts = await  get_Products()
      if(!AvailableProducts.success) {
          toast.error(AvailableProducts.message,{duration:2000});
          return;
      }
      setAvailableProducts(AvailableProducts.products);
      console.log('products:',AvailableProducts.products)
      }
      FetchProducts()
    },[status, data])
    const {
        handleSubmit,
        setError,
        setValue,
        register,
        watch,
        formState: { isSubmitting, errors },
      } = useForm<z.infer<typeof ProductsFormSchema>>({
        defaultValues:{
            products:[]
        },
        resolver: zodResolver(ProductsFormSchema),
      });

      const onSubmit = async (values: z.infer<typeof ProductsFormSchema>) => {
        if(!data)
          return;
        const Data = 
        { warehouse_name: factory_name,
          products:values.products
        }
        const Change = await checkChanges({user_id:data.user.id, role:data.user.role, company_name:data.user.company, warehouse_name:data.user.warehouse})
        if(Change.change) {
            router.refresh()
        }
        if(Change.deleted)
          {
            signOut()
          } 
        
        const BackData = await production(Data)
        console.log(BackData)
        if(!BackData.success)
          {
            if(BackData.error === '')
              BackData.error = 'Something went Wrong'
            setError('root', {message:BackData.error})
            return;
          }
          
          toast.success(BackData.message,{duration:2000});
          updateShow()
          router.refresh()
      };
      const products = watch("products");
      function removeProduct(d_index:number): void {
      setValue('products', products.filter((_, index) => index !== d_index));
      }
      function addnewProduct(): void {
        if(products.length >= AvailableProducts.length)
          return;
        setValue('products',[...products, { name:'', quantity:0 }])
      }
      return(  
      
        
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2"> 
      
      <div className="flex justify-end ">
        <p className=" p-2 bg-black text-white rounded-md">
        2/2
        </p>
      </div>
      
      
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                
                <div className="space-y-2">
                    {products.map((ele, index)=>{
                        return (
                        <div key={index *200} className='border-y-2 border-gray-700 p-4 flex flex-col  space-y-1'>
                            <div className="flex justify-end">
                              
                            <button type="button"  className="ml-auto h-8 w-8 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " onClick={()=> {removeProduct(index)}}>
                                <Trash className="h-6 w-6"/>
                            </button>
                            </div>
                            <div className="flex space-x-2">
                            <ProductInput elements={AvailableProducts.map(product=> (product as any).name)} type={`products.${index}.name`}  setValue={setValue}  InputType='text' Label='Name' register={register} watch={watch} />
                            <ProductInput elements={[]} type={`products.${index}.quantity`}  InputType='number' setValue={setValue} register={register} watch={watch} Label='Quantity' />
                            </div>
                            <p className="text-red-500">
                              {errors?.products?.[index]?.name?.message}
                            </p>
                            <p className="text-red-500">
                              {errors?.products?.[index]?.quantity?.message}
                            </p>
                        </div>)

                    })} 
                    
                </div>
            </div>
            <button
                    className="h-10 px-4 py-2 w-full bg-gray-100 border-2 border-gray-700 text-gray-700 hover:bg-gray-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50"
                    disabled={isSubmitting}
                    onClick={()=>{addnewProduct()}}
                    type="button">
                        Add new Product
            </button> 
            
            <button
                className="h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50"
                disabled={isSubmitting}
                type="submit"
            >
                <Loading text="Production" isLoading={isSubmitting} />
            </button>
            {errors.root && (
                <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-red-500">{errors.root.message}</p>
                </div>
            )}
        </form>
    
    )
}