import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import ComponentForm from "./components/component/form/ComponentForm";
import ComponentList from "./components/component/list/ComponentList";
import NotFound from "./components/NotFound";
import ComponentFormController from "./controllers/ComponentFormController";
import { DataAction } from "./models";
import ComponentDetails from "./components/component/details/ComponentDetails";
import DishFormController from "./controllers/DishFormController";
import DishDetails from "./components/dish/details/DishDetails";
import DishList from "./components/dish/list/DishList";

const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/components/create',
        element: <ComponentFormController action={DataAction.Create}/>
    },
    {
        path: '/components/edit/:id',
        element: <ComponentFormController action={DataAction.Update}/>
    },
    {
        path: '/components/details/:id',
        element: <ComponentDetails/>
    },
    {
        path: '/components/all',
        element: <ComponentList/>
    },
    {
        path: '/dishes/create',
        element: <DishFormController action={DataAction.Create}/>
    },
    {
        path: '/dishes/edit/:id',
        element: <DishFormController action={DataAction.Update}/>
    },
    {
        path: '/dishes/details/:id',
        element: <DishDetails/>
    },
    {
        path: '/dishes/all',
        element: <DishList/>
    },
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '*',
        // TODO: 404
        element: <NotFound/>
    }
])

export default router;
