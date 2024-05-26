import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MenuInput } from "./MenuItem";
import { Loading } from "@/components/ui/buttonLoading";
import { DPFormSchema } from "@/schemas/DPoperation";
interface IMenuForm {
    updateShow: ()=>void
}
export const MenuForm:React.FC<IMenuForm> = ({updateShow}) => {
  
  const Warehouse_Names =  ["Warehouse Oum El Bouaghi N2", "Warehouse Mostaganem N3", "Warehouse Ouargla N4"]
    const {
        handleSubmit,
        setError,
        setValue,
        register,
        watch,
        formState: { isSubmitting, errors },
      } = useForm<z.infer<typeof DPFormSchema>>({
        resolver: zodResolver(DPFormSchema),
        defaultValues: {
          warehouse: ""
        },
      });
      const onSubmit = async (values: z.infer<typeof DPFormSchema>) => {
        try {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                  console.log(values);
                  updateShow()  
                  resolve();
                }, 2000); // Simulate a network request
              });
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
        <MenuInput elements={Warehouse_Names} type='warehouse' errorMessage={errors?.warehouse?.message} InputType='text' setValue={setValue} register={register} watch={watch} Label='Warehouse' />
        
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