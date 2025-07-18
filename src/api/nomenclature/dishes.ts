import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { DishCategoryDTO } from "./dishCategories"
import { IngredientDTO } from "./ingredients"
import { InsertDistributorPurchaseOptionsFromXLSX } from "./distributors"
import { DishGroupDTO } from "./dishGroups"
import { UserDTO } from "../users"

const ENTITY_PATH = "dishes"

const WITH_INGREDIENTS = 'with-ingredients'
const WITH_PURCHASE_OPTIONS = 'with-purchase-options'


export function getDishProducts(dish:DishDTO){
  let products = []
  for (const ingredient of dish.ingredients??[]){
    for (const product of ingredient.products??[]){
      products.push(product)
    }
  }
  return products
}

export interface DishDTO {
  id: number
  name: string
  description?: string
  category?: DishCategoryDTO
  group?: DishGroupDTO
  ingredients?: IngredientDTO[]
  avg_waste_percentage?: number
  total_gross_weight?: number
  total_net_weight?: number

  net_weight?: number
  ingredient_amount?: number
  image? : ServerImageData
  updated_by_user?: UserDTO
  updated_at?: string

  price?: number
  amount?: number
}

export const putDishWithIngredients = async (updateData: DishDTO): Promise<DishDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_INGREDIENTS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(updateData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const postDishWithIngredients = async (createData: DishDTO): Promise<DishDTO | null> => {
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
      message: `Не удалось добавить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}


export const uploadDishImage = async (id: number, file: File): Promise<ServerImageData | null> => {
  let formData = new FormData(); 
  formData.append('file', file)
  
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${id}/upload-image`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: formData
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось загрузить изображение ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

export const getDishes = async () : Promise<DishDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

export const getDishesWithIngredients = async () : Promise<DishDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_INGREDIENTS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

export const getDishWithIngredients = async (id: number) : Promise<DishDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_INGREDIENTS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const getDishesWithPurchaseOptions = async () : Promise<DishDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/all`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  if(!response.ok)
    throw new Error(`Не удалось получить данные блюд (${response.status}: ${response.statusText})`)

  return data
}

export const getDishWithPurchaseOptions = async (id: number) : Promise<DishDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  if(!response.ok)
    throw new Error(`Не удалось получить данные блюда (${response.status}: ${response.statusText})`)

  return data
}

export const deleteDish = async (id: number): Promise<DishDTO | null> => {
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
      message: `Не удалось удалить данные блюда ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}