import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL } from "./constants";
import { DistributorDTO } from "./distributors";
import { IngredientDTO } from "./ingredients";
import { ProductCategoryDTO } from "./productCategories";
import { PurchaseOptionDTO, ProductPurchaseOptionDTO } from "./purchaseOptions";
import { UnitDTO } from "./units";

const ENTITY_PATH = "products"
const WITH_PURCHASE_OPTIONS = "with-purchase-options"

export interface ProductDTO {
  id: number
  name: string
  category?: ProductCategoryDTO
  waste_percentage?: number
  raw_content_percentage?: number
  product_share?: number
  purchase_options?: ProductPurchaseOptionDTO[]
  ingredients?: IngredientDTO[]
}


export const getProducts = async () : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные продуктов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getProductWithPurchaseOptions = async (id:number) : Promise<ProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getProductsWithPurchaseOptions = async () : Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null).catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные продуктов ${data?.message}`,
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
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postProductWithPurchaseOptions = async (createData: ProductDTO): Promise<ProductDTO | null> => {
  console.log(createData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(createData)
  })
  const data = await response.json().catch(e=>null)
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
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putProductWithPurchaseOptions = async (productData: ProductDTO): Promise<ProductDTO | null> => {
  console.log(productData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/update/${productData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(productData)
  })
  const data = await response.json().catch(e=>null)
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
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные продукта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

