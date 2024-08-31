import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react';
import { getCurrent, UserDTO, UserPermissionDTO } from '../api/users';
import { getCookie, setCookie } from '../cookies';
import { C_ACCESS_TOKEN, C_IS_SIGNED_IN, C_PERMISSIONS, tryParseJson } from '../api/constants';
import { UserPermissions } from '../models';


  interface AuthContext {
    user: UserDTO|null
    loadUserData: ()=>void,
    hasPermission: (permission:UserPermissions)=>boolean,
  }
  
  export const authContext = createContext<AuthContext>({
    user: null,
    loadUserData: ()=>{},
    hasPermission: (permission:UserPermissions)=>false
  });

interface AuthContextProviderProps {
    children: ReactElement
}

function AuthContextProvider({children}:AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO|null>(null)
  const permissions : UserPermissionDTO[] = tryParseJson(getCookie(C_PERMISSIONS))??[]

  useEffect(()=>{
    if(getCookie(C_IS_SIGNED_IN)=='true')
      loadUserData()
  }, [])

  async function loadUserData(){
    const res = await getCurrent().catch(
      e=>null
    )
    setUser(res)
    setCookie(C_PERMISSIONS, JSON.stringify(res?.permissions??[]), 300)
  }

  const hasPermission = (permission:UserPermissions) =>
    permissions?.find(
      p=>p.name==permission.valueOf()
    ) != undefined

  return (
    <>
      <authContext.Provider
          value={{
            user: user,
            loadUserData:loadUserData,
            hasPermission:hasPermission,
          }}
          >
            {children}
      </authContext.Provider>
    </>
  )
}

export default AuthContextProvider
