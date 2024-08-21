import { BASE_URL } from "./constants";

const ENTITY_PATH = "ingredient-types"

export interface IngredientTypeDTO {
  id: number
  name: string
}

export const getIngredientTypes = async () : Promise<IngredientTypeDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о типах ингредиентов')

  const data = await response.json()
  return data
}

