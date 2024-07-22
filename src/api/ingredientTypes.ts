import { BASE_URL } from "./constants";

const ENTITY_PATH = "ingredient-types"

export interface IngredientTypeDTO {
  id: number
  name: string
}

export interface CreateIngredientTypeDTO {
  name: string
}

export const getIngredientTypes = async () : Promise<IngredientTypeDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о типах компонентов')

  const data = await response.json()
  return data
}

export const postIngredientType = async (createData: CreateIngredientTypeDTO): Promise<IngredientTypeDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать тип компонента')
  }
  const data = await response.json()
  return data
}

