import { BASE_URL } from "./constants";

const ENTITY_PATH = 'component-products'

export interface ComponentProductDTO {
  id: number
  product_id : number
  component_id : number
  content_percentage : number
  waste_percentage : number
}

export interface CreateComponentProductDTO {
  product_id : number
  component_id : number
  content_percentage : number
  waste_percentage : number
}

export const getComponentProducts = async () : Promise<ComponentProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о компонент-продуктах')

  const data = await response.json()
  return data
}

export const postComponentProduct = async (createData: CreateComponentProductDTO): Promise<ComponentProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать компонент-продукт')
  }
  const data = await response.json()
  return data
}

export const deleteComponentProduct = async (id: number): Promise<ComponentProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить компонент-продукт')
  }
  const data = await response.json()
  return data
}

