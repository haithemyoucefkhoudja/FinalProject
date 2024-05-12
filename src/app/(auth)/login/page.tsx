import LoginForm from "@/components/auth/LoginForm";
import Image from 'next/image'
import LogoImage from '@/public/logo.png'
export default async function Login() {
    return (
      <section className="container px-5 md:h-screen">
        <div className="  flex flex-col max-w-md mx-auto  px-6 bg-slate-100 py-12   items-center justify-center rounded-2xl my-10  w-fit  shadow-lg">
          <header className="flex flex-col space-y-4 items-center mb-4">
            <Image height={LogoImage.height * 0.1} width={LogoImage.width * 0.1} src={LogoImage} alt=''  />
            <h1 className=" text-xl font-bold">
              Welcome Again! 
            </h1>
          </header>
          <LoginForm />
        </div>
    </section>
    );
}