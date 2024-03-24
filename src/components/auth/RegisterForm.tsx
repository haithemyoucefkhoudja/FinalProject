"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "@/actions/VeirfyCaptcha";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: "400"
})

  // Define types for your state variables if necessary
interface UserForm {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    name: string;
    lastname: string;
  }
  
  export default function RegisterForm() {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isVerified, setIsverified] = useState<boolean>(false);
    const [userForm, setUserForm] = useState<UserForm>({
      username: "",
      email: "",
      password: "",
      confirmpassword:"",
      name: "",
      lastname: "",
    });
    const [error, setError] = useState<string>("  ");
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
    
      const { username, email, password, confirmpassword, name, lastname } = userForm;
    if (!username || !email || !password || !name || !lastname) {
      setError("All fields are necessary.");
      return;
    }
    if (password.length < 6)
    {
      setError("too short");
      return;
    }
    if (password !==confirmpassword){    
      setError("wrong credentials");
      return;
    }

    try {

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastname,
          name,
          username,
          email,
          password,
        }),
      });

      if (res.ok) {
        router.push("/login?register=ok");
        return;
      }
      const data = await res.json();
      setError(data.error);
    } catch (error) {
      console.log("Error during registration: ", error);
      
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
    
    <div className="flex flex-col h-fit py-12 xsm:py-0 md:py-6 lg:py-8  items-center justify-center space-y-4 md:flex-row md:min-h-0 md:space-y-0 mx-auto rounded-xl my-10 bg-white w-fit  shadow-lg ">
  <form className={``} onSubmit={handleSubmit}>
    <div className={``}>
        <label>
            <input type="text"
            id="name"
            onChange={handleChange}
             className={``} required/>
            <span className={roboto.className}>Firstname</span>
        </label>

        <label>
            <input type="text"
            id="lastname"
            onChange={handleChange}
             className={``} required/>
            <span className={roboto.className}>Lastname</span>
        </label>
    </div>  
    <label>
        <input type="text"
        id="username"
        onChange={handleChange}
         className={``} required/>
        <span className={roboto.className}>Username</span>
    </label> 
    <label>
        <input type="text"
        id="email"
        onChange={handleChange}
         className={``} required/>
        <span className={roboto.className}>Email</span>
    </label> 
    <label>
        <input type="password"
        id="password"
        onChange={handleChange}
         className={``} required/>
        <span className={roboto.className}>Password</span>
    </label>
    <label>
        <input type="password"
        id="confirmpassword"
        onChange={handleChange}
         className={``} required/>
        <span className={roboto.className}>Confirm Password</span>
    </label>
    <button className={``} type="submit" >Register</button>
    {<p style={{color:'red'}} className={``}>
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