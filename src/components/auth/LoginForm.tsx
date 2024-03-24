"use client";
import {  useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/actions/VeirfyCaptcha";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: "400"
})

  // Define types for your state variables if necessary
interface UserForm {
    email: string;
    password: string;
  }
  const map = new Map<string, string>([
    ['CredentialsSignin', 'wrong credentials']
]);
  export default function LoginForm({register, errorParam}:{register:string | null, errorParam:string | null| undefined}) {
    const recaptchaRef = useRef<ReCAPTCHA>(null);    
    const [isVerified, setIsverified] = useState<boolean>(false);
    const [userForm, setUserForm] = useState<UserForm>({
      email: "",
      password: "",
    });
    const [error, setError] = useState<string>(errorParam ? errorParam && map.get(errorParam) || ' ' : ' ');
    const router = useRouter();
    async function handleCaptchaSubmission(token: string | null) {

      try {
        await verifyCaptcha(token);
        
        setIsverified(true);
      } catch (error) {
        setIsverified(false);
      }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!isVerified)
      return;
      const {email, password } = userForm;
    if (!email || !password) {
      setError(" enter credentials ");
      return;
    }
    if (password.length < 6)
    {
      setError("password too short");
      return;
    }
    try {
        const res = await signIn("credentials", {
          email:email,
          password:password,
        });
        if (res?.error) {
          setError("credentials error");
          return;
        }
        if (res?.url) router.push(res.url, {scroll:false});
      } catch (error) {
        console.log(error);
      }
    
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserForm((prev) => ({ ...prev, [id]: value }));
  };
  /*
  <input type="text"
        placeholder="name"
         id="name"
         onChange={handleChange}
          classNameName="auth-input" />*/
  return (
    <div className="flex  h-fit py-12 xsm:py-0 md:py-6 lg:py-8  items-center justify-center space-y-4 md:flex-row md:min-h-0 md:space-y-0 mx-auto rounded-xl mt-10 bg-white w-fit  shadow-lg ">
  <form className={`grid  grid-cols-1`} onSubmit={handleSubmit}>
    <label>
        <input type="text"
        id="email"
        onChange={handleChange}
         className={` border-2 border-cyan-950`}  required/>
        <span className={roboto.className}>Email</span>
    </label> 
    <label>
        <input type="password"
        id="password"
        onChange={handleChange}
         className={`border-2 border-cyan-950`} required/>
        <span className={roboto.className}>Password</span>
    </label>
    <button className={``} type="submit" >Login</button>
    {error &&
        <p className={``} style={{color:"red"}}>
              {error}
            </p>
          }
    <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />
    
</form>

</div>
  
)}