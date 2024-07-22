import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import IngredientForm from "./views/ingredient/form/IngredientForm";
import IngredientList from "./views/ingredient/list/IngredientList";
import NotFound from "./views/NotFound";
import IngredientFormController from "./controllers/IngredientFormController";
import { DataAction } from "./models";
import IngredientDetails from "./views/ingredient/details/IngredientDetails";
import DishFormController from "./controllers/DishFormController";
import DishDetails from "./views/dish/details/DishDetails";
import DishList from "./views/dish/list/DishList";

const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/ingredients/create',
        element: <IngredientFormController action={DataAction.Create}/>
    },
    {
        path: '/ingredients/edit/:id',
        element: <IngredientFormController action={DataAction.Update}/>
    },
    {
        path: '/ingredients/details/:id',
        element: <IngredientDetails/>
    },
    {
        path: '/ingredients/all',
        element: <IngredientList/>
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
