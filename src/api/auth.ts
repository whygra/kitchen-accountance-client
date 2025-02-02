import { C_PROJECT_DATA, C_USER_DATA, getCookie, setCookie } from "../cookies";
import { C_ACCESS_TOKEN, C_IS_SIGNED_IN } from "../cookies";
import { BASE_URL } from "./constants";
import { UserDTO } from "./users";

const ENTITY_PATH = "auth"

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
  const data = await response.json().catch(e=>{throw e})
  if (!response.ok) {
    throw {
      message: `Не удалось получить данные пользователя ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
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
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось создать учетную запись ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
    setCookie(C_ACCESS_TOKEN, data.access_token, 300)
    setCookie(C_IS_SIGNED_IN, 'true', 300)
  return data
}

export const resendVerificationEmail = async (): Promise<{message:string}|null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/resend`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось отправить ссылку ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const forgotPassword = async (email: string): Promise<{message:string}|null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: email})
  })
  const data = await response.json().catch(e=>{throw e})
  if (!response.ok) 
    throw {
      message: `${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const resetPassword = async (body: {email: string, password: string, token: string}): Promise<{message:string}|null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const data = await response.json().catch(e=>{throw e})
  if (!response.ok) 
    throw {
      message: `${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const signIn = async (userData: UserDTO, remember = true): Promise<AuthResponse | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...userData,
      remember: remember
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) {
    throw {
      message: `Не удалось выполнить вход ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
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
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
    message: `Не удалось выполнить выход ${data?.message}`,
    name: `${response.status} ${response.statusText}`,
    errors: data?.errors,
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
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось изменить данные учетной записи ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const updatePassword = async (userData: UserDTO): Promise<UserDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/update-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось изменить пароль ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  return data
}

export const deleteUser = async (): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) {
    throw {
      message: `Не удалось удалить данные пользователя\n ${data?.message}`,
      name: `${response.status} ${response.statusText}`,
      errors: data?.errors,
    }
  }
  return data
}

