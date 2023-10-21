import StepLayout from '@/layout/StepLayout'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOption } from '../api/auth/[...nextauth]/route'

const Steping = async ({children}) => {
  const session = await getServerSession(authOption);
  if(!session) redirect('/')
  return (
    <StepLayout>
        {children}
    </StepLayout>
  )
}

export default Steping