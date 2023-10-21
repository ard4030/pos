import { authOption } from '@/app/api/auth/[...nextauth]/route';
import Products from '@/template/panel/Products'
import { getServerSession } from 'next-auth';
import React from 'react'

const  page = async () => {
    const session = await getServerSession(authOption);

  return (
    <Products mobile={session.user.email} />
  )
}

export default page