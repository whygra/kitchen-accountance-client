import { IngredientDTO } from "./ingredients"
import { BASE_URL } from "./constants"

const ENTITY_PATH = "ingredients-with-products"

export interface PutIngredientProductWithProductDTO {
  data_action: string
  product_data_action: string
  id: number
  product_id: number
  product_name: string
  waste_percentage: number
  raw_content_percentage: number
}

export interface PostIngredientProductWithProductDTO {
  product_data_action: string
  product_id: number
  product_name: string
  waste_percentage: number
  raw_content_percentage: number
}

export interface GetIngredientTypeDTO {
  id: number
  name: string
}

export interface GetProductDTO {
  id: number
  name: string
}

export interface GetIngredientProductDTO {
  id: number
  product: GetProductDTO
  waste_percentage: number
  raw_content_percentage: number
}

export interface PutIngredientWithProductsDTO {
  id: number
  name: string
  type_id: number
  ingredients_products: PutIngredientProductWithProductDTO[]
}

export interface PostIngredientWithProductsDTO {
  name: string
  type_id: number
  ingredients_products: PostIngredientProductWithProductDTO[]
}

export interface GetIngredientWithProductsDTO {
  id: number
  name: string
  type: GetIngredientTypeDTO
  ingredients_products: GetIngredientProductDTO[]
}

export const putIngredientWithProducts = async (updateData: PutIngredientWithProductsDTO): Promise<GetIngredientWithProductsDTO | null> => {
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

export const postIngredientWithProducts = async (createData: PostIngredientWithProductsDTO): Promise<GetIngredientWithProductsDTO | null> => {
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

export const getIngredientsWithProducts = async () : Promise<GetIngredientWithProductsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о компонентах')

  const data = await response.json()
  return data
}

export const getIngredientWithProducts = async (id: number) : Promise<GetIngredientWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о компоненте')

  const data = await response.json()
  return data
}