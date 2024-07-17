import { BASE_URL } from "./constants";

const ENTITY_PATH = 'component-products'

export interface ComponentsProductDTO {
  id: number
  product_id : number
  component_id : number
  raw_content_percentage : number
  waste_percentage : number
}

export interface CreateComponentsProductDTO {
  product_id : number
  component_id : number
  raw_content_percentage : number
  waste_percentage : number
}

export const getComponentsProducts = async () : Promise<ComponentsProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о компонент-продуктах')

  const data = await response.json()
  return data
}

export const postComponentsProduct = async (createData: CreateComponentsProductDTO): Promise<ComponentsProductDTO | null> => {
  console.log(createData)
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

export const deleteComponentsProduct = async (id: number): Promise<ComponentsProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить компонент-продукт')
  }
  const data = await response.json()
  return data
}

