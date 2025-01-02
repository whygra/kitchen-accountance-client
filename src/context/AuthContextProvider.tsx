import { RouterProvider, useLocation, useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { UserDTO } from '../api/users';
import { getCookie, setCookie } from '../cookies';
import { C_ACCESS_TOKEN, C_IS_SIGNED_IN, parseJsonOrNull } from '../api/constants';
import { UserPermissions } from '../models';
import { appContext } from './AppContextProvider';
import { EmailVerificationRequired } from '../views/EmailVerificationRequired';
import { getCurrent } from '../api/auth';


  interface AuthContext {
    user: UserDTO|null
    updateUserData: ()=>void,
  }
  
  export const authContext = createContext<AuthContext>({
    user: null,
    updateUserData: ()=>{},
  });

interface AuthContextProviderProps {
    children: ReactElement
}

function AuthContextProvider({children}:AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO|null>(null)

  const {showModal} = useContext(appContext)
  
  const location = useLocation()
  useEffect(()=>{
    if(user && (user.email_verified_at??'')=='')
      showModal(<EmailVerificationRequired/>)
  }, [])
  
  useEffect(()=>{
    updateUserData()
  }, [location])

  async function updateUserData(){

    if(getCookie(C_ACCESS_TOKEN)==''||getCookie(C_IS_SIGNED_IN)=='')
      return
    
    const res = await getCurrent().catch(
      e=>showModal(<div>{e.message}</div>, <b>{e.name}</b>)
    ) ?? null

    setUser(res)

    setCookie(C_IS_SIGNED_IN, res==null?'':'true', res==null?0:1)

    // if(res && (res.email_verified_at??'')=='')
    //   showModal(<EmailVerificationRequired/>)
  }

  return (
    <>
      <authContext.Provider
          value={{
            user: user,
            updateUserData:updateUserData,
          }}
          >
            {children}
      </authContext.Provider>
    </>
  )
}

export default AuthContextProvider
