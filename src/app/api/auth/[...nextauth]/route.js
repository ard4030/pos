import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../../utils/functions"


export const authOption = {
    session : { strategy: "jwt"},
    providers : [
        CredentialsProvider({
            async authorize(credentials) {
                const {mobile,password,code,loginMethod} = credentials;

                try {
                    await connectDB();
                } catch (error) {
                    throw new Error("مشکلی در سرور به وجود آمد")
                }

                const user = await User.findOne({mobile});
                
                if(!user) throw new Error("نام کاربری یا رمز عبور اشتباه است");
                if(loginMethod === "usepass"){
                    const isValid = await verifyPassword(password,user.password);
                    if(!isValid) throw new Error("نام کاربری یا رمز عبور اشتباه است");
                    return {
                        email:user.mobile,
                    };
                }else{
                    let now = new Date().getTime();
                    if(user.otp.code != code) throw new Error('کد وارد شده صحیح نیست')
                    if(user.otp.expiresIn < now) throw new Error('کد شما منقضی شده');
                    return {
                        email:user.mobile
                    }
                }
            },
        }),
    ],
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };