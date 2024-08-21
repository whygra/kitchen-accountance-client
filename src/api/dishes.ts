import { BASE_URL } from "./constants"
import { DishIngredientDTO, DishIngredientWithPurchaseOptionsDTO } from "./ingredients"
import { DishCategoryDTO } from "./dishCategories"

const ENTITY_PATH = "dishes"

const WITH_INGREDIENTS = 'with-ingredients'
const WITH_PURCHASE_OPTIONS = 'with-purchase-options'

export interface DishWithIngredientsDTO {
  id: number
  name: string
  category: DishCategoryDTO
  ingredients: DishIngredientDTO[]
}

export interface DishWithPurchaseOptions {
  id: number
  name: string
  category: DishCategoryDTO
  ingredients: DishIngredientWithPurchaseOptionsDTO[]
}

export const putDishWithIngredients = async (updateData: DishWithIngredientsDTO): Promise<DishWithIngredientsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  if (!response.ok)
    throw new Error(`Не удалось обновить данные блюда (${response.status}: ${response.statusText})`)
  
  const data = await response.json()
  return data
}

export const postDishWithIngredients = async (createData: DishWithIngredientsDTO): Promise<DishWithIngredientsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok)
    throw new Error(`Не удалось добавить данные блюда (${response.status}: ${response.statusText})`)
  
  const data = await response.json()
  return data
}

export const getDishesWithIngredients = async () : Promise<DishWithIngredientsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные блюда (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const getDishWithIngredients = async (id: number) : Promise<DishWithIngredientsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/${id}`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные блюда (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const getDishWithPurchaseOptions = async (id: number) : Promise<DishWithPurchaseOptions | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные блюда (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const deleteDish = async (id: number): Promise<DishIngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные блюда (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}