import { BrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import 'react-bootstrap';
import './App.css';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { ErrorFallbackScreen } from './views/ErrorFallbackScreen';
import AppRoutes from './routes';
import AuthContextProvider from './context/AuthContextProvider';
import Navbar from './views/navbar/Navbar';
import ProjectContextProvider from './context/ProjectContextProvider';
import { HotkeysProvider } from 'react-hotkeys-hook';

function App() {
  const location = useLocation();
    return (
      <AuthContextProvider>
        <ProjectContextProvider>
          <HotkeysProvider initiallyActiveScopes={['settings']}>
          <div className='fixed-top h-100 d-flex flex-column flex-md-row'>
            <div className='h-md-100 flex-shrink-1'>
              <Navbar/>
            </div>
            <div className='flex-grow-1 w-100 overflow-y-scroll'>
              <Container className='pt-3 p-md-5'>
                <ErrorBoundary key={location.pathname} FallbackComponent={ErrorFallbackScreen}>
                  <AppRoutes/>
                </ErrorBoundary>
              </Container>
            </div>
          </div>
          </HotkeysProvider>
        </ProjectContextProvider>
      </AuthContextProvider>
    )
}


export default App
