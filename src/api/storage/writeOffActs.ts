import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { UserDTO } from "../users";
import { ProductDTO } from "../nomenclature/products";
import { IngredientDTO } from "../nomenclature/ingredients";

const ENTITY_PATH = "write-off-acts"
const WITH_ITEMS = "with-items"

export interface WriteOffActDTO {
  id: number
  date: string
  is_item_measured?: boolean
  products?: ProductDTO[]
  ingredients?: IngredientDTO[]
  updated_by_user?: UserDTO
  updated_at?: string
}

export const getWriteOffActs = async () : Promise<WriteOffActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postWriteOffAct = async (createData: WriteOffActDTO): Promise<WriteOffActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...createData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putWriteOffAct = async (WriteOffActData: WriteOffActDTO): Promise<WriteOffActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WriteOffActData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...WriteOffActData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}


export const putWriteOffActWithItems = async (updateData: WriteOffActDTO): Promise<WriteOffActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...updateData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postWriteOffActWithItems = async (createData: WriteOffActDTO): Promise<WriteOffActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...createData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getWriteOffActsWithItems = async () : Promise<WriteOffActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось получить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getWriteOffActWithItems = async (id: number) : Promise<WriteOffActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteWriteOffAct = async (id: number): Promise<WriteOffActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные акт списания ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
