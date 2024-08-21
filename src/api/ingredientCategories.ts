import { BASE_URL } from "./constants";

const ENTITY_PATH = "ingredient-categories"

export interface IngredientCategoryDTO {
  id: number
  name: string
}

export interface PostIngredientCategoryDTO {
  name: string
}

export const getIngredientCategories = async () : Promise<IngredientCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные категорий ингредиентов (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const postIngredientCategory = async (createData: PostIngredientCategoryDTO): Promise<IngredientCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось получить данные категории ингредиентов (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

export const putIngredientCategory = async (ingredientСategoryData: IngredientCategoryDTO): Promise<IngredientCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${ingredientСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredientСategoryData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось обновить данные категории ингредиента (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}



export const deleteIngredientCategory = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные категории ингредиентов (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

