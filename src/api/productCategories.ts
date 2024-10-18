import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL } from "./constants";
import { ProductDTO } from "./products";

const ENTITY_PATH = "product-categories"

export interface ProductCategoryDTO {
  id: number
  name: string
  products?: ProductDTO[]
}

export const getProductCategories = async () : Promise<ProductCategoryDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные категорий продуктов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postProductCategory = async (createData: ProductCategoryDTO): Promise<ProductCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(createData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные категории продуктов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putProductCategory = async (productСategoryData: ProductCategoryDTO): Promise<ProductCategoryDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/put/${productСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(productСategoryData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные категории продуктов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}



export const deleteProductCategory = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные категории продуктов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

