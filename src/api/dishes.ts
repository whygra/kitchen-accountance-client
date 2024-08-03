import { GetIngredientWithProductsDTO, GetIngredientWithPurchaseOptionsDTO } from "./ingredients"
import { BASE_URL } from "./constants"
import { IngredientDTO } from "./ingredients"

const ENTITY_PATH = "dishes"

const WITH_INGREDIENTS = 'with-ingredients'
const WITH_PURCHASE_OPTIONS = 'with-purchase-options'

export interface GetDishWithPurchaseOptionsDTO {
  id: number
  name: string
  deletion_allowed: boolean
  dishes_ingredients: GetDishIngredientWithPurchaseOptionsDTO[]
}

export interface GetDishWithIngredientsDTO {
  id: number
  name: string
  deletion_allowed: boolean
  dishes_ingredients: GetDishIngredientDTO[]
}

export interface GetDishIngredientWithPurchaseOptionsDTO {
  id: number
  ingredient: GetIngredientWithPurchaseOptionsDTO
  waste_percentage: number
  ingredient_raw_weight: number
}

export interface GetDishIngredientDTO {
  id: number
  ingredient: GetIngredientWithProductsDTO
  waste_percentage: number
  ingredient_raw_weight: number
}

export interface PutDishIngredientWithIngredientDTO {
  data_action: string
  ingredient_data_action: string
  id: number
  ingredient: IngredientDTO
  waste_percentage: number
  ingredient_raw_weight: number
}

export interface PutDishWithIngredientsDTO {
  id: number
  name: string
  dishes_ingredients: PutDishIngredientWithIngredientDTO[]
}

export interface PostDishIngredientWithIngredientDTO {
  ingredient_data_action: string
  ingredient: IngredientDTO
  waste_percentage: number
  ingredient_raw_weight: number
}

export interface PostDishWithIngredientsDTO {
  name: string
  dishes_ingredients: PostDishIngredientWithIngredientDTO[]
}

export const putDishWithIngredients = async (updateData: PutDishWithIngredientsDTO): Promise<GetDishWithIngredientsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/update/${updateData.id}`, {
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
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/create`, {
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
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюдах')

  const data = await response.json()
  return data
}

export const getDishWithIngredients = async (id: number) : Promise<GetDishWithIngredientsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюде')

  const data = await response.json()
  return data
}

export const getDishWithPurchaseOptions = async (id: number) : Promise<GetDishWithPurchaseOptionsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`)
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