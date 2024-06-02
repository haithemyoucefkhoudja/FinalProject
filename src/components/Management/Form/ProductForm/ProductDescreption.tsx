import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "@/components/ui/buttonLoading";
import { ProductManagementFormSchema } from "@/schemas/ProductManagement";
import { Input } from "@/components/ui/input";
import { ProductInfo } from "@/types/Data";
import { useProductManag } from "@/context/ManagementProductContext";
  
interface IMenuForm extends ProductInfo {
    updateShow: ()=>void
}
export const MenuForm:React.FC<IMenuForm> = ({updateShow, name, description}) => {
  const {updateProductInfo} = useProductManag();
    const {
        handleSubmit,
        setError,
        setValue,
        register,
        watch,
        formState: { isSubmitting, errors },
      } = useForm<z.infer<typeof ProductManagementFormSchema>>({
        resolver: zodResolver(ProductManagementFormSchema),
        defaultValues: {
          name: name,
          Descreption: description,
        },
      });
      const onSubmit = async (values: z.infer<typeof ProductManagementFormSchema>) => {
        try {
            updateShow()
            updateProductInfo(values.name,'name');
            updateProductInfo(values.Descreption,'description');
            
        } catch (error) {
          setError('root', { message: 'An unexpected error occurred' });
        }
      };
      return(  <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end ">
        <p className=" p-2 bg-black text-white rounded-md">
        1/2
        </p>
      </div>

      <div className="space-y-2 mb-3">
      <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name:</label>
        <Input {...register("name")} className="rounded-sm ring-2 ring-gray-200 " type="text" placeholder="Product" />
      {errors.name && (
        <div className="text-red-500">{errors.name.message}</div>
      )}
      </div>
      <div className="space-y-1">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Descreption:</label>
      <Input className="rounded-sm ring-2 ring-gray-200 " {...register("Descreption")}  placeholder="Descreption" />
      {errors.Descreption && (
        <div className="text-sm font-medium text-red-500">{errors.Descreption.message}</div>
      )}
      </div>
      </div>
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