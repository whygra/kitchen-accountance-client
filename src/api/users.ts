import { UserPermissions } from "../models";
import { BASE_URL, ServerImageData, getProjectPath } from "./constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../cookies"
import { ProjectDTO, RoleDTO } from "./projects";

const ENTITY_PATH = "users"

export interface UserDTO {
  id: number
  name: string
  email: string
  email_verified_at?: string
  password?: string
  new_password?: string
  role?: RoleDTO
}

export const getProjectUsers = async () : Promise<UserDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные пользователей ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const assignRole = async (userData: UserDTO): Promise<UserDTO | null> => {
  console.log(userData)
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/assign-role/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json().catch(e=>null)
  console.log(data)
  if (!response.ok) 
    throw {
      message: `Не удалось назначить роль пользователя\n ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const inviteToProject = async (email: string): Promise<UserDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/invite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({email: email})
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось пригласить пользователя\n ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const removeFromProject = async (id: number): Promise<UserDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/remove/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось исключить пользователя\n ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

