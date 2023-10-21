
'use client'
import TableView from "@/module/TableView";
import { Space } from "antd";
import Image from "next/image";
import styles from "./request.module.css";
import { EyeOutlined , EditOutlined , DeleteOutlined} from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { checkStatus } from "@/utils/functions" 

const Requests = ({mobile}) => {
    const router = useRouter();

    const columns = [
        {
          title: 'عکس',
          dataIndex: 'device',
          key: 'device',
          render: (dev) => <Image width={60} height={60} src={`${dev[0]?.images[0]}`} alt={dev[0].name} />,
        },
        {
            title: 'نام',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (dev) => <span>{dev}</span>,
        },
        {
            title: 'نام خانوادگی',
            dataIndex: 'last_name',
            key: 'last_name',
            render: (dev) => <span>{dev}</span>,
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
              <span style={{cursor:'pointer'}} onClick={() => router.push(`/dashboard/details/${record._id}`)}><EditOutlined title='ویرایش' /></span>
              {/* <span style={{cursor:'pointer'}} onClick={() => deleteProduct(record._id)}><DeleteOutlined title='حذف' /></span> */}
              <a onClick={() => {alert(JSON.stringify(record))}}><EyeOutlined title='مشاهده'/></a>
            </Space>
          ),
        },
    ];
    
  return (
    <div>
        <h5>سفارشات</h5>
        <TableView 
        columns={columns}
        api={'/api/admin/getallrequests'}
        method={"POST"}
        items={{mobile:mobile}}
        styles={{marginTop:"20px"}}
        />
    
    </div>
  )
}

export default Requests