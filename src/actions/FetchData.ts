'use server';

import { getServerSession } from "@/app/utils/getServerSession";
import { Session } from "next-auth";

export default async function fetchDepots(){
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    
    if(session.user.role !== 'Admin')
        throw new Error("you don't have enough permission for this action");
    
    // fetch from api...
    
    return {depot:"success"}
}