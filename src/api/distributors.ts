import { BASE_URL } from "./constants"
import { ProductDTO } from "./products"
import { UnitDTO } from "./units"

const ENTITY_PATH = "distributors"
const WITH_PURCHASE_OPTIONS = 'with-purchase-options'

export interface DistributorDTO {
  id:number
  name:string
}

export interface GetDistributorWithPurchaseOptionsDTO {
  id: number
  name: string
  deletion_allowed: boolean
  purchase_options: GetPurchaseOptionWithProductDTO[]
}

export interface GetPurchaseOptionWithProductDTO {
    id : number
    product : ProductDTO
    unit: UnitDTO
    name : string
    net_weight : number
    price : number
}

export interface PutDistributorWithPurchaseOptionsDTO {
  id: number
  name: string
  purchase_options: PutPurchaseOptionWithProductDTO[]
}

export interface PutPurchaseOptionWithProductDTO {
  data_action: string
  product_data_action: string
  id: number
  product: ProductDTO
  name: string
  net_weight: number
  price : number
}

export interface PostDistributorWithPurchaseOptionsDTO {
    name: string
    purchase_options: PostPurchaseOptionWithProductDTO[]
}

export interface PostPurchaseOptionWithProductDTO {
    product_data_action: string
    id: number
    product: ProductDTO
    name: string
    net_weight: number
    price : number
}

export const putDistributorWithPurchaseOptions = async (updateData: PutDistributorWithPurchaseOptionsDTO): Promise<GetDistributorWithPurchaseOptionsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  if (!response.ok)
    throw new Error('Не удалось обновить блюдо')
  
  const data = await response.json()
  return data
}

export const postDistributorWithPurchaseOptions = async (createData: PostDistributorWithPurchaseOptionsDTO): Promise<GetDistributorWithPurchaseOptionsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok)
    throw new Error('Не удалось создать блюдо')
  
  const data = await response.json()
  return data
}

export const getDistributorsWithPurchaseOptions = async () : Promise<GetDistributorWithPurchaseOptionsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюдах')

  const data = await response.json()
  return data
}

export const getDistributorWithPurchaseOptions = async (id: number) : Promise<GetDistributorWithPurchaseOptionsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюде')

  const data = await response.json()
  return data
}

export const deleteDistributor = async (id: number): Promise<GetDistributorWithPurchaseOptionsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить блюдо')
  }
  const data = await response.json()
  return data
}