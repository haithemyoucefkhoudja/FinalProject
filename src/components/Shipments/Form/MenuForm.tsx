import { ShipmentFormSchema } from "@/schemas/Shipment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MenuInput } from "./MenuItem";
import { Loading } from "@/components/ui/buttonLoading";
import { Factory, Warehouse } from "@/types/Data";
import { useShipment } from "@/context/ShipmentContext";
const persons: string[] = [
    "Alice",
    "Adam",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Isabella",
    "Jack",
    "Katherine",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Quinn",
    "Ryan",
    "Sophia",
    "Thomas",
  ];
  
interface IMenuForm {
    updateShow: ()=>void;
    Warehouses:Warehouse[];
    Factories:Factory[]
}
export const MenuForm:React.FC<IMenuForm> = ({updateShow, Warehouses, Factories}) => {
  const Factory_Names = Factories.map(factory=>factory.name);
  const Warehouse_Names =  Warehouses.map(warehouse=>warehouse.name);
  const Driver_Names =  ["cevitam_driver_Bejaia_3", "cevitam_driver_Bejaia_4"]
  const {updateShipmentData} = useShipment()
    const {
        handleSubmit,
        setError,
        setValue,
        register,
        watch,
        formState: { isSubmitting, errors },
      } = useForm<z.infer<typeof ShipmentFormSchema>>({
        resolver: zodResolver(ShipmentFormSchema),
        defaultValues: {
          origin_factory: "",
          destination_warehouse: "",
          driver: "",
          mean_transportation: "",
          arrival_time: "",
        },
      });
      
      const onSubmit = async (values: z.infer<typeof ShipmentFormSchema>) => {
        try {
            
          if(!(Factory_Names.some(name=>values.origin_factory== name)))
            {
              setError('origin_factory',{message:'No Factory with this name'})
              return;
        }
          if(!(Warehouse_Names.some(name=>values.destination_warehouse== name))){
            setError('destination_warehouse',{message:'No Warehouse with this name'})
            return;
          }
          updateShipmentData(values.origin_factory, 'origin_factory')
          
          updateShipmentData(values.destination_warehouse, 'destination_warehouse')
          
          updateShipmentData(values.driver, 'driver')
          
          updateShipmentData(values.mean_transportation, 'mean_transportation')
          
          updateShipmentData(values.arrival_time, 'arrival_time')
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
        <MenuInput elements={Factory_Names} type='origin_factory' errorMessage={errors?.origin_factory?.message} setValue={setValue}  InputType='text' Label='Origin Factory' register={register} watch={watch} />
        <MenuInput elements={Warehouse_Names} type='destination_warehouse' errorMessage={errors?.destination_warehouse?.message} InputType='text' setValue={setValue} register={register} watch={watch} Label='Destination Warehouse' />
        <MenuInput elements={[]} type='driver' errorMessage={errors?.driver?.message} InputType='text' Label='Driver' setValue={setValue} register={register} watch={watch} />
        <MenuInput elements={[]} type='mean_transportation' errorMessage={errors?.mean_transportation?.message} InputType='text' setValue={setValue} register={register} watch={watch} Label='Mean of Transportation' />
        <MenuInput elements={[]} type='arrival_time' errorMessage={errors?.arrival_time?.message} Label='Arrival Time' InputType='datetime-local' setValue={setValue} watch={watch} register={register} />
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