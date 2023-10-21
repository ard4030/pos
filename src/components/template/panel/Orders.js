'use client'
import TableView from "@/module/TableView";
import { Space } from "antd";
import { useState , useEffect } from "react";
import styles from "./orders.module.css";
import {
    EyeOutlined,
    EditOutlined ,
    DeleteOutlined
  } from '@ant-design/icons';
import Image from "next/image";
import { BASEURL } from "@/constants/consts";
import { useRouter } from "next/navigation";
import { checkStatus } from "@/utils/functions" 


const Orders = ({mobile}) => {
  const router = useRouter();
    
    const columns = [
        {
          title: 'عکس',
          dataIndex: 'device',
          key: 'device',
          render: (dev) => <Image width={60} height={60} src={`${dev[0].images[0]}`} alt={dev[0].name} />,
        },
        {
          title: 'دستگاه',
          dataIndex: 'device',
          key: 'device',
          render: (dev) => <a>{dev[0].name}</a>
        },
        {
            title: 'وضعیت',
            dataIndex: 'status',
            key: 'status',
            render: (stat) =>  (
                <div>
                    <span className={styles.successStat}>{checkStatus(stat)}</span>
              
                </div>
            )
          },

        {
          title: 'عملیات',
          key: '_id',
          dataIndex: '_id',
          render: (_, record) => (
            <Space size="middle">
              {/* <span style={{cursor:'pointer'}} onClick={() => SettingShow({id:record._id,name:"addproduct",comp:<AddProduct />})}><EditOutlined title='ویرایش' /></span> */}
              {/* <span style={{cursor:'pointer'}} onClick={() => deleteProduct(record._id)}><DeleteOutlined title='حذف' /></span> */}
              <span onClick={() => router.push('/step/step1')}><EyeOutlined title='مشاهده'/></span>
            </Space>
          ),
        },
    ];

    
  return (
    <div>
        <h5>سفارشات</h5>
        <TableView 
        columns={columns}
        api={'/api/order/getOrdersUser'}
        method={"POST"}
        items={{mobile:mobile}}
        styles={{marginTop:"20px"}}
        />
        
    </div>
  )
}

export default Orders