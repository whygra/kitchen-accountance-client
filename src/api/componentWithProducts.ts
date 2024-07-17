import { ComponentDTO } from "./components"
import { BASE_URL } from "./constants"

const ENTITY_PATH = "components-with-products"

export interface PutComponentProductWithProductDTO {
  data_action: string
  product_data_action: string
  id: number
  product_id: number
  product_name: string
  waste_percentage: number
  raw_content_percentage: number
}

export interface PostComponentProductWithProductDTO {
  product_data_action: string
  product_id: number
  product_name: string
  waste_percentage: number
  raw_content_percentage: number
}

export interface GetComponentTypeDTO {
  id: number
  name: string
}

export interface GetProductDTO {
  id: number
  name: string
}

export interface GetComponentProductDTO {
  id: number
  product: GetProductDTO
  waste_percentage: number
  raw_content_percentage: number
}

export interface PutComponentWithProductsDTO {
  id: number
  name: string
  type_id: number
  components_products: PutComponentProductWithProductDTO[]
}

export interface PostComponentWithProductsDTO {
  name: string
  type_id: number
  components_products: PostComponentProductWithProductDTO[]
}

export interface GetComponentWithProductsDTO {
  id: number
  name: string
  type: GetComponentTypeDTO
  components_products: GetComponentProductDTO[]
}

export const putComponentWithProducts = async (updateData: PutComponentWithProductsDTO): Promise<GetComponentWithProductsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  if (!response.ok)
    throw new Error('Не удалось обновить компонент')
  
  const data = await response.json()
  return data
}

export const postComponentWithProducts = async (createData: PostComponentWithProductsDTO): Promise<GetComponentWithProductsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok)
    throw new Error('Не удалось создать компонент')
  
  const data = await response.json()
  return data
}

export const getComponentsWithProducts = async () : Promise<GetComponentWithProductsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о компонентах')

  const data = await response.json()
  return data
}

export const getComponentWithProducts = async (id: number) : Promise<GetComponentWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о компоненте')

  const data = await response.json()
  return data
}