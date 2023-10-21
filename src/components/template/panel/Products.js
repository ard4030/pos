'use client'
import TableView from "@/module/TableView";
import { Popconfirm, Space } from "antd";
import { useState , useEffect } from "react";
import styles from "./product.module.css";
import {
    EyeOutlined,
    EditOutlined ,
    DeleteOutlined
  } from '@ant-design/icons';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Loader from "@/module/Loader";


const Products = ({mobile}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const deleteProduct = async (id,images) => {
    setLoading(true)
    const res = await fetch('/api/products/deleteproduct',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id,mobile,images})
    })
    const data = await res.json();

    if(res.status === 200){
      toast.success(data.data)
    }else{
      toast.error(data.data)
    }
    setLoading(false)
  }

  const confirm = (e,images) => {
    deleteProduct(e,images);
  };

    
    const columns = [
        {
          title: 'عکس',
          dataIndex: 'images',
          key: 'images',
          render: (dev) => <Image width={60} height={60} src={`${dev[0]}`} alt={''} />,
        },
        {
          title: 'نام',
          dataIndex: 'name',
          key: 'name',
          render: (dev) => <a>{dev}</a>
        },
        {
            title: 'تعداد موجود',
            dataIndex: 'count',
            key: 'count',
            render: (dev) => <a>{dev}</a>
        },
        {
            title: 'قیمت',
            dataIndex: 'price',
            key: 'price',
            render: (dev) => <span>  {parseInt(dev).toLocaleString()} تومان</span>
        },
        {
            title: 'وضعیت',
            dataIndex: 'status',
            key: 'status',
            render: (stat) =>  (
                <>
                {stat === "new" && "نو"}
                {stat === "old" && "کارکرده"}
                </>
            )
          },

        {
          title: 'عملیات',
          key: '_id',
          dataIndex: '_id',
          render: (_, record) => (
            <Space size="middle">
              <span style={{cursor:'pointer'}} onClick={() => router.push(`/dashboard/addproduct?id=${record._id}`)}><EditOutlined title='ویرایش' /></span>
                <Popconfirm
                title="حذف محصول"
                description="این عملیات قابل بازگشت نیست . مطمءنید؟"
                onConfirm={() => confirm(record._id,record.images)}
                onCancel={(e) => console.log(e)}
                okText="بله"
                cancelText="خیر"
              >
                <DeleteOutlined title='حذف' />
              </Popconfirm>
              <span onClick={() => router.push('/step/step1')}><EyeOutlined title='مشاهده'/></span>
            </Space>
          ),
        },
    ];

    
  return (
    <div className={styles.prCont}>
        <Toaster />

        {
          loading ?
          <Loader />
          :

          <>  
            <header>
              <h5>دستگاه ها</h5>
              <button onClick={() => router.push('/dashboard/addproduct')}>افزودن</button>
            </header>
    
            <TableView 
            columns={columns}
            api={'/api/products/getall'}
            method={"POST"}
            items={{mobile:mobile}}
            styles={{marginTop:"20px"}}
            />
          </>
        }
        
    </div>
  )
}

export default Products