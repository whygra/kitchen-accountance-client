import { RouterProvider, useLocation, useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { UserDTO } from '../api/users';
import { C_ACCESS_TOKEN, C_IS_SIGNED_IN, C_PROJECT_DATA, C_SELECTED_PROJECT_ID, C_USER_DATA, getCookie, setCookie } from '../cookies';
import { parseJsonOrNull } from '../api/constants';
import { UserPermissions } from '../models';
import { appContext } from './AppContextProvider';
import { EmailVerificationRequired } from '../views/EmailVerificationRequired';
import { getCurrent, signOut } from '../api/auth';


  interface AuthContext {
    user: UserDTO|null
    logout: ()=>Promise<void>
    updateUserData: ()=>void,
  }
  
  export const authContext = createContext<AuthContext>({
    user: null,
    logout: async ()=>{},
    updateUserData: ()=>{},
  });

interface AuthContextProviderProps {
    children: ReactElement
}

function AuthContextProvider({children}:AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO|null>(parseJsonOrNull(getCookie(C_USER_DATA)))

  const {showModal, hideModal} = useContext(appContext)
  
  const navigate = useNavigate()

  useEffect(()=>{
    setUser(parseJsonOrNull(getCookie(C_USER_DATA)))
  }, [])

  async function logout() {
      await signOut()
      .catch(e=>{
        showModal(<div className='p-2'>{e.message}</div>, <b>{e.name}</b>)
      })

      setCookie(C_ACCESS_TOKEN, '', 0)
      setCookie(C_IS_SIGNED_IN, '', 0)
      setCookie(C_USER_DATA, '', 0)

      await updateUserData()
      hideModal()
      navigate('/home')
  }
  
  async function updateUserData(){
    if(getCookie(C_ACCESS_TOKEN)==''){
      setUser(null)
      return
    }
    
    const res = await getCurrent().catch(
      e=>showModal(<div>{e.message}</div>, <b>{e.name}</b>)
    ).then(res=>res??null)

    setUser(res)
    setCookie(C_IS_SIGNED_IN, res?'true':'', res?300:0)
    setCookie(C_USER_DATA, res?JSON.stringify(res):'', res?10:0)
  }

  return (
    <>
      <authContext.Provider
          value={{
            logout: logout,
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
