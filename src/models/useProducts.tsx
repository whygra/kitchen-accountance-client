
import { useCallback, useState } from 'react'
import { getProducts as getProductsRequest, postProduct as postProductRequest } from '../api/products'
import { ProductDTO, CreateProductDTO } from '../api/products'

export default function useProducts() {
  const [productsData, setProductsData] = useState<ProductDTO[] | null>(null)

  const getProducts = useCallback(async () => {
    const products = await getProductsRequest()
    setProductsData(products)
  }, [])

  const createProduct = useCallback(async (createData: CreateProductDTO) => {
    const response = await postProductRequest(createData)

    if (response !== null) {
      setProductsData([{...productsData, id: response.id, name: response.name }])
    }
  }, [productsData])

  return {
    products: productsData,
    createProduct,
    getProducts
  }
}