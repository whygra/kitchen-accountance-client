import { getCookie } from "../cookies"
import { DataAction } from "../models"
import { C_ACCESS_TOKEN, BASE_URL, C_SELECTED_PROJECT_ID, PROJECT_PATH } from "./constants"
import { ProductDTO } from "./products"
import { DistributorPurchaseOptionColumnIndexes, DistributorPurchaseOptionDTO, PurchaseOptionDTO } from "./purchaseOptions"
import { UnitDTO } from "./units"
import { UserDTO } from "./users"

const ENTITY_PATH = "distributors"
const WITH_PURCHASE_OPTIONS = 'with-purchase-options'

export interface DistributorDTO {
  id: number
  name: string
  purchase_options?: DistributorPurchaseOptionDTO[]
  updated_by_user?: UserDTO
  updated_at?: string
}
 
export interface InsertDistributorPurchaseOptionsFromXLSX {
  id: number
  column_indexes: DistributorPurchaseOptionColumnIndexes  
  file: File
} 

export const putDistributorWithPurchaseOptions = async (updateData: DistributorDTO): Promise<DistributorDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/update/${updateData.id}`, {
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
      message: `Не удалось обновить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}


export const uploadDistributorPurchaseOptionsSpreadsheet = async (insertData: InsertDistributorPurchaseOptionsFromXLSX): Promise<DistributorDTO | null> => {
  console.log(JSON.stringify(insertData))
  let formData = new FormData(); 
  formData.append('id', `${insertData.id}`)
  formData.append('column_indexes', JSON.stringify(insertData.column_indexes))
  formData.append('file', insertData.file)
  console.log(formData.values)
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${insertData.id}/upload-options-file`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: formData
  })

  const data = await response.json().catch(e=>console.log(e))
  if (!response.ok)
    throw {
      message: `${response.status} Не удалось обновить данные поставщика ${data?.message}: ${data?.errors[0]}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const postDistributorWithPurchaseOptions = async (createData: DistributorDTO): Promise<DistributorDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/create`, {
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
      message: `Не удалось добавить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  
  return data
}

export const getDistributors = async () : Promise<DistributorDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные поставщиков ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getDistributorsWithPurchaseOptions = async () : Promise<DistributorDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/all`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>e)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные поставщиков: ${data.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getDistributorWithPurchaseOptions = async (id: number) : Promise<DistributorDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PURCHASE_OPTIONS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
    console.log(data)
  return data
}

export const deleteDistributor = async (id: number): Promise<DistributorDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные поставщика ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}