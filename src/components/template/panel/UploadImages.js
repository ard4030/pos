'use client'
import { BASEURL } from '@/constants/consts';
import { useContext, useEffect, useState } from 'react';
import styles from './uploadimages.module.css';
import { Progress, Space } from 'antd';
import axios from 'axios';
import { ProductContext } from 'src/context/ProductContext';
import Image from 'next/image';


const UploadImages = ({mobile}) => {

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setloading] = useState(false);
    const [prog, setProg] = useState(0);
    const {details,setDetails} = useContext(ProductContext)


    const handleUpload = (e) => {
        setFile(e.target.files?.[0]);
        // setImage(URL.createObjectURL(e.target.files[0]));
    }

    const uploadFile = async () => {
        setloading(true)
        const formData = new FormData();
        formData.set('file',file);
        formData.set('mobile',mobile);

        await axios.post("/api/filing/uploadProductImages", formData, {
            onUploadProgress: (progressEvent) => {
              // console.log('progressEvent', progressEvent)
              if (progressEvent.bytes) {
                setProg(Math.round((progressEvent.loaded / progressEvent.total)*100))
              }
            },
          }).then(response => {
            if(response.status === 200){
                // setImage(`${BASEURL}${response.data.data}`)
                console.log(response.data)
                setDetails({...details,images:[...details.images,response.data.data.Saving.path]})
                setFile(null);
            }

          }).catch(err => {
            alert(err.message)
          });
          setloading(false)
    }

    const deleteFile = async (imagePath) => {
        setloading(true)
        const detail = {
          path:imagePath,
          mobile,
        }
        await axios.post(`/api/filing/deletefileproduct`,detail).then(res => {
            console.log(res.data)
          if(res.status === 200){
            setFile(null)
            // let x = details.images.filter(item => item !== imagePath);
            setDetails({...details,images:details.images.filter(item => item !== imagePath)})
          }else{
            alert(res.data.error)
          }
        }).catch(err => {
          alert(err.message)
        })
        setloading(false)
      }

    useEffect(() => {
        if(file) uploadFile()
    }, [file])
    


  return (
    <div className={styles.contUpload}>

        {
            !image && !file && !loading &&
            <div className={styles.addImage}>
                <input 
                onChange={handleUpload}
                type={"file"} />
            </div>
        }
        {
          loading &&  
            <div className={`${styles.addImage} ${styles.lodi}`}>
                <Space wrap>
                    <Progress size={80} type="circle" percent={prog} />
                </Space>
            </div> 
        }

        <div className={styles.contImaging}>
             {
                details.images.map((item,index) => 
                <div key={index}>
                    <Image  fill src={`${BASEURL}${item}`} />
                    <span onClick={() => deleteFile(item)}></span>
                </div>
                )
             }
        </div>

    </div>
  )
}

export default UploadImages