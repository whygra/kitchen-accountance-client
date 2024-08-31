import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL } from "./constants";
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
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные продуктов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getProductWithPurchaseOptions = async (id:number) : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/with-purchase-options/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postProduct = async (createData: ProductDTO): Promise<ProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(createData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putProduct = async (productData: ProductDTO): Promise<ProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${productData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(productData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}



export const deleteProduct = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

