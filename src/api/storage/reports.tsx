import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { UserDTO } from "../users";
import { ProductDTO } from "../nomenclature/products";
import { IngredientDTO } from "../nomenclature/ingredients";

const ENTITY_PATH = "reports"

export const getItemsInStorage = async (date: string): Promise<ProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/items-in-storage/${date}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e => null)
  if (!response.ok)
    throw {
      message: `Не удалось получить отчет за ${date}: ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
