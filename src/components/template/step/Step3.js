import UploadComp from "@/module/UploadComp"
import styles from "./step3.module.css"

const Step3 = ({mobile}) => {
  return (
    <div className={styles.contStep3}>
        <h5>آپلود مدارک</h5>
        <p>مدارک شما پس از بررسی کارشناسان تایید میشوند</p>
        <div className={styles.content}>
            <UploadComp mobile={mobile} slug={'melli'} title={"کارت ملی"} />
            <UploadComp mobile={mobile} slug={'shenasname'} title={"شناسنامه"} />
            <UploadComp mobile={mobile} slug={'moaf'} title={"عکس"} />
            <UploadComp mobile={mobile} slug={'govah'} title={"دیگر"}  />

            <UploadComp mobile={mobile} slug={'gharardad'} title={"قرارداد"}  />
            <UploadComp mobile={mobile} slug={'taahod'} title={"تعهد"}  />
            <UploadComp mobile={mobile} slug={'parvene'} title={"پروانه کسب"}  />


        </div>
    </div>
  )
}

export default Step3