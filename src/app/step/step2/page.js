import { authOption } from '@/app/api/auth/[...nextauth]/route';
import Step2 from '@/template/step/Step2'
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOption);
  return (
    <Step2 mobile={session.user.email} />
  )
}

export default page