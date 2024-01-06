"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
    const { data: session } = useSession();
  return (
    <div className='grid place-items-center h-screen w-screen'>
            <div className="flex flex-col gap-3">
                <div className="">Name :  {session?.user?.name} </div>
              <div className="">Email : {session?.user?.email} </div>
              <button type="button" onClick={()=>signOut()} className='bg-red-500 text-white px-5 py-2 rounded-sm'>Log Out</button>
            </div>
    </div>
  )
}

export default Dashboard