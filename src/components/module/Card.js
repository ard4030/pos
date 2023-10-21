import Image from "next/image"
import Link from "next/link"
import BtnSelect from "./BtnSelect"
import styles from "./card.module.css"
import { BsStarFill , BsEye } from "react-icons/bs"

const Card = ({data,edit=false,select=true,width=false}) => {
  return (
        <div 
        style={{width:width && width}}
        key={data._id} 
        className={styles.item}>
            <div className={styles.cardStar}>
              <span>4.5</span>
              <span style={{color:"gold",fontSize:"16px"}}><BsStarFill /></span>
            </div>
            <div className={styles.contImage}>
                <Image fill alt={data.name} src={data.images[0]} />
            </div>
            <h5>{data.name}</h5>

            <div className={styles.footSp}>
                    <span>{data.price.toLocaleString()}</span>
                    <span>تومان</span>
            </div>

            <div className={styles.itemfooter}>
                    {select && <BtnSelect id={data._id} />}
                    <button 
                    className={styles.btEye}><BsEye /></button>
                    {edit && <Link href={'/products'}>ویرایش</Link>}
            </div>
        </div>
  )
}

export default Card