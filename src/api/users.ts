import { getCookie, setCookie } from "../cookies";
import { UserPermissions } from "../models";
import { C_ACCESS_TOKEN, BASE_URL, C_IS_SIGNED_IN } from "./constants";

const ENTITY_PATH = "users"

export interface UserRoleDTO {
  id: number
  name: string
  permissions?: UserPermissionDTO[]
}

export interface UserPermissionDTO {
  id: number
  name: string
}

export interface UserDTO {
  id: number
  name: string
  email: string
  password: string
  roles?: UserRoleDTO[]
  permissions?: UserPermissionDTO[]
}

export interface AuthResponse {
    access_token?: string
    message: string
}

export const getCurrent = async () : Promise<UserDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/current`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
      },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) {
    setCookie(C_ACCESS_TOKEN, '', 0)
    setCookie(C_IS_SIGNED_IN, '', 0)
    throw {
      message: `Не удалось получить данные пользователя ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  }
  return data
}

export const getUsers = async () : Promise<UserDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
      },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные пользователей ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const signUp = async (createData: UserDTO): Promise<AuthResponse | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createData)
  })
  console.log(createData)
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось создать учетную запись ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
    setCookie(C_ACCESS_TOKEN, data.access_token, 300)
    setCookie(C_IS_SIGNED_IN, 'true', 300)
  return data
}

export const signIn = async (userData: UserDTO): Promise<AuthResponse | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось выполнить вход ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  setCookie(C_ACCESS_TOKEN, data.access_token, 300)
  setCookie(C_IS_SIGNED_IN, 'true', 300)
  return data
}

export const signOut = async (): Promise<AuthResponse | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    }
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
    message: `Не удалось выполнить выход ${data?.message}`,
    name: `${response.status} ${response.statusText}`
  }
  setCookie(C_ACCESS_TOKEN, '', 0)
  setCookie(C_IS_SIGNED_IN, '', 0)
  return data
}

export const putUser = async (userData: UserDTO): Promise<UserDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/update/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные учетной записи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const assignRoles = async (userData: UserDTO): Promise<UserDTO | null> => {
  console.log(userData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/assign-roles/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  console.log(data)
  if (!response.ok) 
    throw {
      message: `Не удалось назначить роли пользователя\n ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getRoles = async (): Promise<UserRoleDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/roles/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>{return null})
  if (!response.ok) 
    throw {
      message: `Не удалось получить роли пользователей\n ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}



export const deleteUser = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить данные пользователя')
  }
  const data = await response.json()
  return data
}

