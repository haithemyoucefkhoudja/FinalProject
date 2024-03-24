import LoginForm from "@/components/auth/LoginForm";

// Define the structure of searchParams
interface SearchParams {
  register?:string;
  error?:string
}

// Use these interfaces in your component's props
interface PageProps {
  
  searchParams: SearchParams;
}
export default async function Login({searchParams}:PageProps) {
  const register = typeof searchParams.register === 'string' ? searchParams.register : null;
  
  const urlSearchParams = typeof searchParams.error ? searchParams.error : null;
    return (<div style={{height:"100vh"}}>
    <LoginForm register={register} errorParam={urlSearchParams} />
    
    </div>);
}