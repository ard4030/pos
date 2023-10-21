'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./btnselect.module.css"

const BtnSelect = ({id}) => {
    const {data} = useSession();
    const router = useRouter();
    
    const handleButt =  async() => {
        if(data){
            const res = await fetch('/api/order/setdevice',{
              method:"POST",
              body: JSON.stringify({ id , mobile:data.user.email }),
              headers: { "Content-Type": "application/json" },
            })
            const data1 = await res.json();
            if(res.status === 200){
              router.push('/step/step2')
            }else{
              alert(data1.error)
            }
            
        }else{
            router.push('/singin')
        }

    }

  return (
    <button 
    className={styles.btSel}
    onClick={handleButt}>انتخاب</button>
  )
}

export default BtnSelect