'use client'
import axios from "axios";
import Image from "next/image";
import { useState , useEffect } from "react"
import styles from "./uploadcomp.module.css"
import { Progress, Space } from 'antd';
import { BASEURL } from "@/constants/consts";
import { AiFillDelete} from "react-icons/ai"

const UploadComp = ({mobile,slug,title}) => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setloading] = useState(null);
    const [prog, setProg] = useState(0);
    const [status, setStatus] = useState(null);


    const handleUpload = (e) => {
        setFile(e.target.files?.[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const uploadFile = async () => {
        setloading(true)
        const formData = new FormData();
        formData.set('file',file);
        formData.set('mobile',mobile);
        formData.set('slug',slug)

        await axios.post("/api/filing/upload", formData, {
            onUploadProgress: (progressEvent) => {
              // console.log('progressEvent', progressEvent)
              if (progressEvent.bytes) {
                setProg(Math.round((progressEvent.loaded / progressEvent.total)*100))
              }
            },
          }).then(response => {
            if(response.status === 200){
                setImage(`${BASEURL}${response.data.data}`)
                setFile(null);
                setStatus("pending")
            }
            // console.log(response.data)
            // console.log(response.status)

          }).catch(err => {
            alert(err.message)
          });
          setloading(false)
    }

    const deleteFile = async () => {
      setloading(true)
      const detail = {
        path:image,
        mobile,
        slug
      }
      await axios.post(`/api/filing/deletefileuser`,detail).then(res => {
        if(res.status === 200){
          setFile(null)
          setImage(null)
          setStatus(null)
        }else{
          alert(res.data.error)
        }
      }).catch(err => {
        alert(err.message)
      })
      setloading(false)
    }

    const getData = async () => {
      setloading(true);
      const res = await fetch('/api/order/getitemdetail',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({mobile,slug})
      });
      const data = await res.json();
      setloading(false)
      if(res.status === 200){
        if(data.data){
          setStatus(data.data.status);
          if(data.data.path !== ""){
            setImage(`${BASEURL}${data.data.path}`)
          }
        } 
      }else{
        alert(data.error)
      }
    }

    useEffect(() => {
      getData()
    }, [])
    

  return (
    <div className={`${styles.itemUpload} ${image && styles.mic}`}>
        {
            loading?
            <Space wrap>
                <Progress type="circle" percent={prog} />
            </Space>
            :

            <>
        {
            (image) ?
                <>
                    {file && <button onClick={uploadFile}>آپلود</button>}
                    <button className={styles.deling} title="حذف" onClick={deleteFile}><AiFillDelete /></button>
                    {image && <Image src={image} fill alt="sdfs" />}
                    {status && 
                    <span className={`${styles.status} ${(status === "pending") && styles.org} ${(status === "ok") && styles.gre} ${(status === "failed") && styles.red}`}>
                      {(status === "pending") && "درحال بررسی"}
                      {(status === "ok") && "تایید شده"}
                      {(status === "failed") && "رد شده شده"}
                    </span>}
                </>
            :
            <div className={styles.elInp}>
              <input 
              onChange={handleUpload}
              type={'file'} />
              <div><button>آپلود {title}</button></div>
            </div>         
            

        }
        
            </>

        }
        
        
    </div>
  )
}

export default UploadComp