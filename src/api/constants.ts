export const BASE_URL = 'http://127.0.0.1:8000/api';
export const PROJECT_PATH = 'project';
export const C_ACCESS_TOKEN = 'access_token';
export const C_IS_SIGNED_IN = 'is_signed_in';
export const C_SELECTED_PROJECT_ID = 'selected_project_id';
export const C_PROJECT_PERMISSIONS = 'project_permissions';

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