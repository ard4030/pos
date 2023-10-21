import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Requests from "@/template/admin/Requests"
import { getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession(authOption);
  return (
    <Requests mobile={session.user.email} />
  )
}

export default page