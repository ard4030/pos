import { authOption } from '@/app/api/auth/[...nextauth]/route';
import Step4 from '@/template/step/Step4'
import { getServerSession } from 'next-auth';

const page = async () => {
    const session = await getServerSession(authOption);
  return (
    <Step4 mobile={session.user.email} />
  )
}

export default page