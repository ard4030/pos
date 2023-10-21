
import DashboardSidebar from '@/layout/DashboardSidebar';
import User from '@/models/User';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ProductWrapper } from 'src/context/ProductContext';
import { authOption } from '../api/auth/[...nextauth]/route';

export const metadata = {
    title: "پروه خام | نگار پیشرو",
  };

const DashboardLayout = async ({children}) => {
    const session = await getServerSession(authOption);
    if (!session) redirect("/singin");
    await connectDB();
    const user = await User.findOne({ mobile: session.user.email },{password:0,otp:0});

    if(!user) return <h3>مشکلی پیش آمده !</h3>
  return (
    <DashboardSidebar user={JSON.parse(JSON.stringify(user))}>
      <ProductWrapper>
        {children}
      </ProductWrapper>
    </DashboardSidebar>
  )
}

export default DashboardLayout