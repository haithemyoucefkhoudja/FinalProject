import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "@/components/ui/buttonLoading";
import { ProductsFormSchema } from "@/schemas/Product";
import { ProductInput } from "./ProductItem";
import { Trash } from "lucide-react";
import { useShipment } from "@/context/ShipmentContext";
import { Factory } from "@/types/Data";
import { NoData } from "@/components/ui/NoData";
import createShipment from "@/actions/createShipment";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
  
interface IProductForm {
  Factories:Factory[]
  updateshow:()=>void
}
export const ProductForm:React.FC<IProductForm> = ({Factories, updateshow}) => {
    const props = useShipment()
    const router = useRouter()
    const {data:session, status}  = useSession();
    const Availableproducts = Factories.find(factory=>(factory.name === props.origin_factory))?.products
    if(!Availableproducts)
      return<NoData></NoData>
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
        if(!session)
          return
          let Products:{id:number, name:string, quantity:number}[] = []
          for(let i = 0; i< values.products.length; i++)
            {
              for (let j = 0 ; j < Availableproducts.length; j++){
                
              if(values.products[i].name == Availableproducts[j].name)
                {
                  if(products[i].quantity > Availableproducts[i].quantity)
                  {
                    setError(`products.${i}.quantity`,{message:'quantity is over the available'})
                    return;
                  }
                
              Products.push({id:Availableproducts[j].id, ...values.products[i]})
              }
            }
          }/*
          
    "company_name": "CEVITAL",
    "driver": "cevital_driver_Bejaia_2",
    "origin_factory": "Bejaia",
    "origin_factory": "target_warehouse_name",
    "arrival_time": "2024-04-27T06:52:00Z",
    "vehicle": "cevital_truck_rouge_2",
          */

          const resp_data = await createShipment({driver:props.driver, origin_factory:props.origin_factory, mean_transportation:props.mean_transportation, destination_warehouse:props.destination_warehouse,arrival_time:props.arrival_time},{...Products}, session?.user.company)
          if(!resp_data.success)
            {
              if(resp_data.error === '')
                resp_data.error = 'Something went Wrong'
              setError('root', {message:resp_data.error})
              return;
            }
          window.location.reload()
          toast.success(resp_data.message, {duration:2000})
      };
      const products = watch("products");

      function removeProduct(d_index:number): void {
      setValue('products', products.filter((_, index) => index !== d_index));
      }
      function addnewProduct(): void {
        if(Availableproducts && Availableproducts.length <= products.length)
          return;
        setValue('products',[...products, { name:'', quantity:0 }])
      }
        const product_names = Availableproducts.map(p=> p.name)
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
                            <ProductInput elements={product_names} type={`products.${index}.name`}  setValue={setValue}  InputType='text' Label='Name' register={register} watch={watch} />
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
                <Loading text="Create Shipment" isLoading={isSubmitting} />
            </button>
            {errors.root && (
                <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-red-500">{errors.root.message}</p>
                </div>
            )}
        </form>
    
    )
}