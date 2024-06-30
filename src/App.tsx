import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css'
import router from './router'
import store from "./redux/store";

function App() {

  return (
    <>
      App
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App
