import ProductsPage from '@/template/productsPage/ProductsPage'
import React from 'react'

const page = async (props) => {
  const params = new URLSearchParams(props.searchParams);
  const url = `http://localhost:3000/api/products/getall?${params.toString()}`;
  const res = await fetch(url,{
    method:"POST",
    cache: 'no-store',
    body:JSON.stringify(props.searchParams)
  });
  const data = await res.json();


  return (
    <main>
        <ProductsPage data={data.data} params={props.searchParams} />
    </main>
  )
}

export default page