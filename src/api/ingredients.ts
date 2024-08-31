import { getCookie } from "../cookies";
import { DataAction } from "../models";
import { C_ACCESS_TOKEN, BASE_URL } from "./constants";
import { IngredientCategoryDTO } from "./ingredientCategories";
import { IngredientProductDTO, IngredientProductWithPurchaseOptionsDTO, ProductDTO, ProductWithPurchaseOptionsDTO } from "./products";
import { ProductPurchaseOption } from "./purchaseOptions";

const ENTITY_PATH = "ingredients"
const WITH_PRODUCTS = "with-products"

export interface IngredientDTO {
  id: number
  name: string
  item_weight: number
  category: IngredientCategoryDTO
  is_item_measured: boolean
  type: IngredientTypeDTO
}

export interface IngredientWithProductsDTO {
  id: number
  name: string
  item_weight: number
  type: IngredientTypeDTO
  category: IngredientCategoryDTO
  is_item_measured: boolean
  products: IngredientProductDTO[]
}

export interface IngredientTypeDTO {
  id: number
  name: string
}

export interface DishIngredientDTO {
  id: number
  name: string
  item_weight: number
  type: IngredientTypeDTO
  category: IngredientCategoryDTO
  is_item_measured: boolean
  waste_percentage: number
  ingredient_amount: number
}

export interface DishIngredientWithPurchaseOptionsDTO {
  id: number
  name: string
  item_weight: number
  type: IngredientTypeDTO
  category: IngredientCategoryDTO
  is_item_measured: boolean
  products: IngredientProductWithPurchaseOptionsDTO[]
  waste_percentage: number
  ingredient_amount: number
}

export const getIngredients = async () : Promise<IngredientDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postIngredient = async (createData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(createData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putIngredient = async (ingredientData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${ingredientData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(ingredientData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}


export const putIngredientWithProducts = async (updateData: IngredientWithProductsDTO): Promise<IngredientWithProductsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(updateData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postIngredientWithProducts = async (createData: IngredientWithProductsDTO): Promise<IngredientWithProductsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(createData)
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось добавить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getIngredientsWithProducts = async () : Promise<IngredientWithProductsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/all`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные ингредиентов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getIngredientWithProducts = async (id: number) : Promise<IngredientWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteIngredient = async (id: number): Promise<IngredientWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json()
  if (!response.ok) 
    throw {
      message: `Не удалось удалить данные ингредиента ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}
