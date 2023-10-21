import { authOption } from '@/app/api/auth/[...nextauth]/route';
import SinginPage from '@/template/auth/SinginPage'
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOption);
  if (session) redirect("/");
  
  return (
    <SinginPage />
  )
}

export default page