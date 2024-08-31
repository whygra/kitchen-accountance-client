import { C_ACCESS_TOKEN, BASE_URL } from "./constants"
import { DishIngredientDTO, DishIngredientWithPurchaseOptionsDTO } from "./ingredients"
import { DishCategoryDTO } from "./dishCategories"
import { getCookie } from "../cookies"

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
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(updateData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const postDishWithIngredients = async (createData: DishWithIngredientsDTO): Promise<DishWithIngredientsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/create`, {
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
      message: `Не удалось добавить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const getDishesWithIngredients = async () : Promise<DishWithIngredientsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

export const getDishWithIngredients = async (id: number) : Promise<DishWithIngredientsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_INGREDIENTS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

export const getDishWithPurchaseOptions = async (id: number) : Promise<DishWithPurchaseOptions | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные категории блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  if(!response.ok)
    throw new Error(`Не удалось получить данные блюда (${response.status}: ${response.statusText})`)

  return data
}

export const deleteDish = async (id: number): Promise<DishIngredientDTO | null> => {
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
      message: `Не удалось удалить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}