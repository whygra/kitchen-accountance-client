import { BASE_URL } from "./constants";

const ENTITY_PATH = "product-categories"

export interface ProductCategoryDTO {
  id: number
  name: string
}

export const getProductCategories = async () : Promise<ProductCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные категорий продуктов (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const postProductCategory = async (createData: ProductCategoryDTO): Promise<ProductCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось получить данные категории продуктов (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

export const putProductCategory = async (productСategoryData: ProductCategoryDTO): Promise<ProductCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${productСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productСategoryData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось обновить данные категории продуктов (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}



export const deleteProductCategory = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные категории продуктов (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

