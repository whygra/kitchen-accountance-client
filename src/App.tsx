import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import router from './router'
import store from "./redux/store";
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import Navbar from './views/Navbar';
import { useState } from 'react';
import AppContextProvider from './context/AppContextProvider';

function App() {

  return (
    <>
        <Navbar />
        <Container>
          <AppContextProvider>
            <RouterProvider router={router}/>
          </AppContextProvider>
        </Container>
    </>
  )
}

export default App
