import { getCookie } from "../cookies";
import { DataAction } from "../models";
import { C_ACCESS_TOKEN, BASE_URL } from "./constants";
import { DistributorDTO } from "./distributors";
import { ProductDTO } from "./products";
import { UnitDTO } from "./units";

const ENTITY_PATH = "purchase-options"
const WITH_PRODUCTS = "with-products"


export interface PurchaseOptionDTO {
  id: number
  distributor?: DistributorDTO
  unit: UnitDTO
  code?: number
  name: string
  net_weight: number
  price: number
  products?: ProductDTO[]
}

export interface DistributorPurchaseOptionDTO {
  id: number
  unit: UnitDTO
  code?: number
  name: string
  net_weight: number
  price: number
  products: ProductDTO[]
}

export interface ProductPurchaseOptionDTO {
  id: number
  distributor?: DistributorDTO
  unit?: UnitDTO
  code?: number
  name?: string
  net_weight?: number
  price?: number
  product_share: number
}

export interface DistributorPurchaseOptionColumnIndexes {
  code?: number
  name?: number
  unit?: number
  net_weight?: number
  price?: number
} 

export const getPurchaseOptions = async () : Promise<PurchaseOptionDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные позиций закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getPurchaseOptionsWithProducts = async () : Promise<PurchaseOptionDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось получить данные позиций закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getPurchaseOptionWithProducts = async (id:number) : Promise<PurchaseOptionDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось получить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postPurchaseOption = async (createData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
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
      message: `Не удалось добавить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postPurchaseOptionWithProducts = async (createData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  console.log(createData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/create`, {
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
      message: `Не удалось добавить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putPurchaseOption = async (purchaseoptionData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/update/${purchaseoptionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(purchaseoptionData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putPurchaseOptionWithProducts = async (purchaseoptionData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  console.log(purchaseoptionData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/update/${purchaseoptionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(purchaseoptionData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deletePurchaseOption = async (id: number): Promise<PurchaseOptionDTO | null> => {
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
      message: `Не удалось удалить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

