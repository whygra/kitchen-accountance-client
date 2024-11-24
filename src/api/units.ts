import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL, C_SELECTED_PROJECT_ID, PROJECT_PATH } from "./constants";

const ENTITY_PATH = "units"

export interface UnitDTO {
  id: number
  long: string
  short: string
}

export const getUnits = async () : Promise<UnitDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/all`,{
    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные единицы измерения ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postUnit = async (createData: UnitDTO): Promise<UnitDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/create`, {
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
      message: `Не удалось добавить данные единицы измерения ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putUnit = async (unitData: UnitDTO): Promise<UnitDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/update/${unitData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...unitData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные единицы измерения ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteUnit = async (id: number): Promise<Object | null> => {
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
      message: `Не удалось удалить данные единицы измерения ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

