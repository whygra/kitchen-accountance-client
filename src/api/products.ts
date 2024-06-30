import { BASE_URL } from "./constants";

const ENTITY_PATH = "products"

export interface ProductDTO {
  id: number
  name: string
}

export interface CreateProductDTO {
  name: string
}

export const getProducts = async () : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о продуктах')

  const data = await response.json()
  return data
}

export const postProduct = async (createData: CreateProductDTO): Promise<ProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать продукт')
  }
  const data = await response.json()
  return data
}

export const putProduct = async (productData: ProductDTO): Promise<ProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${productData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  })
  if (!response.ok) {
    throw new Error('Не удалось обновить продукт')
  }
  const data = await response.json()
  return data
}



export const deleteProduct = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить продукт')
  }
  const data = await response.json()
  return data
}

