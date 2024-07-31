import { BASE_URL } from "./constants";

const ENTITY_PATH = 'ingredient-products'

export interface IngredientsProductDTO {
  id: number
  product_id : number
  ingredient_id : number
  raw_content_percentage : number
  waste_percentage : number
}

export interface CreateIngredientsProductDTO {
  product_id : number
  ingredient_id : number
  raw_content_percentage : number
  waste_percentage : number
}

export const getIngredientsProducts = async () : Promise<IngredientsProductDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о ингредиент-продуктах')

  const data = await response.json()
  return data
}

export const postIngredientsProduct = async (createData: CreateIngredientsProductDTO): Promise<IngredientsProductDTO | null> => {
  console.log(createData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok) {
    throw new Error('Не удалось создать ингредиент-продукт')
  }
  const data = await response.json()
  return data
}

export const deleteIngredientsProduct = async (id: number): Promise<IngredientsProductDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Не удалось удалить ингредиент-продукт')
  }
  const data = await response.json()
  return data
}

