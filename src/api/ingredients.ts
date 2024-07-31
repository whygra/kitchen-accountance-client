import { BASE_URL } from "./constants";

const ENTITY_PATH = "ingredients"

export interface IngredientDTO {
  id: number
  name: string
  type_id: number
}

export interface CreateIngredientDTO {
  name: string
  type_id: number
}

export const getIngredients = async () : Promise<IngredientDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о ингредиентах')

  const data = await response.json()
  return data
}

export const postIngredient = async (createData: CreateIngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать ингредиент')
  }
  const data = await response.json()
  return data
}

export const putIngredient = async (ingredientData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${ingredientData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredientData)
  })
  if (!response.ok) {
    throw new Error('Не удалось обновить ингредиент')
  }
  const data = await response.json()
  return data
}

