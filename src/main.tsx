import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContextProvider from './context/AppContextProvider';
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppContextProvider>
        <App />
    </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

