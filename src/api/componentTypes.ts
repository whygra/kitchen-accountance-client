import { BASE_URL } from "./constants";

const ENTITY_PATH = "component-types"

export interface ComponentTypeDTO {
  id: number
  name: string
}

export interface CreateComponentTypeDTO {
  name: string
}

export const getComponentTypes = async () : Promise<ComponentTypeDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о типах компонентов')

  const data = await response.json()
  return data
}

export const postComponentType = async (createData: CreateComponentTypeDTO): Promise<ComponentTypeDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать тип компонента')
  }
  const data = await response.json()
  return data
}

