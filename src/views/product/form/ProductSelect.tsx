import { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { getProducts, ProductDTO } from '../../../api/products';

interface ProductSelectProps {
  productId : number
  products: ProductDTO[]
  setProductId : (id : number) => void
}

function ProductSelect({productId, products, setProductId} : ProductSelectProps) {


  return (
    <Form.Select
      value={productId}
      onChange={e=>setProductId(parseInt(e.target.value))}
    >
      {products?.map(product => <option value={product.id}>{`${product.id}. ${product.name}`}</option>)} 
    </Form.Select>
  )
}

export default ProductSelect;