import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import router from './router'
import store from "./redux/store";
import 'bootstrap';
import 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';

function App() {

  return (
    <><Navbar />
    <Container>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Container></>
  )
}

export default App
