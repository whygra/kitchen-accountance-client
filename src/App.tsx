import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import router from './router'
import store from "./redux/store";
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import Navbar from './views/Navbar';
import { useState } from 'react';
import { appContext } from './context';

function App() {
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
    <><Navbar />
    <Container>
      <appContext.Provider
        value={{
          showModal: displayModal,
          hideModal: hideModal,
        }}
      >
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        {component}
        </Modal>
        <RouterProvider router={router} />
      </appContext.Provider>
    </Container></>
  )
}

export default App
