import { GetIngredientTypeDTO, GetIngredientWithProductsDTO } from "./ingredientWithProducts"
import { IngredientDTO } from "./ingredients"
import { BASE_URL } from "./constants"

const ENTITY_PATH = "dishes-with-ingredients"

export interface GetIngredientDTO {
  id: number
  name: string
  type: GetIngredientTypeDTO
}

export interface PutDishIngredientWithIngredientDTO {
  data_action: string
  ingredient_data_action: string
  id: number
  ingredient_id: number
  ingredient_name: string
  ingredient_type_id: number
  waste_percentage: number
  ingredient_raw_weight: number
}

export interface PostDishIngredientWithIngredientDTO {
  ingredient_data_action: string
  ingredient_id: number
  ingredient_name: string
  ingredient_type_id: number
  waste_percentage: number
  ingredient_raw_weight: number
}

export interface GetDishIngredientDTO {
  id: number
  ingredient: GetIngredientWithProductsDTO
  waste_percentage: number
  ingredient_raw_weight: number
}

export interface PutDishWithIngredientsDTO {
  id: number
  name: string
  dishes_ingredients: PutDishIngredientWithIngredientDTO[]
}

export interface PostDishWithIngredientsDTO {
  name: string
  dishes_ingredients: PostDishIngredientWithIngredientDTO[]
}

export interface GetDishWithIngredientsDTO {
  id: number
  name: string
  deletion_allowed: boolean
  dishes_ingredients: GetDishIngredientDTO[]
}

export const putDishWithIngredients = async (updateData: PutDishWithIngredientsDTO): Promise<GetDishWithIngredientsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/update/${updateData.id}`, {
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

export const postDishWithIngredients = async (createData: PostDishWithIngredientsDTO): Promise<GetDishWithIngredientsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
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

export const getDishesWithIngredients = async () : Promise<GetDishWithIngredientsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюдах')

  const data = await response.json()
  return data
}

export const getDishWithIngredients = async (id: number) : Promise<GetDishWithIngredientsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюде')

  const data = await response.json()
  return data
}

export const deleteDish = async (id: number): Promise<GetDishIngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить блюдо')
  }
  const data = await response.json()
  return data
}