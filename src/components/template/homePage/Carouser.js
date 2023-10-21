'use client'
import styles from "./carousel.module.css"
import lg1 from "@/public/Images/lg1.webp"
import lg2 from "@/public/Images/lg2.webp"
import lg3 from "@/public/Images/lg3.webp"
import lg5 from "@/public/Images/lg5.webp"
import Image from 'next/image';
import { Carousel } from 'antd';


const Carouser = () => {
    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
      const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    
    return (
        <div className={styles.contcar}>

            <Carousel 
            autoplay
            slidesToShow={3}
            dots={false}
            afterChange={onChange}>
            <div className={styles.contsli}>
                <div className={styles.imaging}><Image fill alt='asd' src={lg1} /></div>
            </div>
            <div className={styles.contsli}>
                <div className={styles.imaging}><Image fill alt='asd' src={lg2} /></div>
            </div>
            <div className={styles.contsli}>
                <div className={styles.imaging}><Image fill alt='asd' src={lg3} /></div>
            </div>
            <div className={styles.contsli}>
                <div className={styles.imaging}><Image fill alt='asd' src={lg5} /></div>
            </div>
            </Carousel>
        
            {/* <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                swiper={swiper} // اضافه کردن useSwiper() به پارامتر swiper
            >
                <SwiperSlide>
                    <div className={styles.imaging}><Image fill alt='asd' src={lg1} /></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.imaging}><Image fill alt='asd' src={lg2} /></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.imaging}><Image fill alt='asd' src={lg3} /></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.imaging}><Image fill alt='asd' src={lg5} /></div>
                </SwiperSlide>
            </Swiper> */}
        </div>
    )
}

export default Carouser;