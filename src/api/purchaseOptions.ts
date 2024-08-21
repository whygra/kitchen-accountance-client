import { DataAction } from "../models";
import { BASE_URL } from "./constants";
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
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные позиции закупки (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const getPurchaseOptionsWithPurchaseOptions = async () : Promise<PurchaseOptionDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные позиций закупки (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const postPurchaseOption = async (createData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось добавить данные позиции закупки (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

export const putPurchaseOption = async (purchaseoptionData: PurchaseOptionDTO): Promise<PurchaseOptionDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${purchaseoptionData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(purchaseoptionData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось обновить данные позиции закупки (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}



export const deletePurchaseOption = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные позиции закупки (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

