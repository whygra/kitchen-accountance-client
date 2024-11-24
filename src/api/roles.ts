import { getCookie, setCookie } from "../cookies";
import { UserPermissions } from "../models";
import { C_ACCESS_TOKEN, BASE_URL, C_IS_SIGNED_IN, C_SELECTED_PROJECT_ID, PROJECT_PATH } from "./constants";
import { ProjectDTO, RoleDTO } from "./projects";

const ENTITY_PATH = "roles"

export const getRoles = async (): Promise<RoleDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
          
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить роли пользователей\n ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}


