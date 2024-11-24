import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL, C_SELECTED_PROJECT_ID, PROJECT_PATH } from "./constants";
import { ProductDTO } from "./products";

const ENTITY_PATH = "product-groups"
const WITH_PRODUCTS = "with-products"

export interface ProductGroupDTO {
  id: number
  name: string
  products?: ProductDTO[]
}

export const getProductGroups = async () : Promise<ProductGroupDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные категорий ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getProductGroupsWithProducts = async () : Promise<ProductGroupDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PRODUCTS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные категорий ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getProductGroupWithProducts = async (id: number) : Promise<ProductGroupDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PRODUCTS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },

  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postProductGroup = async (createData: ProductGroupDTO): Promise<ProductGroupDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      createData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postProductGroupWithProducts = async (createData: ProductGroupDTO): Promise<ProductGroupDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PRODUCTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      createData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putProductGroup = async (productСategoryData: ProductGroupDTO): Promise<ProductGroupDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/update/${productСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...productСategoryData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putProductGroupWithProducts = async (productСategoryData: ProductGroupDTO): Promise<ProductGroupDTO | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PRODUCTS}/update/${productСategoryData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify({
      ...productСategoryData,
    })
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteProductGroup = async (id: number): Promise<Object | null> => {
  const response = await fetch(`${BASE_URL}/${PROJECT_PATH}/${parseInt(getCookie(C_SELECTED_PROJECT_ID))}/${ENTITY_PATH}/${WITH_PRODUCTS}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось удалить данные категории ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
