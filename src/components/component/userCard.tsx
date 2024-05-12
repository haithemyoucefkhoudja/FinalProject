"use client";
import React, { Suspense } from 'react'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react';

export default  function UserCard({isHidden}:{isHidden:boolean}) {
    const { data, status } = useSession();
  return (
    // if status == authenticated and data exists and data.user property exists
    // render the Card component 
    // else fallback To NO DATA div

    <Suspense fallback={<div className=' w-full'> NO DATA</div>}>
        {status == 'authenticated' && data && data.user &&
        <div className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${isHidden ? 'hidden' : ''} m-2 mt-auto`}>
            <div className="flex space-x-2  p-2 items-center">
            <User className=" border-2 border-green-400 rounded-full h-12 w-12"/>
                <div className="pt-0 p-1 flex flex-col items-start ">
                <h3 className="font-semibold leading-none tracking-tight text-lg mr-auto">
                    {/* access the data.user.name from data.user object*/}
                    {data.user.username}
                </h3>
                <p className='text-sm text-gray-500'>
                    
                    {/* access the data.user.role from data.user object*/}
                {data.user.role}
                </p>
                </div>
            </div>
        </div>}
    </Suspense>
  )
}
