import { authOption } from '@/app/api/auth/[...nextauth]/route';
import Step1 from '@/template/step/Step1';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOption);
  // if(!res.status === 200) return <h3>مشکلی پیش آمده!</h3>
  
  return (
    <Step1 mobile={session.user.email} />
  )
}

export default page