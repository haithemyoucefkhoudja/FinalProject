"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { RegisterFormSchema } from "@/schemas/Form";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/buttonLoading";
import signUp from "@/actions/createAccount";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useRef } from "react";
import { AccountInfo } from "@/types/Data";
interface Props extends AccountInfo {
session:Session, 
updateShow:()=>void
}
const ManagementRegisterForm = ({session, updateShow, id, name, warehouse, email, role}:Props) => {
    const router = useRouter()
    const {
      setValue,
      setError,
      register,
      handleSubmit,
      watch,
      formState: { isSubmitting,errors },
    } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
        
      email: email,
      username:name,
      passwordConfirmation:"",
      password: "",
      warehouse_name:warehouse,
      role:role,
      company_name:session.user.company
    },
  });
  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    const registrationData = await signUp(values, id, name);
    
    if(!registrationData.success)
      {
        setError('root', {message:registrationData.error} )
        return;
      }
    toast.success(registrationData.message, {duration:3000})
    updateShow()
    router.refresh()
  };
  const Dropref = useRef<null | HTMLDivElement>(null)

  function DropMenuEvent() {
    if(Dropref.current) {
      if (Dropref.current.style.display === 'none') {
        Dropref.current.style.display = 'block'; // Show the dropdown
      } else {
        Dropref.current.style.display = 'none'; // Hide the dropdown
      }
      }
  }
  
  const selectedOption = watch('role');
  function OptionEvent(option: 'admin' | 'observer' | 'driver' | 'worker'): void {
    if(Dropref.current)
      Dropref.current.style.display = 'none'; // Hide the dropdown  
    setValue('role', option);

  }
  

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        
        <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name:</label>
        <Input className="rounded-sm ring-2 ring-gray-200" {...register("username")} type="text" placeholder="Joe Doe" />
      {errors.username && (
        <div className="text-red-500">{errors.username.message}</div>
      )}
      </div>
          <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email:</label>
        <Input className="rounded-sm ring-2 ring-gray-200" {...register("email")} type="text" placeholder="JoeDoe@gmail.com" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      </div>
      
      <div className="space-y-1">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Role:</label>
      <button onClick={()=> DropMenuEvent()} type="button" className="flex  justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
            {selectedOption}
            <svg className="-mr-1 ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
    
      
      <div ref={Dropref} className=" hidden absolute z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          {['worker', 'admin', 'observer', 'driver'].map((option) => (
            <button   type="button" onClick={()=> OptionEvent(option as "driver" | "observer" | "admin" | "worker")} key={option} value={option} {...register("role")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md hover:text-gray-900" role="menuitem">{option}</button>
          ))}  
      </div>
      </div>

      <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Warehouse:</label>
        <Input className="rounded-sm ring-2 ring-gray-200" {...register("warehouse_name")} type="text" placeholder="Ware N1" />
      {errors.warehouse_name && (
        <div className="text-red-500">{errors.warehouse_name.message}</div>
      )}
      </div>
      {/*<div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">CompanyName:</label>
        <Input disabled className="rounded-sm ring-2 ring-gray-200" {...register("company_name")} type="text" placeholder="Ware N1" />*/}
      {/*errors.company_name && (
        <div className="text-red-500">{errors.company_name.message}</div>
      )
      </div>
      */}
        <div className="space-y-1">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password:</label>
        <Input className="rounded-sm ring-2 ring-gray-200" {...register("password")} type="password" placeholder="password" />
        {errors.password && (
            <div className="text-sm font-medium text-red-500">{errors.password.message}</div>
        )}
        </div>
    
    <div className="space-y-1">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">ConfirmPassword:</label>
        <Input className="rounded-sm ring-2 ring-gray-200" {...register("passwordConfirmation")} type="password" placeholder="Confirmpassword" />
        {errors.passwordConfirmation && (
            <div className="text-sm font-medium text-red-500">{errors.passwordConfirmation.message}</div>
        )}
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
          <Loading text={id==-1 ? 'Create' :'Edit'} isLoading={isSubmitting}/>
          
        </button>
        </div>
      </form>

  );
};

export default ManagementRegisterForm;