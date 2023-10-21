'use client'
import Link from 'next/link'
import React from 'react'
import styles from "./header.module.css"
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/navigation';
import { AiOutlineUser } from "react-icons/ai"
import { HiLogin } from "react-icons/hi"
import { BsBell } from "react-icons/bs"

const Header = () => {
  const { data } = useSession();
  const router = useRouter();

  return (

    <div className={styles.hed}>
      <Navbar dir='rtl' expand="lg" className="bg-body-tertiary">

          <Navbar.Brand ><span 
          className={styles.logo}
          onClick={() => router.push('/')}></span></Navbar.Brand>

          




          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">

            <Nav>
              <Nav.Item><span className={styles.navingNew}>خانه</span></Nav.Item>
              <Nav.Item><span className={styles.navingNew}>درخواست ها</span></Nav.Item>
              <Nav.Item><span className={styles.navingNew}>پشتیبانی</span></Nav.Item>
              <Nav.Item><span className={styles.navingNew}>مجوز ها</span></Nav.Item>
              <Nav.Item><span className={styles.navingNew}>تماس با ما</span></Nav.Item>
            </Nav>

            <Nav className="me-auto">
              {
                data ? 
                <div className={styles.shoing}>
                  <Link
                  className={styles.vbg} 
                  href={""}>
                    <BsBell />
                  </Link>

                  <Link 
                  className={styles.vbg}
                  title={"پنل کاربری"}
                  href={"/dashboard/profile"}>
                    <AiOutlineUser />
                  </Link>

                  <span
                  className={`${styles.vbg} ${styles.ext}`}
                  title={"خروج"}
                  onClick={() => signOut()}
                  >
                    <HiLogin />
                  </span>

                </div>
                


                :
                <>
                  <Nav.Item onClick={() => router.push('/singin')}>ورود</Nav.Item>
                  <div className={styles.elsec}>&nbsp;
                  |
                  &nbsp;</div>
                  <Nav.Item onClick={() => router.push('/singup')}>ثبت نام</Nav.Item>
                </>

              }
              
              
            </Nav>
          </Navbar.Collapse>
       
      </Navbar>
    </div>
    
  )
}

export default Header