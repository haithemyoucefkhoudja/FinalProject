import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "@/components/ui/buttonLoading";
import { ProductManagementFormSchema } from "@/schemas/ProductManagement";
import { Input } from "@/components/ui/input";
import { ProductsWarehouseFormSchema } from "@/schemas/ProductWarehouse";
import { Warehouse } from "@/types/Data";
import toast from "react-hot-toast";
  
interface IWarehouseFill {
    Warehouses:Warehouse[]
}
export const WarehouseFill:React.FC<IWarehouseFill> = ({Warehouses}) => {

    const {
        handleSubmit,
        setError,
        register,
        control,
        formState: { isSubmitting, errors },
      } = useForm<z.infer<typeof ProductsWarehouseFormSchema>>({
        resolver: zodResolver(ProductsWarehouseFormSchema),
        defaultValues: {
          products:Warehouses.map(warehouse=>{return({price:0, warehouse_name:warehouse.name, safety_level:0})})
        },
      });
      const onSubmit = async (values: z.infer<typeof ProductsWarehouseFormSchema>) => {
        try {
          toast.success('You did it!');
        } catch (error) {
          setError('root', { message: 'An unexpected error occurred' });
        }
      };
      const { fields } = useFieldArray({
        control,
        name: 'products'
      });
      return(  <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end ">
        <p className=" p-2 bg-black text-white rounded-md">
        2/2
        </p>
      </div>
      <section className="overflow-auto max-h-96 ">
      {fields && fields.map((product, index)=>
        <div className="space-y-2 mb-3" key={product.id}>
            <div className="flex items-center">
                <p className=" text-gray-700 text-md font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> {product.warehouse_name}</p>
            </div>
            <div className="space-x-2 flex p-2">
              <div className="space-y-1 w-full">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Price:</label>
                  <Input {...register(`products.${index}.price`)} className="w-1/2 rounded-sm ring-2 ring-gray-200 " type="number" placeholder="Price" />
                  {errors.products && (
                <div className="text-red-500">
                  {errors.products[index]?.price?.message}
                </div>
              )}
              </div>
              <div className="space-y-1 w-full">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Safety Level:</label>
                      <Input className=" w-1/2  rounded-sm ring-2 ring-gray-200 " {...register(`products.${index}.safety_level`)} type="number" placeholder="Safety Level" />
                      {errors.products &&  (
                <div className="text-red-500">
                  {errors.products[index]?.safety_level?.message}
                </div>
              )}
              </div>
            </div>
        </div>      
        )}
              
      </section>
      <button
        className="h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50"
        disabled={isSubmitting}
        type="submit"
      >
        <Loading text="Next" isLoading={isSubmitting} />
      </button>
    {errors.root && (
      <div className="flex items-center space-x-4">
        <p className="text-sm font-medium text-red-500">{errors.root.message}</p>
      </div>
    )}
    </form>)
}