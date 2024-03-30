import LoginForm from "@/components/auth/LoginForm";

export default async function Login() {
    return (
    <div className="flex flex-col px-6   h-fit py-12 xsm:py-0 md:py-6 lg:py-8  items-center justify-center space-y-4  md:min-h-0 md:space-y-0 mx-auto rounded-xl mt-10  w-fit  shadow-lg ">
      <LoginForm />
    </div>);
}