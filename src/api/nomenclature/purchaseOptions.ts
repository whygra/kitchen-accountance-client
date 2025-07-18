import { DataAction } from "../../models";
import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { DistributorDTO } from "./distributors";
import { ProductDTO } from "./products";
import { UnitDTO } from "./units";

const ENTITY_PATH = "purchase-options"
const WITH_PRODUCTS = "with-products"

export interface PurchaseOptionDTO {
  id: number
  distributor?: DistributorDTO
  unit?: UnitDTO
  code?: string
  name: string
  net_weight: number
  price: number
  products?: ProductDTO[]
  product_share?: number
  updated_at?: string

  amount?: number
  update?: boolean
}

export interface DistributorPurchaseOptionDTO {
  id: number
  unit?: UnitDTO
  code?: string
  name: string
  net_weight: number
  price: number
  products: ProductDTO[]
}

export interface ProductPurchaseOptionDTO {
  id: number
  distributor?: DistributorDTO
  unit?: UnitDTO
  code?: string
  name?: string
  net_weight?: number
  price?: number
  product_share?: number
}

export interface DistributorPurchaseOptionColumnIndexes {
  code?: number
  name?: number
  unit?: number
  net_weight?: number
  price?: number
}

export const getPurchaseOptions = async () : Promise<PurchaseOptionDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
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
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/all`,{
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
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/${id}`,{
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
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...createData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
    }
  return data
}

export const postPurchaseOptionWithProducts = async (createData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...createData,
    })
  })
  const data = await response.json()//.catch(e=>console.log(e))
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putPurchaseOption = async (purchaseoptionData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  console.log(purchaseoptionData)
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/update/${purchaseoptionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...purchaseoptionData,
    })
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
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/update/${purchaseoptionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...purchaseoptionData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deletePurchaseOption = async (id: number, distributor?: DistributorDTO): Promise<PurchaseOptionDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      id,
      distributor
    })

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

