import { getCookie } from "../cookies";
import { DataAction } from "../models";
import { C_ACCESS_TOKEN, BASE_URL } from "./constants";
import { DistributorDTO } from "./distributors";
import { ProductDTO, PurchaseOptionProductDTO } from "./products";
import { UnitDTO } from "./units";

const ENTITY_PATH = "purchase-options"


export interface PurchaseOptionDTO {
  id: number
  distributor: DistributorDTO
  unit: UnitDTO
  name: string
  net_weight: number
  price: number
  products: PurchaseOptionProductDTO[]
}

export interface DistributorPurchaseOptionDTO {
  id: number
  unit: UnitDTO
  name: string
  net_weight: number
  price: number
  products: PurchaseOptionProductDTO[]
}

export interface ProductPurchaseOption {
  id: number
  distributor: DistributorDTO
  unit: UnitDTO
  name: string
  net_weight: number
  price: number
}

export const getPurchaseOptions = async () : Promise<PurchaseOptionDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getPurchaseOptionsWithPurchaseOptions = async () : Promise<PurchaseOptionDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
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
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putPurchaseOption = async (purchaseoptionData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${purchaseoptionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(purchaseoptionData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}



export const deletePurchaseOption = async (id: number): Promise<Object | null> => {
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
      message: `Не удалось удалить данные позиции закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

