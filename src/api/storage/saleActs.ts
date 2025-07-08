import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { UserDTO } from "../users";
import { DishDTO } from "../nomenclature/dishes";

const ENTITY_PATH = "sale-acts"
const WITH_ITEMS = "with-items"

export interface SaleActDTO {
  id: number
  date: string
  is_item_measured?: boolean
  items?: DishDTO[]
  updated_by_user?: UserDTO
  updated_at?: string
}

export const getSaleActs = async () : Promise<SaleActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postSaleAct = async (createData: SaleActDTO): Promise<SaleActDTO | null> => {
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
      message: `Не удалось добавить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putSaleAct = async (SaleActData: SaleActDTO): Promise<SaleActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${SaleActData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...SaleActData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}


export const putSaleActWithItems = async (updateData: SaleActDTO): Promise<SaleActDTO | null> => {
  console.log(updateData)
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
      message: `Не удалось обновить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postSaleActWithItems = async (createData: SaleActDTO): Promise<SaleActDTO | null> => {
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
      message: `Не удалось добавить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getSaleActsWithItems = async () : Promise<SaleActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось получить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getSaleActWithItems = async (id: number) : Promise<SaleActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
    console.log(data)
  return data
}

export const deleteSaleAct = async (id: number): Promise<SaleActDTO | null> => {
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
      message: `Не удалось удалить акт продажи ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
