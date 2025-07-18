import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { IngredientDTO } from "./ingredients";
import { UserDTO } from "../users";

const ENTITY_PATH = "ingredient-categories"
const WITH_INGREDIENTS = "with-ingredients"

export interface IngredientCategoryDTO {
  id: number
  name: string
  ingredients?: IngredientDTO[]
  updated_by_user?: UserDTO
  updated_at?: string
}

export const getIngredientCategories = async () : Promise<IngredientCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные категорий ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getIngredientCategoriesWithIngredients = async () : Promise<IngredientCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_INGREDIENTS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные категорий ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getIngredientCategoryWithIngredients = async (id: number) : Promise<IngredientCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_INGREDIENTS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postIngredientCategory = async (createData: IngredientCategoryDTO): Promise<IngredientCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(
      createData
    )
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postIngredientCategoryWithIngredients = async (createData: IngredientCategoryDTO): Promise<IngredientCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_INGREDIENTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(
      createData,
    )
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putIngredientCategory = async (ingredientСategoryData: IngredientCategoryDTO): Promise<IngredientCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/update/${ingredientСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(
      ingredientСategoryData,
    )
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putIngredientCategoryWithIngredients = async (ingredientСategoryData: IngredientCategoryDTO): Promise<IngredientCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_INGREDIENTS}/update/${ingredientСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(
      ingredientСategoryData,
    )
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteIngredientCategory = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось удалить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

