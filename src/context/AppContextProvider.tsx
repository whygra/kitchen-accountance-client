import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react';
import { UserDTO } from '../api/users';
import { getCookie, setCookie } from '../cookies';


  // контекст приложения
  interface AppContext {
    // отображение модального элемента с требуемым содержанием
    showModal: (component: ReactElement, title?: ReactElement)=>void
    showErrorModal: (e: Error|any)=>void
    hideModal: ()=>void
    // TODO: отображение оповещений

    // 
  }
  
  export const appContext = createContext<AppContext>({
    showModal: (component: ReactElement, title?: ReactElement)=>{},
    showErrorModal: (e: Error|any)=>{},
    hideModal: ()=>{},
  });

interface AppContextProviderProps {
    children: ReactElement
}

function AppContextProvider({children}:AppContextProviderProps) {
  const [showModal, setShowModal] = useState(false)
  const [component, setComponent] = useState(<></>)
  const [title, setTitle] = useState(<></>)


  const hideModal = () => {
    setComponent(<></>)
    setShowModal(false);
  }
  const displayModal = (component:ReactElement, title?: ReactElement) => {
    setTitle(title??<></>)
    setComponent(component)
    setShowModal(true);
  }
  const showErrorModal = (e: Error|any) => {
    const errors = e?.errors
      ? Object.keys(e?.errors).map((key) => {return {key:key, value:e?.errors[key]}})
      : []

    setTitle(<h4>{e?.status}. {e?.name}</h4>)
    setComponent(
      <Container>
        <h5>{e?.message}</h5>
        <ul>
          {errors?.map((e)=>{return(<li>{e.key} - {e.value}</li>)})}
        </ul>
      </Container>
    )
    
    setShowModal(true);
  }

  return (
    <>
      <appContext.Provider
        value={{
          showErrorModal: showErrorModal,
          showModal: displayModal,
          hideModal: hideModal,
        }}
        >
          {children}
        <Modal size='xl' show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          {title}
        </Modal.Header>
        {component}
        </Modal>
      </appContext.Provider>
    </>
  )
}

export default AppContextProvider
