import { BASE_URL } from "./constants";

const ENTITY_PATH = "components"

export interface ComponentDTO {
  id: number
  name: string
  type_id: number
}

export interface CreateComponentDTO {
  name: string
  type_id: number
}

export const getComponents = async () : Promise<ComponentDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о компонентах')

  const data = await response.json()
  return data
}

export const postComponent = async (createData: CreateComponentDTO): Promise<ComponentDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}}/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать компонент')
  }
  const data = await response.json()
  return data
}

export const putComponent = async (componentData: ComponentDTO): Promise<ComponentDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}}/${componentData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(componentData)
  })
  if (!response.ok) {
    throw new Error('Не удалось обновить компонент')
  }
  const data = await response.json()
  return data
}

