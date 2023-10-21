import React from 'react'
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>تمام حقوق مادی و معنوی وبسایت متعلق به نگار پیشرو الکترونیک آترین هست</p>
      <div className={styles.icons}>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Footer