import { GetComponentTypeDTO, GetComponentWithProductsDTO } from "./componentWithProducts"
import { ComponentDTO } from "./components"
import { BASE_URL } from "./constants"

const ENTITY_PATH = "dishes-with-components"

export interface GetComponentDTO {
  id: number
  name: string
  type: GetComponentTypeDTO
}

export interface PutDishComponentWithComponentDTO {
  data_action: string
  component_data_action: string
  id: number
  component_id: number
  component_name: string
  component_type_id: number
  waste_percentage: number
  component_raw_weight: number
}

export interface PostDishComponentWithComponentDTO {
  component_data_action: string
  component_id: number
  component_name: string
  component_type_id: number
  waste_percentage: number
  component_raw_weight: number
}

export interface GetDishComponentDTO {
  id: number
  component: GetComponentWithProductsDTO
  waste_percentage: number
  component_raw_weight: number
}

export interface PutDishWithComponentsDTO {
  id: number
  name: string
  dishes_components: PutDishComponentWithComponentDTO[]
}

export interface PostDishWithComponentsDTO {
  name: string
  dishes_components: PostDishComponentWithComponentDTO[]
}

export interface GetDishWithComponentsDTO {
  id: number
  name: string
  dishes_components: GetDishComponentDTO[]
}

export const putDishWithComponents = async (updateData: PutDishWithComponentsDTO): Promise<GetDishWithComponentsDTO | null> => {
  console.log(updateData)
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/update/${updateData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  if (!response.ok)
    throw new Error('Не удалось обновить блюдо')
  
  const data = await response.json()
  return data
}

export const postDishWithComponents = async (createData: PostDishWithComponentsDTO): Promise<GetDishWithComponentsDTO | null> => {
  console.log(createData);
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createData)
  })
  if (!response.ok)
    throw new Error('Не удалось создать блюдо')
  
  const data = await response.json()
  return data
}

export const getDishesWithComponents = async () : Promise<GetDishWithComponentsDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюдах')

  const data = await response.json()
  return data
}

export const getDishWithComponents = async (id: number) : Promise<GetDishWithComponentsDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${id}`)
  if(!response.ok)
    throw new Error('Не удалось получить данные о блюде')

  const data = await response.json()
  return data
}