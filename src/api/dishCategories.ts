import { BASE_URL } from "./constants";

const ENTITY_PATH = "dish-categories"

export interface DishCategoryDTO {
  id: number
  name: string
}

export const getDishCategories = async () : Promise<DishCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные категорий блюд (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const postDishCategory = async (createData: DishCategoryDTO): Promise<DishCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось обновить данные категории блюд (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

export const putDishCategory = async (dishСategoryData: DishCategoryDTO): Promise<DishCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${dishСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dishСategoryData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось обновить данные категории блюд (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

export const deleteDishCategory = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные категории блюд (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

