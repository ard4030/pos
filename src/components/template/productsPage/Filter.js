'use client'
import { Slider, Switch } from "antd"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./filter.module.css"

const Filter = ({params}) => {
    console.log(params)
    const [first, setfirst] = useState({
        min:params.min ? params.min : 15000000,
        max:params.max ? params.max : 5000000,
        mojood:params.mojood === "true" ? true:false ,
    });
    const router = useRouter();

    const handleFilter = (name) => {
        const myParams = new URLSearchParams(first);
        router.push(`/products?${myParams}`)
    }

    useEffect(() => {
        handleFilter()
        // SetStating();
    }, [params,first])
    


  return (
    <div className={styles.contFilter}>
        <div className={`${styles.item} ${styles.fl}`}>
            <label>فقط کالا های موجود : </label>
            <Switch checked={first.mojood} onChange={(check) => setfirst({...first,mojood:check})} />
        </div>

        <div className={`${styles.item}`}>
            <label>بازه قیمتی : </label>
            <div className={styles.el1}>
                <span>از</span> 
                <span>
                    {parseInt(first.min).toLocaleString()}&nbsp;
                    تومان
                </span>
                <span>تا</span>
                <span>
                    {parseInt(first.max).toLocaleString()}&nbsp;
                    تومان
                </span>
            </div>
            <Slider
                range
                step={1}
                defaultValue={[first.min, first.max]}
                onChange={(val) =>setfirst({...first,min:val[0],max:val[1]}) }
                onAfterChange={(val) =>setfirst({...first,min:val[0],max:val[1]}) }
                min={0}
                max={20000000}
            />
            
        </div>

        <button onClick={() => handleFilter()}>اعمال</button>

    </div>
  )
}

export default Filter