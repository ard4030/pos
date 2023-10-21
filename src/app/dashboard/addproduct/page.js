import { authOption } from '@/app/api/auth/[...nextauth]/route';
import AddProduct from '@/template/panel/AddProduct'
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async (props) => {
    const session = await getServerSession(authOption);
  return (
    <AddProduct mobile={session.user.email} params={props.searchParams} />
  )
}

export default page