import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import styles from "./loader.module.css"


const Loader = () => {
  return (
    <div className={styles.contLoad}>
        <TailSpin
            height="80"
            width="80"
            color="#FF735C"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            
            />
    </div>
  )
}

export default Loader