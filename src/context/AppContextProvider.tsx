import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useState } from 'react';


  // контекст приложения
  interface AppContext {
    // отображение модального элемента с требуемым содержанием
    showModal: (component: JSX.Element)=>void
    hideModal: ()=>void
    // отображение оповещений

    // 
  }
  
  export const appContext = createContext<AppContext>({
    showModal: (component: JSX.Element)=>{},
    hideModal: ()=>{},
  });

interface AppContextProviderProps {
    children: ReactElement
}

function AppContextProvider({children}:AppContextProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [component, setComponent] = useState(<></>);

  const hideModal = () => {
    setComponent(<></>)
    setShowModal(false);
  }
  const displayModal = (component:JSX.Element) => {
    setComponent(component)
    setShowModal(true);
  }

  return (
    <>
      <appContext.Provider
          value={{
            showModal: displayModal,
            hideModal: hideModal,
          }}
          >
            {children}
          <Modal show={showModal} onHide={hideModal}>
          <Modal.Header closeButton>
          </Modal.Header>
          {component}
          </Modal>
      </appContext.Provider>
    </>
  )
}

export default AppContextProvider
