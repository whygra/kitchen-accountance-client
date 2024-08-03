import { BASE_URL } from "./constants";
import { DistributorDTO } from "./distributors";
import { UnitDTO } from "./units";

const ENTITY_PATH = "products"


interface PurchaseOptionDTO {
  id : number
  distributor : DistributorDTO
  unit: UnitDTO
  name : string
  net_weight : number
  price : number
}

export interface ProductDTO {
  id: number
  name: string
}

export interface ProductWithPurchaseOptionsDTO {
  id: number
  name: string
  purchase_options: PurchaseOptionDTO[]
}

export interface PostProductDTO {
  name: string
}

export const getProducts = async () : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о продуктах')

  const data = await response.json()
  return data
}

export const getProductWithPurchaseOptions = async (id:number) : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/with-purchase-options/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о продукте')

  const data = await response.json()
  return data
}

export const postProduct = async (createData: PostProductDTO): Promise<ProductDTO | null> => {
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

