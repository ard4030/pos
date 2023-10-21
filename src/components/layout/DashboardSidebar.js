'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./dashside.module.css"
import { AiOutlineUser } from "react-icons/ai"
import { TbDashboard } from "react-icons/tb"
import { BsBox2 , BsBuildingUp } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { RiDeviceLine } from "react-icons/ri"


const DashboardSidebar = ({children,user}) => {
  const pathName = usePathname();
  return (
    <div className={styles.contentDashBoard}>
        <div className={styles.sidebar}>
          <div className={styles.profImage}>
            <span><AiOutlineUser /></span>
          </div>
          <p>{user.mobile}</p>
          {user.Roles.includes('ADMIN') && <span className={styles.titadmin}>ادمین</span>}
          <ul>

            <li 
            className={pathName === '/dashboard' && styles.act}>
              <TbDashboard />
              <Link href={'/dashboard'}>داشبورد</Link>
            </li>

            <li
            className={pathName === '/dashboard/profile' && styles.act}>
              <AiOutlineUser />
              <Link href={'/dashboard/profile'}>پروفایل کاربری</Link>
            </li>

            <li
            className={pathName === '/dashboard/orders' && styles.act}>
              <BsBox2 />
              <Link href={'/dashboard/orders'}>سفارشات</Link>
            </li>

            {
              user.Roles.includes('ADMIN') && 
              <>
                <li
                className={pathName === '/dashboard/users' && styles.act}>
                  <FaUsers />
                <Link href={'/dashboard/users'}>کاربران سایت</Link>
                </li>

                <li
                className={pathName === '/dashboard/requests' && styles.act}>
                  <BsBuildingUp />
                  <Link href={'/dashboard/requests'}>لیست درخواست ها</Link>
                </li>

                <li
                className={pathName === '/dashboard/products' && styles.act}>
                  <RiDeviceLine />
                  <Link href={'/dashboard/products'}>دستگاه ها</Link>
                </li>
              </>
            }
          </ul>
        </div>
        <div className={styles.content}>{children}</div>
    </div>
  )
}

export default DashboardSidebar