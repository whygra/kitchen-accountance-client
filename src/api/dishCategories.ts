import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL } from "./constants";
import { DishDTO } from "./dishes";

const ENTITY_PATH = "dish-categories"

export interface DishCategoryDTO {
  id: number
  name: string
}

export interface DishCategoryWithDishesDTO {
  id: number
  name: string
  dishes: DishDTO[]
}

export const getDishCategories = async () : Promise<DishCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if(!response.ok)
    throw {
      message: `Не удалось получить данные категорий блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

export const postDishCategory = async (createData: DishCategoryDTO): Promise<DishCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(createData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные категории блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putDishCategory = async (dishСategoryData: DishCategoryDTO): Promise<DishCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${dishСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(dishСategoryData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные категории блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteDishCategory = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные категории блюд ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

