import { BrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux';
import router from './router'
import store from "./redux/store";
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import Navbar from './views/Navbar';
import { useContext, useEffect, useState } from 'react';
import { appContext } from './context/AppContextProvider';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './views/Error';
import Content from './Routes';
import Router from './Routes';
import AuthContextProvider from './context/AuthContextProvider';

function App() {
  const location = useLocation();
    return (
          <AuthContextProvider>
      <>
            <Navbar />
            <Container>
              <ErrorBoundary key={location.pathname} FallbackComponent={ErrorScreen}>
                <Router/>
              </ErrorBoundary>
            </Container>
      </>
          </AuthContextProvider>
    )
}

export default App
