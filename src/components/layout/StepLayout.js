import HeadStep from '@/module/HeadStep'
import styles from './steplayout.module.css'

const StepLayout = ({children}) => {

  return (
    <div>
        <HeadStep/>
        <div className={styles.contStep}>
            {children}
        </div>
    </div>
  )
}

export default StepLayout