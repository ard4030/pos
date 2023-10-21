'use client'
import Card from "@/module/Card"
import styles from "./step1.module.css"
import {useState,useEffect} from "react"
import { useRouter } from "next/navigation"
import Loader from "@/module/Loader"

const Step1 = ({mobile}) => {
  const [device, setDevice] = useState(null);
  const [loading,setLoading] = useState(false)
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:3000/api/order/getdevice',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({mobile}),
      cache: 'no-store'
    });
    const data = await res.json();
    setLoading(false)
    if(res.status === 200){
      setDevice(data.data[0])
    }else{
      alert('جهت ادامه مراحل ابتدا دستگاه مورد نظر خود را انتخاب کنید')
      router.push('/products')
    }
    
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      {
        loading ?
        <Loader />
        :
       <> {device && <Card data={device} edit={true} select={false}/> }</>
      }
    </div>
  )
}

export default Step1