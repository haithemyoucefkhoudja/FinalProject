"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { RegisterFormSchema } from "@/schemas/Form";
import signUp from "@/actions/InsertUser";
import { Loading } from "../ui/buttonLoading";

const RegisterForm = () => {
    
    const {
      setError,
      register,
      handleSubmit,
      formState: { isSubmitting,errors },
    } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      FirstName:"",
      LastName:"",
      passwordConfirmation:"",
      password: "",
      CompanyName:""
    },
  });
  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {

    const registrationData = await signUp("credentials", values);
    if(registrationData.error)
      setError('root', {message:registrationData.error} )
  };
  

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        
      <p className="text-center text-md text-gray-600 mt-5">
        If you don&apos;t have an account, please.
        <Link className="text-blue-500 hover:underline ml-1" href="/signup">
          Sign up
        </Link>
            </p>
        <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">FirstName:</label>
        <Input {...register("FirstName")} type="text" placeholder="Joe" />
      {errors.FirstName && (
        <div className="text-red-500">{errors.FirstName.message}</div>
      )}
      </div>
          <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">LastName:</label>
        <Input {...register("LastName")} type="text" placeholder="Doe" />
      {errors.LastName && (
        <div className="text-red-500">{errors.LastName.message}</div>
      )}
      </div>
          <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email:</label>
        <Input {...register("email")} type="text" placeholder="JoeDoe@gmail.com" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      </div>
      <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">CompanyName:</label>
        <Input {...register("CompanyName")} type="text" placeholder="Mang Inc" />
      {errors.CompanyName && (
        <div className="text-red-500">{errors.CompanyName.message}</div>
      )}
      </div>
      <div className="space-y-1">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password:</label>
      <Input {...register("password")} type="password" placeholder="password" />
      {errors.password && (
        <div className="text-sm font-medium text-red-500">{errors.password.message}</div>
      )}
      </div>
        </div>
            
          
        
        <div className="space-y-1">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">ConfirmPassword:</label>
      <Input {...register("passwordConfirmation")} type="password" placeholder="Confirmpassword" />
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
        <button className="h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "  disabled={isSubmitting} type="submit">
          <Loading text="Register" isLoading={isSubmitting}/>
          
        </button>

      </form>

  );
};

export default RegisterForm;