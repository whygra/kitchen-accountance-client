import { getCookie } from "../cookies";
import { C_ACCESS_TOKEN, BASE_URL, ServerImageData } from "./constants";

const ENTITY_PATH = "projects"

export interface PermissionDTO {
  id: number
  name: string
}

export interface RoleDTO {
  id: number
  name: string
  permissions: PermissionDTO[]
}

export interface ProjectDTO {
  id: number
  name: string
  role?: RoleDTO
  logo? : ServerImageData
  backdrop? : ServerImageData
}


export const getProjects = async () : Promise<ProjectDTO[] | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/all`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные проектов ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const getProject = async (id:number) : Promise<ProjectDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${id}`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось получить данные проекта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const postProject = async (createData: ProjectDTO): Promise<ProjectDTO | null> => {
  console.log(createData)
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
      message: `Не удалось добавить данные проекта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const putProject = async (projectData: ProjectDTO): Promise<ProjectDTO | null> => {
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/update/${projectData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: JSON.stringify(projectData)
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok) 
    throw {
      message: `Не удалось обновить данные проекта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}

export const deleteProject = async (id: number): Promise<Object | null> => {
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
      message: `Не удалось удалить данные проекта ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }
  return data
}


export const uploadProjectLogo = async (id: number, file: File): Promise<ServerImageData | null> => {
  let formData = new FormData(); 
  formData.append('file', file)
  
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${id}/upload-logo`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: formData
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось загрузить изображение ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

export const uploadProjectBackdrop = async (id: number, file: File): Promise<ServerImageData | null> => {
  let formData = new FormData(); 
  formData.append('file', file)
  
  const response = await fetch(`${BASE_URL}/${ENTITY_PATH}/${id}/upload-backdrop`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
    },
    body: formData
  })
  const data = await response.json().catch(e=>null)
  if (!response.ok)
    throw {
      message: `Не удалось загрузить изображение ${data?.message}`,
      name: `${response.status} ${response.statusText}`
    }

  return data
}

