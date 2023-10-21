import { authOption } from '@/app/api/auth/[...nextauth]/route';
import Details from '@/template/admin/Details';
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async (props) => {
    const session = await getServerSession(authOption);
  return (
    <Details
    mobile={session.user.email}
    id={props.params.id}
    />
  )
}

export default page