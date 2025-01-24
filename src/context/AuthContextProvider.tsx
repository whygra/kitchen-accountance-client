import {  useNavigate } from 'react-router-dom'
import 'bootstrap';
import 'react-bootstrap';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { SignUpData, UserDTO } from '../api/users';
import { C_ACCESS_TOKEN, C_USER_DATA, getCookie, setCookie } from '../cookies';
import { parseJsonOrNull } from '../api/constants';
import { appContext } from './AppContextProvider';
import { getCurrent, signIn, signOut, signUp } from '../api/auth';


  interface AuthContext {
    user: UserDTO|null
    isSignedIn: ()=>boolean
    logout: ()=>Promise<void>
    login: (user:UserDTO)=>Promise<void>
    signup: (data:SignUpData)=>Promise<void>
    updateUserData: ()=>void,
  }
  
  export const authContext = createContext<AuthContext>({
    user: null,
    isSignedIn: ()=>false,
    logout: async ()=>{},
    signup: async (data:SignUpData)=>{},
    login: async (user:UserDTO)=>{},
    updateUserData: ()=>{},
  });

interface AuthContextProviderProps {
    children: ReactElement
}

function AuthContextProvider({children}:AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO|null>(parseUserDataCookie())

  const {showModal} = useContext(appContext)
  
  const navigate = useNavigate()

  useEffect(()=>{
    updateUserData()
    // setUser(parseUserDataCookie())
  }, [])

  function parseUserDataCookie(): UserDTO|null {
    return parseJsonOrNull(getCookie(C_USER_DATA))
  }

  function isSignedIn(): boolean {
    return getCookie(C_ACCESS_TOKEN) != ''
  }

  function setUserDataCookies(user:UserDTO|null) {
    setCookie(C_USER_DATA, user?JSON.stringify(user):'', user?300:0)
  } 

  async function logout() {
    if(!isSignedIn()) return
    await signOut()
    await updateUserData()
    navigate('/home')
  }

  async function login(data: UserDTO) {
    const res = await signIn(data)
    await updateUserData()
    navigate('/home')
  }

  async function signup(data:SignUpData){
    if(data.password.localeCompare(data.cPassword)!=0)
      throw new Error('Пароли не совпадают')
    const res = await signUp({
      id:0,
      name:data.name,
      email:data.email,
      password:data.password,
    })
    
    navigate('/')
    showModal(<>{res?.message}</>)
  }
  
  async function updateUserData(){

    // переменная с результатом
    var res: UserDTO|null = null
    
    try{
      // если есть id - отправить api запрос
      if (isSignedIn()) res = await getCurrent()
    } catch(e:any){
      setCookie(C_ACCESS_TOKEN, '', 0)
      // обработка-выброс исключения
      throw e
    } finally {
      // записать|очистить данные
      setUser(res)
      setUserDataCookies(res)
    }
    
  }

  return (
      <authContext.Provider
          value={{
            isSignedIn: isSignedIn,
            signup: signup,
            logout: logout,
            login: login,
            user: user,
            updateUserData:updateUserData,
          }}
          >
            {children}
      </authContext.Provider>
  )
}

export default AuthContextProvider
