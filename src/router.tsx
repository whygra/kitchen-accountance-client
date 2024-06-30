import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import ComponentForm from "./components/component/ComponentForm";

const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/create-component',
        element: <ComponentForm/>
    },
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '*',
        // TODO: 404
        element: <Home/>
    }
])

export default router;
