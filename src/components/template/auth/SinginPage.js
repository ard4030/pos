'use client'
import React , { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import styles from "./singin.module.css"
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const SinginPage = () => {
  const [data, setData] = useState({
    loginMethod:"usepass",
    mobile:"",
    password:"",
    code:null,
    isSend:false
  });
  const [loading,setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e) => {
    setLoading(true);
    const res = await signIn("credentials", {
      mobile:data.mobile,
      password:data.password,
      loginMethod:data.loginMethod,
      code:data.code,
      redirect:false,
    });

    setLoading(false)
    if(res.error){
      toast.error(res.error)
    }else{
      router.push('/step/step1')
      toast.success("وارد شدید")
    }
  }

  const sendSms = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/smslogin', {
      method:"POST",
      body:JSON.stringify({mobile:data.mobile}),
      headers: { "Content-Type": "application/json" },
    })
    const data1 = await res.json();
    setLoading(false);
    if(res.status === 200){
      toast.success(data1.message)
      setData({...data,isSend:true})
    }else{
      toast.error(data1.error)
    }
  }


  return (
    <div className={styles.contSing}>
      <div className={styles.asli}>
        <div className={styles.numberDiv}>
          {
            data.loginMethod === "usepass" ?
              <>
               <p>ورود با نام کاربری</p>
               <input
               value={data.mobile}
               onChange={(e) => setData({...data,mobile:e.target.value})}
               placeholder={"موبایل"}
               />
               <input
               value={data.password}
               onChange={(e) => setData({...data,password:e.target.value})}
               placeholder={"رمز عبور"}
               type={"password"}
               />

               <button onClick={handleSubmit} className='glbt'>ورود</button>
               <button  
               onClick={() => setData({...data,loginMethod:"otp"})}
               className='glbt glbt-pre mt20'>ورود با کد پیامکی</button>
              </>
            :

              <>

               <p>ورود با کد پیامکی</p>
                {
                  data.isSend ?
                    <>
                      <p>لطفا کد وارد شده را ارسال کنید</p>
                      <input
                      value={data.code}
                      onChange={(e) => setData({...data,code:e.target.value})}
                      />
                    </>
                  :
                  <input
                  value={data.mobile}
                  onChange={(e) => setData({...data,mobile:e.target.value})}
                  placeholder={"موبایل"}
                  />
                }
               
                {
                  data.isSend?
                  <button onClick={handleSubmit}  className='glbt'>ورود</button>
                  :
                  <button onClick={sendSms} className='glbt'>ارسال کد</button> 
                }
               <button  
               onClick={() => setData({...data,loginMethod:"usepass"})}
               className='glbt glbt-pre mt20'>ورود با رمز عبور</button>
              </>

          }
        </div>
      </div>
      <Toaster />
  </div>
  )
}

export default SinginPage