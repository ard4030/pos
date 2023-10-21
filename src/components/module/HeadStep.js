
'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"
import styles from "./headstep.module.css"
import { MdKeyboardDoubleArrowLeft , MdOutlineDevicesOther , MdPayment } from "react-icons/md"
import { LuClipboardEdit } from "react-icons/lu"
import { HiOutlineDocumentText } from "react-icons/hi"
import { PiReceipt } from "react-icons/pi"

const HeadStep = () => {
  const pathName = usePathname();
  const steps = [
    {
      id:1,
      name:"انتخاب دستگاه",
      slug:"/step/step1",
      tag:<MdOutlineDevicesOther />
    },
    {
      id:2,
      name:"تکمیل مشخصات",
      slug:"/step/step2",
      tag:<LuClipboardEdit />
    },
    {
      id:3,
      name:"آپلود مدارک",
      slug:"/step/step3",
      tag:<HiOutlineDocumentText />
    },
    {
      id:4,
      name:"پرداخت",
      slug:"/step/step4",
      tag:<MdPayment />
    },
    {
      id:5,
      name:"رسید پرداخت و بارکد",
      slug:"/step/step5",
      tag:<PiReceipt />
    }
  ]


  return (
    <div className={styles.contHeadLay}>
      {
        steps.map((item,index) => 
        <>
          <div className={pathName === item.slug ? styles.active : ""}>
            {item.tag}
            <Link 
            href={item.slug}
            key={index}>{item.name}
            </Link>
            
          </div>
          <MdKeyboardDoubleArrowLeft />
        </>
        )
      }
    </div>
  )
}

export default HeadStep