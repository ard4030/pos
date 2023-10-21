import Image from "next/image"
import Link from "next/link"
import styles from "./homepage.module.css" 
import imgHome from "@/public/Images/8741835.png"
import Carouser from "./Carouser"

const HomePage = () => {
  return (
    <div className={styles.home}>
      {/* <Link href={'/products'} className={styles.btShop}>خرید دستگاه</Link> */}
      <div className={styles.leftDiv}>
        <h2>فروش و فعال سازی آنلاین <br />دستگاه کارتخوان</h2>
        <p>خرید و فعال سازی آنلاین کاملا غیر حضوری طی چهار مرحله کمتر از 20 دقیقه میتوانید سفارش خود را ثبت کنید . همکاران ما سریعا دستگاه شما را فعال سازی میکنند و از طریق پست برای شما ارسال میکنند</p>
        <Link href={'/products'}>خرید آنلاین</Link>

        <div className={styles.elementing}>
          <div>
            <span></span>
            <span>09164524864</span>
          </div>

          <div>
            <span></span>
            <span>071545126373</span>
          </div>
        </div>

        <Carouser />

      </div>
      <div>
        <div className={styles.imgHoming}>
          <Image fill alt="home" src={imgHome} />
        </div>
      </div>
    </div>
  )
}

export default HomePage