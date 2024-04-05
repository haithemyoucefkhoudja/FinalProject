"use client";
import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react';

export default  function UserCard({isHidden}:{isHidden:boolean}) {
    const { data, status } = useSession();

  return (
    <Suspense>
        {status == 'authenticated' && data && data.user &&
        <Card className={`${isHidden ? 'hidden' : ''} m-2 mt-auto`}>
            <CardHeader className="space-x-2  p-2 items-center">
            <User className=" border-2 border-green-400 rounded-full h-12 w-12"/>
                <CardContent className=" p-1 flex flex-col items-start ">
                <CardTitle className="text-lg mr-auto">
                    {data.user.name}
                </CardTitle>
                <CardDescription>
                {data.user.role}
                </CardDescription>
                </CardContent>
            </CardHeader>
        </Card>}
    </Suspense>
  )
}
