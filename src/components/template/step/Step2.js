'use client'
import { useRouter } from "next/navigation";
import { useState , useEffect } from "react"
import styles from "./step2.module.css";
import Loader from '@/module/Loader'

const Step2 = ({mobile}) => {
    const [first, setfirst] = useState({
        first_name:"",
        last_name:"",
        melli:""
    });
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const getData = async () => {
        setLoading(true)
        const res = await fetch(`/api/order/getdetails`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({mobile})
        })

        const data = await res.json();
        setLoading(false)
        if(res.status === 200){
            setfirst({
                first_name:data.data.first_name,
                last_name:data.data.last_name,
                melli:data.data.melli
            })
        }else if(res.status === 403){
            alert('ابتدا دستگاه مورد نظر خود را انتخاب نمایید')
            router.push('/products')
        }else{
            alert(data.error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(first.melli.length<10 || first.melli.length>10){
            alert('کد ملی صحیح نیست')
            return
        }
        setLoading(true)
        const res = await fetch(`/api/order/setdetails`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                first_name:first.first_name,
                last_name:first.last_name,
                melli:first.melli,
                mobile:mobile
            })
        })

        const data = await res.json();
        setLoading(false)
        if(res.status === 200){
            setfirst({
                first_name:data.data.first_name,
                last_name:data.data.last_name,
                melli:data.data.melli,
            })
            router.push('/step/step3')
        }else{
            alert(data.error)
        }
    }

    

  return (
    <div className={styles.contStep2}>
        {
            loading?
            <Loader />
            :
            <form onSubmit={handleSubmit}>
                <div className={styles.step2Item}>
                    <label>نام : </label>
                    <input 
                    value={first.first_name}
                    onChange={(e) => setfirst({...first,first_name:e.target.value})}
                    type={'text'} />
                </div>

                <div className={styles.step2Item}>
                    <label>نام خانوادگی : </label>
                    <input 
                    value={first.last_name}
                    onChange={(e) => setfirst({...first,last_name:e.target.value})}
                    type={'text'} />
                </div>

                <div className={styles.step2Item}>
                    <label>کد ملی : </label>
                    <input 
                    value={first.melli}
                    onChange={(e) => setfirst({...first,melli:e.target.value})}
                    type={'text'} />
                </div>

                <button className={styles.btSubFo} type="submit">ذخیره اطلاعات</button>
            </form>
        }

    </div>
  )
}

export default Step2