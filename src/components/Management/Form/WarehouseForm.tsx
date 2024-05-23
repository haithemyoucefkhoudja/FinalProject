import { Loading } from "@/components/ui/buttonLoading";
import { Input } from "@/components/ui/input";
import { useWareData } from "@/context/WarehouseContext";
import { WarehouseFormSchema } from "@/schemas/Warehouse";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocateFixedIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const WarehouseForm = (props:any) =>{
  const data = useWareData()
  
  const Dropref = useRef<null | HTMLDivElement>(null)
    const {
        watch,
        setValue,
        setError,
        register,
        handleSubmit,
        formState: { isSubmitting,errors, },
        
      }  = useForm<z.infer<typeof WarehouseFormSchema>>({
      resolver: zodResolver(WarehouseFormSchema),
      defaultValues: {
        warehouse_name: data.warehouse_name,
        warehouse_type: data.warehouse_type,
        warehouse_Lat: data.warehouse_pos[0],
        warehouse_Long: data.warehouse_pos[1]
        
      },
    });
    useEffect(()=>{
      setValue('warehouse_Lat', data.warehouse_pos[0])
      setValue('warehouse_Long', data.warehouse_pos[1])
    },[data])

    const onSubmit = async (values: z.infer<typeof WarehouseFormSchema>) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log(values);
          if(true){
            props.updateData(values)
            props.send()
          }
          resolve();
        }, 2000); // Simulate a network request
      });
      
    }
  function DropMenuEvent() {
    if(Dropref.current) {
      if (Dropref.current.style.display === 'none') {
        Dropref.current.style.display = 'block'; // Show the dropdown
      } else {
        Dropref.current.style.display = 'none'; // Hide the dropdown
      }
      }
  }

  function OptionEvent(option: 'Factory' | 'Warehouse'): void {
    if(Dropref.current)
      Dropref.current.style.display = 'none'; // Hide the dropdown
    setValue('warehouse_type', option);

  }
  const warehouse_name = watch('warehouse_name')
  const selectedOption = watch('warehouse_type');
  const Lat = watch('warehouse_Lat');
  const Long = watch('warehouse_Long');
  useEffect(() => {
    data.updateWareData(
      warehouse_name,
      'warehouse_name'
    )
    data.updateWareData(
      selectedOption,
      'warehouse_type'
    )
  }, [warehouse_name, selectedOption]);

    return(
      
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 ">
      <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Warehouse Name:</label>
        <Input {...register("warehouse_name")} className=" rounded-sm ring-2 ring-gray-200" type="text" placeholder="Ware N:1" />
      {errors.warehouse_name && (
        <div className="text-red-500 text-sm">{errors.warehouse_name.message}</div>
      )}
      </div>
      <div className="space-y-1 space-x-2  h-6 w-6 inline-flex items-baseline">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Latitude:</label>
          <p className="text-sm font-medium leading-none">{Lat}</p>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Long:</label>
        <p className="text-sm font-medium leading-none">{Long}</p>
        <button  onClick={()=>props.showMap()} className="self-center ml-auto h-8 w-8 border border-gray-200 bg-white hover:bg-gray-300 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " type="button">
          <LocateFixedIcon className="h-8 w-8"></LocateFixedIcon>
        </button>
      </div>
      <div className="space-y-1">
        
      {errors.warehouse_Lat && (
        <div className="text-red-500 text-sm">Lat:{errors.warehouse_Lat.message}</div>
      )}
      {errors.warehouse_Long && (
        <div className="text-red-500 text-sm">Long:{errors.warehouse_Long.message}</div>
      )}
      </div>
      <div className="space-y-1">
        
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Warehouse Type:</label>
      <button onClick={()=> DropMenuEvent()} type="button" className="flex  justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
            {selectedOption}
            <svg className="-mr-1 ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
    
          <div ref={Dropref} className=" hidden absolute z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          {WarehouseFormSchema.shape.warehouse_type.options.map((option) => (
            <button   type="button" onClick={()=> OptionEvent(option)} key={option} value={option} {...register("warehouse_type")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md hover:text-gray-900" role="menuitem">{option}</button>
          ))}
            
          </div>
      </div>
      {errors.root &&
              <div className=" flex items-center space-x-4">
                <FontAwesomeIcon icon={faExclamationCircle} color="red"/>
                  <p className="text-sm font-medium text-red-500">
                  {errors.root.message}
                  </p>
            </div>
      }
        <button className="h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 "  disabled={isSubmitting} type="submit">
          <Loading text="Register" isLoading={isSubmitting}/>
          
        </button>
    </form>
    )
}