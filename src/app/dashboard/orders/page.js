import { authOption } from '@/app/api/auth/[...nextauth]/route';
import Orders from '@/template/panel/Orders'
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOption);
  return (
    <Orders mobile={session.user.email} />
  )
}

export default page