import { ReactNode, useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { getProducts, ProductDTO } from '../../api/products';

interface ProductSelectProps {
  productId : number
  handleProductChange : (id : number) => void
}

function ProductSelect(props : ProductSelectProps) {

  const [products, setProducts] = useState(new Array<ProductDTO>)
  const [isLoading, setIsLoading] = useState(false) 

  async function loadProducts() {
    setIsLoading(true);
    const loaded = await getProducts()
    // TODO: if loaded === null
    setProducts(loaded ?? [])
    setIsLoading(false);
  }

  useEffect(()=>{loadProducts()},[])

  return isLoading ? (<>Loading...</>) : (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Продукт</Form.Label>
        <Form.Select
          value={props.productId}
          onChange={e=>props.handleProductChange(parseInt(e.target.value))}
        >
         {products.map(product => <option value={product.id}>{product.name}</option>)} 
        </Form.Select>
      </Form.Group>
    </>
  )
}

export default ProductSelect;