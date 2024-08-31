const BASE_URL = 'http://127.0.0.1:8000/api';
const C_ACCESS_TOKEN = 'access_token';
const C_IS_SIGNED_IN = 'is_signed_in';
const C_PERMISSIONS = 'permissions';

const tryParseJson = (text: string)=>{
    try{
        return JSON.parse(text)
    } catch (err:any){
        return undefined
    }
}

export {tryParseJson, BASE_URL, C_ACCESS_TOKEN, C_IS_SIGNED_IN, C_PERMISSIONS};