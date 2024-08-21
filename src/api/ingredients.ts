import { DataAction } from "../models";
import { BASE_URL } from "./constants";
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
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные ингредиентов (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const postIngredient = async (createData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось обновить данные ингредиента (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}

export const putIngredient = async (ingredientData: IngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${ingredientData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredientData)
  })
  if (!response.ok) {
    throw new Error(`Не удалось обновить данные ингредиента (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}


export const putIngredientWithProducts = async (updateData: IngredientWithProductsDTO): Promise<IngredientWithProductsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  if (!response.ok)
    throw new Error(`Не удалось обновить данные ингредиента (${response.status}: ${response.statusText})`)
  
  const data = await response.json()
  return data
}

export const postIngredientWithProducts = async (createData: IngredientWithProductsDTO): Promise<IngredientWithProductsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok)
    throw new Error(`Не удалось добавить данные ингредиента (${response.status}: ${response.statusText})`)
  
  const data = await response.json()
  return data
}

export const getIngredientsWithProducts = async () : Promise<IngredientWithProductsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/all`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные ингредиентов (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const getIngredientWithProducts = async (id: number) : Promise<IngredientWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/${id}`)
  if(!response.ok)
    throw new Error(`Не удалось получить данные ингредиента (${response.status}: ${response.statusText})`)

  const data = await response.json()
  return data
}

export const deleteIngredient = async (id: number): Promise<IngredientWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Не удалось удалить данные ингредиента (${response.status}: ${response.statusText})`)
  }
  const data = await response.json()
  return data
}
