import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import IngredientForm from "./views/ingredient/form/IngredientForm";
import IngredientList from "./views/ingredient/list/IngredientList";
import NotFound from "./views/NotFound";
import { DataAction } from "./models";
import IngredientDetails from "./views/ingredient/details/IngredientDetails";
import DishDetails from "./views/dish/details/DishDetails";
import DishList from "./views/dish/list/DishList";
import DistributorDetails from "./views/distributor/details/DistributorDetails";
import DistributorList from "./views/distributor/list/DistributorList";
import IngredientFormContextProvider from "./context/forms/nomenclature/ingredient/IngredientFormContext";
import DishFormContextProvider from "./context/forms/nomenclature/dish/DishFormContext";
import DishForm from "./views/dish/form/DishForm";
import DistributorFormContextProvider from "./context/forms/nomenclature/distributor/DistributorFormContext";
import DistributorForm from "./views/distributor/form/DistributorForm";
import SignUp from "./views/auth/SignUp";
import SignIn from "./views/auth/SignIn";

const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/ingredients/create',
        element: 
            <IngredientFormContextProvider action={DataAction.Create}>
                <IngredientForm/>
            </IngredientFormContextProvider>
    },
    {
        path: '/ingredients/create/copy/:id',
        element: 
            <IngredientFormContextProvider action={DataAction.Create}>
                <IngredientForm/>
            </IngredientFormContextProvider>
    },
    {
        path: '/ingredients/edit/:id',
        element: 
            <IngredientFormContextProvider action={DataAction.Update}>
                <IngredientForm/>
            </IngredientFormContextProvider>
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
        path: '/dishes/create/copy/:id',
        element: 
            <DishFormContextProvider action={DataAction.Create}>
                <DishForm/>
            </DishFormContextProvider>
    },
    {
        path: '/dishes/create',
        element: 
            <DishFormContextProvider action={DataAction.Create}>
                <DishForm/>
            </DishFormContextProvider>
    },
    {
        path: '/dishes/edit/:id',
        element: 
            <DishFormContextProvider action={DataAction.Update}>
                <DishForm/>
            </DishFormContextProvider>
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
        path: '/distributors/create',
        element: 
            <DistributorFormContextProvider action={DataAction.Create}>
                <DistributorForm/>
            </DistributorFormContextProvider>
    },
    {
        path: '/distributors/create/copy/:id',
        element: 
            <DistributorFormContextProvider action={DataAction.Create}>
                <DistributorForm/>
            </DistributorFormContextProvider>
    },
    {
        path: '/distributors/edit/:id',
        element: 
            <DistributorFormContextProvider action={DataAction.Update}>
                <DistributorForm/>
            </DistributorFormContextProvider>
    },
    {
        path: '/distributors/details/:id',
        element: <DistributorDetails/>
    },
    {
        path: '/distributors/all',
        element: <DistributorList/>
    },
    {
        path: '/signin',
        element: <SignIn/>
    },
    {
        path: '/signup',
        element: <SignUp/>
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
