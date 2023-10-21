'use client'
import React,{ useState } from 'react'
import styles from "./singup.module.css"
import { Toaster, toast } from "react-hot-toast";
import Loader from '@/module/Loader';
import { useRouter } from 'next/navigation';

const SingupPage = () => {
  const [data, setData] = useState({
    mobile:0,
    code:null,
    password:"",
    rePassword:""
  });
  const [loading, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobileRegex = /09[0-9]{2}[0-9]{3}[0-9]{4}$/;
    if(!mobileRegex.test(data.mobile)){
      toast.error("شماره موبایل صحیح نیست");
      return;
    }
    setLoading(true)
    const res = await fetch("/api/auth/sendSms", {
      method: "POST",
      body: JSON.stringify({ mobile:data.mobile }),
      headers: { "Content-Type": "application/json" },
    });
    const data1 = await res.json();
    setLoading(false);
    if (res.status === 200) {
      setIsSend(true)
      toast.success(data1.message)
    } else {
      toast.error(data1.error)
    }
  }

  const handleSingUp = async (e) => {
    e.preventDefault();

    // Check Password
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(!passRegex.test(data.password)){
      toast.error("رمز عبور باید از حروف کوچک و بزرگ انگلیسی و حداقل 8 کاراکتر باشد");
      return
    }

    // Check Repaet password
    if(data.password !== data.rePassword){
      toast.error("رمز عبور با تکرار آن برابر نیست")
      return
    }



    setLoading(true)
    const res = await fetch("/api/auth/singup", {
      method: "POST",
      body: JSON.stringify({ mobile:data.mobile,code:data.code,password:data.password }),
      headers: { "Content-Type": "application/json" },
    });
    const data1 = await res.json();
    setLoading(false);
    if (res.status === 200) {
      toast.success(data1.message)
      setIsSend(false)
      router.push('/singin')
    } else {
      toast.error(data1.error)
    }
  }


  return (
    <div className={styles.contSing}>

      <div className={styles.asli}>
        {
          loading ?
          <Loader />
          :

          <>
           {
        isSend ? 
            <form
            onSubmit={handleSingUp}
            className={styles.numberDiv}
            >
              <h2>ثبت نام</h2>
              <p>لطفا اطلاعات زیر را تکمیل کنید</p>
              <input
                placeholder='کد ارسال شده بر روی گوشی'
                value={data.code}
                onChange={(e) => setData({...data,code:e.target.value})}
              />
              <input
                placeholder='رمز عبور'
                value={data.password}
                type={"password"}
                onChange={(e) => setData({...data,password:e.target.value})}
              />
              <input 
                placeholder='تکرار رمز عبور'
                type={"password"}
                value={data.rePassword}
                onChange={(e) => setData({...data,rePassword:e.target.value})}
              />

              <button 
                type='submit'
                className='glbt'>تایید</button>
              
            </form>
            :

            <form 
            onSubmit={handleSubmit}
            className={styles.numberDiv}>
                <h2>ثبت نام</h2>
                <p>لطفا شماره همراه خود را وارد کنید</p>
                <input 
                value={data.mobile}
                onChange={(e) => setData({...data,mobile:e.target.value})}
                />
                <button 
                type='submit'
                className='glbt'>ارسال کد</button>
            </form>
          }

          </>

        }
      </div>

        <Toaster />
    </div>
  )
}

export default SingupPage