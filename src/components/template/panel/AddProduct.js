'use client'
import Loader from "@/module/Loader"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { ProductContext } from "src/context/ProductContext"
import styles from "./addproduct.module.css"
import UploadImages from "./UploadImages"

const AddProduct = ({mobile,params}) => {
    const {details,setDetails,addSpes,changeName,changeValue,deleteSpec,setDef} = useContext(ProductContext);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const Save = async () => {
        if(details.name.length < 3){
            toast.error("نام دستگاه حداقل 3 کاراکتر");
            return
        }
        
        if(details.images.length < 1){
            toast.error("لطفا یک عکس برای دستگاه انتخاب کنید");
            return
        }


        if(!details.price){
            toast.error('مبلغ دستگاه وارد نشده');
            return
        }


        setLoading(true)
        const updatedObject = { ...details, mobile: mobile};
        // console.log(updatedObject)
        const res = await fetch('/api/products/addproduct',{            
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updatedObject)
        })

        const data = await res.json();
        if(res.status === 200){
            toast.success(data.msg);
            if(!params.id) router.replace('/dashboard/products')
        }else{
            toast.error(data.error)
        }
        setLoading(false)
    }

    useEffect(() => {
        console.log(params)
        if(params.id) {
            getProductById(params.id)
        }else{
            setDef()
            setLoading(false)
        }
    }, [])

    const getProductById = async (id) => {
        setLoading(true)
        const res = await fetch('/api/products/getbyid',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({mobile,id})
        })

        const data = await res.json();

        if(res.status === 200){
            setDetails(data.data)
        }else{
            toast.error(data.error)
        }
        setLoading(false)
    }

  return (
    <div className={styles.contingAdd}>
        <Toaster />
        

        {
            loading ?
            <Loader />
            :
            <>
                <header>
                    {
                    params.id ?
                    <>
                        <h6>ویرایش محصول</h6>
                        <button onClick={Save}>ویرایش</button>
                    </>
                    :
                    <>
                        <h6>افزودن محصول</h6>
                        <button onClick={Save}>افزودن</button></>
                    }
                    
                </header>

                <div className={styles.content}>
                    <div className={styles.desc}>
                        <div className={styles.itemDes}>
                            <label>نام دستگاه</label>
                            <input 
                            value={details.name}
                            onChange={(e) => setDetails({...details,name:e.target.value})}
                            />
                        </div>

                        <div className={styles.itemDes}>
                            <label>برند</label>
                            <input 
                            value={details.brand}
                            onChange={(e) => setDetails({...details,brand:e.target.value})}/>
                        </div>

                        <div className={styles.itemDes}>
                            <label>قیمت</label>
                            <input 
                            value={details.price}
                            onChange={(e) => setDetails({...details,price:e.target.value})} type={"number"} />
                        </div>
                        
                        <div className={styles.itemDes}>
                            <label>وضعیت</label>
                            <select 
                            value={details.status}
                            onChange={(e) => setDetails({...details,status:e.target.value})}>
                                <option value={"new"}>نو</option>
                                <option value={"old"}>کارکرده</option>
                            </select>
                        </div>

                    </div>

                    <div className={styles.imgs}>
                        <UploadImages mobile={mobile}/>
                    </div>

                    <div className={styles.teck}>

                        {
                            details.specifications.map((item,index) => 
                            <div key={index}>
                                <input 
                                onChange={(e) => changeName(e,index)}
                                value={item.name}
                                placeholder="نام ویژگی"
                                />
                                <input
                                placeholder="مقدار"
                                value={item.value}
                                onChange={(e) => changeValue(e,index)}
                                />
                                <button onClick={() => deleteSpec(index)} className={styles.delButt}>حذف</button>
                            </div>
                            )
                        }
                        
                        <button onClick={addSpes} className={styles.addButt}>افزودن</button>
                    </div>
                </div>
            </>

        }

    </div>
  )
}

export default AddProduct