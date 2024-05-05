import { RegisterFormSchema } from "@/schemas/Form";
import { z } from "zod";

export default async function signUp(type:string = 'credential', values:z.infer<typeof RegisterFormSchema>){
    //insert user in backend
    try {
        return {}
    }
    catch(error)
    {
        return {error:""} 
    }
}