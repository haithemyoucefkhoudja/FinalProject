import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MenuInput } from "./MenuItem";
import { Loading } from "@/components/ui/buttonLoading";
import { DPFormSchema } from "@/schemas/DPoperation";
import { Factory } from "@/types/Data";
import { useProduction } from "@/context/ProductionContext";
interface IMenuForm {
    updateShow: ()=>void
    factorys:Factory[]
}
export const MenuForm:React.FC<IMenuForm> = ({updateShow, factorys}) => {
  const {updateProductionData} =useProduction()
  const factory_Names =  factorys.map(factory=>factory.name)
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
          factory: ""
        },
      });
      const onSubmit = async (values: z.infer<typeof DPFormSchema>) => {
        try {
          const isAvailable = factory_Names.some(factory=> factory == values.factory)
          if(!isAvailable)
            {
              setError('factory',{message:'factory not found'})
              return;
        }
          updateProductionData(values.factory, 'factory_name');
          updateShow()
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
        <MenuInput elements={factory_Names} type='factory' errorMessage={errors?.factory?.message} InputType='text' setValue={setValue} register={register} watch={watch} Label='factory' />
        
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