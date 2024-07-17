import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import ComponentForm from "./components/component/form/ComponentForm";
import ComponentList from "./components/component/list/ComponentList";
import NotFound from "./components/NotFound";
import ComponentFormController from "./controllers/ComponentFormController";
import { SubmitActionType } from "./models";
import ComponentDetails from "./components/component/details/ComponentDetails";

const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/components/create',
        element: <ComponentFormController action={SubmitActionType.Create}/>
    },
    {
        path: '/components/edit/:id',
        element: <ComponentFormController action={SubmitActionType.Update}/>
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
