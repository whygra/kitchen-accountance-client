import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { DishDTO } from "./dishes";
import { IngredientCategoryDTO } from "./ingredientCategories";
import { IngredientGroupDTO } from "./ingredientGroups";
import { ProductDTO } from "./products";
import { UserDTO } from "../users";

const ENTITY_PATH = "ingredients"
const WITH_PRODUCTS = "with-products"
const WITH_PURCHASE_OPTIONS = "with-purchase-options"

export interface IngredientDTO {
  id: number
  name: string
  description?: string
  item_weight?: number
  type?: IngredientTypeDTO
  is_item_measured?: boolean
  category?: IngredientCategoryDTO
  group?: IngredientGroupDTO
  products?: ProductDTO[]
  dishes?: DishDTO[]
  updated_by_user?: UserDTO
  updated_at?: string
  avg_waste_percentage?: number
  total_gross_weight?: number
  total_net_weight?: number

  waste_percentage?: number
  net_weight?: number
  gross_weight?: number
  gross_share?: number
  ingredient_amount?: number
  amount?: number
}

export interface IngredientTypeDTO {
  id: number
  name: string
}

export function calcIngredientSourceWeight(ingredient: IngredientDTO){
  return (ingredient?.item_weight??1)*(ingredient.ingredient_amount??1) / (100 - (ingredient.avg_waste_percentage??0)) * 100
}

export const getIngredients = async () : Promise<IngredientDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postIngredient = async (createData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...createData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putIngredient = async (ingredientData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${ingredientData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...ingredientData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}


export const putIngredientWithProducts = async (updateData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...updateData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postIngredientWithProducts = async (createData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...createData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getIngredientsWithProducts = async () : Promise<IngredientDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось получить данные ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getIngredientWithProducts = async (id: number) : Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PRODUCTS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getIngredientWithPurchaseOptions = async (id: number) : Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteIngredient = async (id: number): Promise<IngredientDTO | null> => {
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
      message: `Не удалось удалить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
