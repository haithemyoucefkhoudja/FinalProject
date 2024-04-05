import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { Charts } from "@/components/component/Charts";
export default async function Page() {
    const session = await getServerSession(authOptions);
    return(
    
        <Suspense >
        {session && session.user &&
    <Charts></Charts>
    }</Suspense>)
}