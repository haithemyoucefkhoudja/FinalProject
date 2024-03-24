import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Suspense } from "react";
export default async function Page() {
    const session = await getServerSession(authOptions);
    return(
    
        <Suspense >
        {session && session.user &&
    <div>
        {JSON.stringify(session.user)}
    </div>}</Suspense>)
}