"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { verifyCaptcha } from "@/actions/VeirfyCaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
const FormSchema = z.object({
  email: z
  .string()
  .min(1, "Email is required!")
  .email("Invalid email!"),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(4, "Password must have than 4 characters!")
    .regex(new RegExp(".*[A-Z].*"), { message: "Must conatain one uppercase character" })
    .regex(new RegExp(".*\\d.*"), { message: "Must contains one number" })
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {message: "Must contain one special character"}),
});

const LoginForm = () => {
    const [isLoading, setIsLoding] = useState<boolean>(false);
    const [Globalerror, setError] = useState<string | null>(null);
    
    const recaptchaRef = useRef<ReCAPTCHA>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleCaptchaSubmission = async  (token: string | null) => {

    try {
      await verifyCaptcha(token);
    } catch (error:any) {
      
    }
}
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const captchaValue = recaptchaRef.current?.getValue()
    if (!captchaValue)
      {
        setError('Please verify the reCAPTCHA!')
        return; 
      }

    setIsLoding(true);
    const loginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
     
    });

    if (loginData?.error) {
        setError(loginData.error);
        setIsLoding(false);
    }
  };
  

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        
      <p className="text-center text-md text-gray-600 mt-5">
        If you don&apos;t have an account, please.
        <Link className="text-blue-500 hover:underline ml-1" href="/signup">
          Sign up
        </Link>
            </p>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage  />
              </FormItem>
            )}
          />
        </div>
        <ReCAPTCHA 
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
            
          />  
              {Globalerror &&
              <div className=" flex items-center space-x-4">
                <FontAwesomeIcon icon={faExclamationCircle} color="red"/>
                  <p className="text-red-500">
                    {Globalerror}
                  </p>
            </div>
            }
        <Button  size='full' type="submit" isloading={isLoading}>
          Login
        </Button>

      </form>

    </Form>
  );
};

export default LoginForm;