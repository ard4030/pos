'use client'
import styles from "./step4.module.css"
import { Button, Result } from 'antd';
import { useState } from "react";

const Step4 = ({mobile}) => {
    const [stat, setStat] = useState("success")
    console.log(mobile)
  return (
    <div>
        {
            (stat === "success") ?

            <Result
                status="success"
                style={{direction:"rtl"}}
                title="مدارک شما با موفقیت تایید شد!"
                subTitle="جهت ادامه سفارش پرداخت را انجام دهید . پس از پرداخت دستگاه برای شما ارسال خواهد شد"
                extra={[
                <Button type="primary" key="console">
                    پرداخت
                </Button>,
                <Button key="buy">انصراف</Button>,
                ]}
            />
            :(stat === "neededit")  ?
            
            <Result
                status="warning"
                title="مدارک شما تایید نشده و به ویرایش احتیاج دارد!"
                subTitle="با کلیک بر روی دکمه زیر مواردی که نیاز هست اصلاح بشه رو ببین"
                extra={
                <Button type="primary" key="console">
                    نمایش اصلاحات 
                </Button>
                }
            />
            :(stat === "pending") ? 
            <Result
            title="مدارک شما در حال بررسی میباشد"
            subTitle="در کمتر از 24 ساعت مدارک شما بررسی و نتیجه از طریق پیامک به شما اعلام میشود!"
            extra={
              <Button type="primary" key="console">
                ویرایش
              </Button>
            }
            />
            :
            <Result
            status="error"
            title="درخواست شما رد شد!"
            subTitle="متاسفانه مدارک و صلاحیت شما برای دریافت دستگاه رد شد!"
            extra={<Button type="primary">درخواست جدید</Button>}
            />
        }
          
    </div>
  )
}

export default Step4