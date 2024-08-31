import { getCookie } from "../cookies"
import { DataAction } from "../models"
import { C_ACCESS_TOKEN, BASE_URL } from "./constants"
import { ProductDTO } from "./products"
import { DistributorPurchaseOptionDTO } from "./purchaseOptions"
import { UnitDTO } from "./units"

const ENTITY_PATH = "distributors"
const WITH_PURCHASE_OPTIONS = 'with-purchase-options'

export interface DistributorDTO {
  id:number
  name:string
}

export interface DistributorWithPurchaseOptionsDTO {
  id: number
  name: string
  purchase_options: DistributorPurchaseOptionDTO[]
}

export const putDistributorWithPurchaseOptions = async (updateData: DistributorWithPurchaseOptionsDTO): Promise<DistributorWithPurchaseOptionsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(updateData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const postDistributorWithPurchaseOptions = async (createData: DistributorWithPurchaseOptionsDTO): Promise<DistributorWithPurchaseOptionsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/create`, {
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
      message: `Не удалось добавить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const getDistributorsWithPurchaseOptions = async () : Promise<DistributorWithPurchaseOptionsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные поставщиков ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getDistributorWithPurchaseOptions = async (id: number) : Promise<DistributorWithPurchaseOptionsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteDistributor = async (id: number): Promise<DistributorWithPurchaseOptionsDTO | null> => {
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
      message: `Не удалось удалить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}