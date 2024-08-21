import { DataAction } from "../models"
import { BASE_URL } from "./constants"
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  if (!response.ok)
    throw new Error(`Не удалось обновить данные поставщика (${response.status}: ${response.statusText})`)
  
  const data = await response.json()
  return data
}

export const postDistributorWithPurchaseOptions = async (createData: DistributorWithPurchaseOptionsDTO): Promise<DistributorWithPurchaseOptionsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok)
    throw new Error(`Не удалось добавить данные поставщика (${response.status}: ${response.statusText})`)
  
  const data = await response.json()
  return data
}

export const getDistributorsWithPurchaseOptions = async () : Promise<DistributorWithPurchaseOptionsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные поставщиков (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const getDistributorWithPurchaseOptions = async (id: number) : Promise<DistributorWithPurchaseOptionsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные поставщика (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const deleteDistributor = async (id: number): Promise<DistributorWithPurchaseOptionsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные поставщика (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}