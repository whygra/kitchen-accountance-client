import { BASE_URL } from "./constants";
import { DistributorDTO } from "./distributors";
import { PurchaseOptionDTO, ProductPurchaseOption } from "./purchaseOptions";
import { UnitDTO } from "./units";

const ENTITY_PATH = "products"

export interface ProductDTO {
  id: number
  name: string
  category_id: number
}

export interface IngredientProductDTO {
  id: number
  name: string
  category_id: number
  waste_percentage: number
  raw_content_percentage: number
}

export interface IngredientProductWithPurchaseOptionsDTO {
  id: number
  name: string
  category_id: number
  purchase_options: ProductPurchaseOption[]
  waste_percentage: number
  raw_content_percentage: number
}

export interface PurchaseOptionProductDTO {
  id: number
  name: string
  category_id: number
  product_share: number
}

export interface ProductWithPurchaseOptionsDTO {
  id: number
  name: string
  category_id: number
  purchase_options: ProductPurchaseOption[]
}

export const getProducts = async () : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные продуктов (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const getProductWithPurchaseOptions = async (id:number) : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/with-purchase-options/${id}`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные продукта (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const postProduct = async (createData: ProductDTO): Promise<ProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось добавить данные продукта (${response.status}: ${response.statusText})`)
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
    throw new Error(`Не удалось обновить данные продукта (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}



export const deleteProduct = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные продукта (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

