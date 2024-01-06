import RegisterForm from '@/components/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const Signup = async() => {
    const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default Signup
