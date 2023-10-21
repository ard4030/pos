'use client'
import { BASEURL } from "@/constants/consts";
import Loader from "@/module/Loader";
import { Button, Modal } from "antd";
import Image from "next/image";
import { useEffect, useState  } from "react"
import { toast } from "react-hot-toast";
import styles from "./details.module.css"
import { AiOutlineEye } from "react-icons/ai"
import { BsDownload , BsPrinter } from "react-icons/bs"
import useDownloader from 'react-use-downloader';
import { GrClose } from "react-icons/gr";
import { checkStatus} from "@/utils/functions"


const Details = ({mobile,id}) => {
    const { download} = useDownloader();
    const [open, setOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState({
        first_name:"",
        last_name:"",
        status:null,
        melli:"",
        mobile:"",
        images:[],
        productId:"",
        message:"",
        lastStatus:"",
        _id:""
    });
    const [loading, setloading] = useState(false);
    const [modal,setModal] = useState(null);
    

    const getData = async () => {
        setloading(true)
        const res = await fetch('/api/order/getorderbyid',{
            method:"POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({mobile,id})
        });
        const data = await res.json();
        setloading(false)
        if(res.status === 200){
            setOrderDetail(data.data[0])
        }else{
            toast.error(data.error)
        }
    }

    useEffect(() => {
      getData();
    }, [])

    const updateOrder = async () => {
        setloading(true)
        const res = await fetch('/api/order/updateOrder',{
            method:"POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({mobile,status:orderDetail.status,message:orderDetail.message,id:orderDetail._id}) 
        })
        const data = await res.json();
        setloading(false)
        if(res.status === 200){
            toast.success(data.msg)
           getData();
        }else{
            toast.error(data.error)
        }
        setOpen(false)
    }

    const handlePrint = () => {
        // const contentToPrint = document.getElementById('printContent');
        // if (contentToPrint) {
        //   const printWindow = window.open('', '', 'width=600,height=600');
        //   printWindow.document.open();
        //   printWindow.document.write(`<img style="width:200px;height:200px;" src="${BASEURL}${orderDetail.images[0].path}" />`);
        //   printWindow.document.close();
        //   printWindow.print();
        //   printWindow.close();
        // }

        const printWindow = window.open('', '', 'width=600,height=600');
          printWindow.document.open();
          printWindow.document.write(`<img style="width:200px;height:200px;" src="${BASEURL}${orderDetail.images[0].path}" />`);
          printWindow.document.close();
          printWindow.print();
          printWindow.close();
    }


  return (
    <div style={{marginTop:"20px"}}>
        {
            loading ?
            <Loader />
            :
            <div className={styles.contDetail}>
                <div className={styles.headering}>
                    <h5>
                        <span>مشخصات سفارش</span>
                        &nbsp;
                        <span>#55457</span>
                        &nbsp;
                        <span className={styles.stst}>{checkStatus(orderDetail.status)}</span>
                    </h5>
                    <button 
                    onClick={() => setOpen(true)}
                    className={styles.btnEd}
                    >تغییر وضعیت</button>
                </div>    

                <div className={styles.secDetail}>
                    <div>
                        <label> نام : </label>
                        <input 
                        value={orderDetail.first_name}
                        disabled
                        />
                    </div>

                    <div>
                        <label>نام خانوادگی :‌</label>
                        <input
                        value={orderDetail.last_name}
                        disabled
                        />
                    </div>

                    <div>
                        <label>کد ملی : </label>
                        <input
                        value={orderDetail.melli}
                        disabled
                        />
                    </div>
                </div>


                <div className={styles.secMadarek}>
                    {
                        orderDetail && orderDetail.images.map((item,index) => 
                        <div 
                        key={index}
                        className={styles.contImag}>
                            <Image src={`${BASEURL}${item.path}`} fill alt={item.slug} />
                            <div className={styles.actionMad}>
                                <span
                                onClick={() => setModal(`${BASEURL}${item.path}`)}
                                ><AiOutlineEye /></span>
                                <span
                                onClick={() => download(`${BASEURL}${item.path}`, item.path)}
                                ><BsDownload /></span>

                                <span onClick={handlePrint}><BsPrinter /></span>
                            </div>
                        </div>
                        )
                    }
                    
                </div>    
            </div>
        }

        {
            modal && 
            <div
            
            className={styles.modal}>
                <Image 
                src={modal} alt="" fill />
                <span 
                onClick={()=>setModal(null)}
                className={styles.clsMod}><GrClose /></span>
            </div>
        }

    <>

      <Modal
        title="تغییر وضعیت"
        centered
        cancelText={"انصراف"}
        okText={"تایید"}
        open={open}
        onOk={() => updateOrder()}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <div
        className={styles.modaling} >
            <div>
                <label>توضیحات</label>
                <textarea 
                value={orderDetail.message}
                onChange={(e) => setOrderDetail({...orderDetail,message:e.target.value})}
                ></textarea>
            </div>
            <div>
                <label>وضعیت</label>
                <select 
                value={orderDetail.status}
                onChange={(e) => setOrderDetail({...orderDetail,status:e.target.value})}
                >
                    <option value={"success"}>تایید شده</option>
                    <option value={"deviceOk"}>دستگاه انتخاب شده</option>
                    <option value={"pending"}>درحال بررسی</option>
                    <option value={"detailComplate"}>تکمیل مشخصات</option>
                    <option value={"uploading"}>مدارک آپلود شد</option>
                    <option value={"waitPayment"}>تایید شده در انتظار پرداخت</option>
                    <option value={"needEdit"}>نیاز به ویرایش</option>
                    <option value={"denield"}>رد شده</option>

                </select>
            </div>
        </div>
      </Modal>
    </>
        
    </div>
  )
}

export default Details