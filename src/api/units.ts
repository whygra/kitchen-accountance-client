import { BASE_URL } from "./constants";

const ENTITY_PATH = "units"

export interface UnitDTO {
  id: number
  long: string
  short: string
}

export interface PostUnitDTO {
  long: string
  short: string
}

export const getUnits = async () : Promise<UnitDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о продуктах')

  const data = await response.json()
  return data
}

export const postUnit = async (createData: PostUnitDTO): Promise<UnitDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать продукт')
  }
  const data = await response.json()
  return data
}

export const putUnit = async (unitData: UnitDTO): Promise<UnitDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${unitData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(unitData)
  })
  if (!response.ok) {
    throw new Error('Не удалось обновить продукт')
  }
  const data = await response.json()
  return data
}



export const deleteUnit = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить продукт')
  }
  const data = await response.json()
  return data
}

