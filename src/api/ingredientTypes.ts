import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL, C_SELECTED_PROJECT_ID, PROJECT_PATH } from "./constants";

const ENTITY_PATH = "ingredient-types"

export interface IngredientTypeDTO {
  id: number
  name: string
}

export const getIngredientTypes = async () : Promise<IngredientTypeDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные типов ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

