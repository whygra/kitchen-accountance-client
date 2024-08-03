import { BASE_URL } from "./constants";
import { ProductDTO, ProductWithPurchaseOptionsDTO } from "./products";

const ENTITY_PATH = "ingredients"
const WITH_PRODUCTS = "with-products"

export interface IngredientDTO {
  id: number
  name: string
  type_id: number
}

export interface PostIngredientDTO {
  name: string
  type_id: number
}

export interface PutIngredientProductWithProductDTO {
  data_action: string
  product_data_action: string
  id: number
  product: ProductDTO
  waste_percentage: number
  raw_content_percentage: number
}

export interface PostIngredientProductWithProductDTO {
  product_data_action: string
  product: ProductDTO
  waste_percentage: number
  raw_content_percentage: number
}

export interface GetIngredientTypeDTO {
  id: number
  name: string
}

export interface GetIngredientProductDTO {
  id: number
  product: ProductDTO
  waste_percentage: number
  raw_content_percentage: number
}

export interface GetIngredientProductWithPurchaseOptionsDTO {
  id: number
  product: ProductWithPurchaseOptionsDTO
  waste_percentage: number
  raw_content_percentage: number
}

export interface PutIngredientWithProductsDTO {
  id: number
  name: string
  type_id: number
  ingredients_products: PutIngredientProductWithProductDTO[]
}

export interface PostIngredientWithProductsDTO {
  name: string
  type_id: number
  ingredients_products: PostIngredientProductWithProductDTO[]
}

export interface GetIngredientWithProductsDTO {
  id: number
  name: string
  type: GetIngredientTypeDTO
  ingredients_products: GetIngredientProductDTO[]
  deletion_allowed: boolean
}

export interface GetIngredientWithPurchaseOptionsDTO {
  id: number
  name: string
  type: GetIngredientTypeDTO
  ingredients_products: GetIngredientProductWithPurchaseOptionsDTO[]
  deletion_allowed: boolean
}

export const getIngredients = async () : Promise<IngredientDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о ингредиентах')

  const data = await response.json()
  return data
}

export const postIngredient = async (createData: PostIngredientDTO): Promise<IngredientDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать ингредиент')
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
    throw new Error('Не удалось обновить ингредиент')
  }
  const data = await response.json()
  return data
}


export const putIngredientWithProducts = async (updateData: PutIngredientWithProductsDTO): Promise<GetIngredientWithProductsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  if (!response.ok)
    throw new Error('Не удалось обновить ингредиент')
  
  const data = await response.json()
  return data
}

export const postIngredientWithProducts = async (createData: PostIngredientWithProductsDTO): Promise<GetIngredientWithProductsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok)
    throw new Error('Не удалось создать ингредиент')
  
  const data = await response.json()
  return data
}

export const getIngredientsWithProducts = async () : Promise<GetIngredientWithProductsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о ингредиентах')

  const data = await response.json()
  return data
}

export const getIngredientWithProducts = async (id: number) : Promise<GetIngredientWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${WITH_PRODUCTS}/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные об ингредиенте')

  const data = await response.json()
  return data
}

export const deleteIngredient = async (id: number): Promise<GetIngredientWithProductsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить ингредиент')
  }
  const data = await response.json()
  return data
}
