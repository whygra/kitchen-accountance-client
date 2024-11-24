import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL, C_SELECTED_PROJECT_ID, PROJECT_PATH } from "./constants";
import { IngredientDTO } from "./ingredients";

const ENTITY_PATH = "ingredient-categories"
const WITH_INGREDIENTS = "with-ingredients"

export interface IngredientCategoryDTO {
  id: number
  name: string
  ingredients?: IngredientDTO[]
}

export const getIngredientCategories = async () : Promise<IngredientCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/all`,{
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
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_INGREDIENTS}/all`,{
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
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_INGREDIENTS}/${id}`,{
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
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/create`, {
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
  console.log(createData)
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_INGREDIENTS}/create`, {
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
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/update/${ingredientСategoryData.id}`, {
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
  console.log(ingredientСategoryData)
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_INGREDIENTS}/update/${ingredientСategoryData.id}`, {
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
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/delete/${id}`, {
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

