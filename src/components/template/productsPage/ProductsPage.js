import BtnSelect from '@/module/BtnSelect'
import Card from '@/module/Card'
import Image from 'next/image'
import Filter from './Filter'
import styles from './productspage.module.css'

const ProductsPage = ({data,params}) => {
  return (
    <div className={styles.products}>
      <h3>انتخاب محصول</h3>
      <p>در این قسمت لطفا دستگاه کارتخوان مورد نظر خود را انتخاب کنید</p>

      <div className={styles.asli}>
        <Filter params={params} />
        <div className={styles.contProds}>
            {
                data && data.map((item) => 
                <Card 
                width={"32%"}
                data={item} />
                )
            }
        </div>
      </div>

    </div>
  )
}

export default ProductsPage