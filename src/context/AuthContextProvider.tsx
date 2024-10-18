import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react';
import { getCurrent, UserDTO, UserPermissionDTO } from '../api/users';
import { getCookie, setCookie } from '../cookies';
import { C_ACCESS_TOKEN, C_IS_SIGNED_IN, C_PERMISSIONS, parseJsonOrNull } from '../api/constants';
import { UserPermissions } from '../models';


  interface AuthContext {
    user: UserDTO|null
    updateUserData: ()=>void,
    hasPermission: (permission:UserPermissions)=>boolean,
  }
  
  export const authContext = createContext<AuthContext>({
    user: null,
    updateUserData: ()=>{},
    hasPermission: (permission:UserPermissions)=>false
  });

interface AuthContextProviderProps {
    children: ReactElement
}

function AuthContextProvider({children}:AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO|null>(null)
  const [permissions, setPermissions] = useState<UserPermissionDTO[]>(parseJsonOrNull(getCookie(C_PERMISSIONS))??[])

  useEffect(()=>{
    updateUserData()
  }, [])

  async function updateUserData(){

    const res = await getCurrent().catch(
      e=>null
    )
    setUser(res)
    setPermissions(parseJsonOrNull(getCookie(C_PERMISSIONS))??[])
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
            updateUserData:updateUserData,
            hasPermission:hasPermission,
          }}
          >
            {children}
      </authContext.Provider>
    </>
  )
}

export default AuthContextProvider
