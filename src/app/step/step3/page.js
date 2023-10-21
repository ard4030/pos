import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Step3 from "@/template/step/Step3"
import { getServerSession } from "next-auth";


const page = async () => {
  const session = await getServerSession(authOption);
  return (
    <Step3 mobile={session.user.email} />
  )
}

export default page