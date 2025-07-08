import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { UserDTO } from "../users";
import { ProductDTO } from "../nomenclature/products";
import { IngredientDTO } from "../nomenclature/ingredients";

const ENTITY_PATH = "inventory-acts"
const WITH_ITEMS = "with-items"

export interface InventoryActDTO {
  id: number
  date: string
  products?: ProductDTO[]
  ingredients?: IngredientDTO[]
  updated_by_user?: UserDTO
  updated_at?: string
}

export const getInventoryActs = async () : Promise<InventoryActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить акт инвентаризации ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postInventoryAct = async (createData: InventoryActDTO): Promise<InventoryActDTO | null> => {
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
      message: `Не удалось добавить акт инвентаризации ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putInventoryAct = async (InventoryActData: InventoryActDTO): Promise<InventoryActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${InventoryActData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...InventoryActData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить акт инвентаризации ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}


export const putInventoryActWithItems = async (updateData: InventoryActDTO): Promise<InventoryActDTO | null> => {
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
      message: `Не удалось обновить акт инвентаризации ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postInventoryActWithItems = async (createData: InventoryActDTO): Promise<InventoryActDTO | null> => {
  console.log(createData)
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
      message: `Не удалось добавить акт инвентаризации ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getInventoryActsWithItems = async () : Promise<InventoryActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось получить акт инвентаризации ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getInventoryActWithItems = async (id: number) : Promise<InventoryActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить акт инвентаризацииа ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteInventoryAct = async (id: number): Promise<InventoryActDTO | null> => {
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
      message: `Не удалось удалить акт инвентаризации ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
