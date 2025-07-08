import { BASE_URL, ServerImageData, getProjectPath } from "../constants"
import { C_ACCESS_TOKEN, C_SELECTED_PROJECT_ID, getCookie } from "../../cookies"
import { UserDTO } from "../users";
import { ProductDTO } from "../nomenclature/products";
import { DistributorDTO } from "../nomenclature/distributors";
import { PurchaseOptionDTO } from "../nomenclature/purchaseOptions";

const ENTITY_PATH = "purchase-acts"
const WITH_ITEMS = "with-items"

export interface PurchaseActDTO {
  id: number
  date: string
  total_cost?: number
  distributor?: DistributorDTO
  items?: PurchaseOptionDTO[]
  updated_by_user?: UserDTO
  updated_at?: string
}

export const getPurchaseActs = async () : Promise<PurchaseActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postPurchaseAct = async (createData: PurchaseActDTO): Promise<PurchaseActDTO | null> => {
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
      message: `Не удалось добавить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putPurchaseAct = async (PurchaseActData: PurchaseActDTO): Promise<PurchaseActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${PurchaseActData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...PurchaseActData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putPurchaseActWithItems = async (updateData: PurchaseActDTO): Promise<PurchaseActDTO | null> => {
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
      message: `Не удалось обновить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postPurchaseActWithItems = async (createData: PurchaseActDTO): Promise<PurchaseActDTO | null> => {
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
      message: `Не удалось добавить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getPurchaseActsWithItems = async () : Promise<PurchaseActDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось получить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getPurchaseActWithItems = async (id: number) : Promise<PurchaseActDTO | null> => {
  const response = await fetch(`${BASE_URL}/${getProjectPath()}/${getCookie(C_SELECTED_PROJECT_ID)}/${ENTITY_PATH}/${WITH_ITEMS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deletePurchaseAct = async (id: number): Promise<PurchaseActDTO | null> => {
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
      message: `Не удалось удалить акт закупки ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
