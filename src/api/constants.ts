export const BASE_URL = 'http://127.0.0.1:8000/api';
export const C_ACCESS_TOKEN = 'access_token';
export const C_IS_SIGNED_IN = 'is_signed_in';
export const C_PERMISSIONS = 'permissions';

export const parseJsonOrNull = (text: string)=>{
    try{
        return JSON.parse(text)
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