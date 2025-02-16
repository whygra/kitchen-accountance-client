import { C_IS_SIGNED_IN, getCookie } from "../cookies";

export const BASE_URL = 'https://www.kitchen-accountance.ru/api';
// export const BASE_URL = 'http://127.0.0.1:8000/api';
export const PROJECT_PATH = 'project';

export const getProjectPath = () => {
    const isSignedIn = getCookie(C_IS_SIGNED_IN) != ''
    return `${isSignedIn ? '' : 'public/'}${PROJECT_PATH}`
}

export const parseJsonOrNull = (text: string)=>{
    try{
        const json = JSON.parse(text)
        return json == '' ? null : json 
    } catch (err:any){
        return null
    }
}

export interface NamedEntity {
    id: number
    name: string
}

export interface ServerImageData {
    name: string
    url: string
}