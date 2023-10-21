import { authOption } from '@/app/api/auth/[...nextauth]/route';
import SingupPage from '@/template/auth/SingupPage'
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOption);
  if (session) redirect("/");
  return (
    <SingupPage />
  )
}

export default page