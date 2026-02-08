import { Route } from "react-router-dom";
import DishTagFormContextProvider from "../context/forms/nomenclature/dish/DishTagFormContext";
import DishTagForm from "../views/dishTag/form/DishTagForm";
import DishTagDetails from "../views/dishTag/details/DishTagDetails";
import DishTagList from "../views/dishTag/list/DishTagList";
import { DataAction } from "../models";

function useDishTagRoutes() {
    return (
        <Route path="/dish-tags">
            <Route
            path={'create/copy/:id'}
            element={<DishTagFormContextProvider action={DataAction.Create}>
                <DishTagForm />
            </DishTagFormContextProvider>} />
            <Route
                path={'create'}
                element={<DishTagFormContextProvider action={DataAction.Create}>
                    <DishTagForm />
                </DishTagFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<DishTagFormContextProvider action={DataAction.Update}>
                    <DishTagForm />
                </DishTagFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<DishTagDetails />} />
            <Route
                index
                element={<DishTagList />} />
            <Route
                path={'all'}
                element={<DishTagList />} />
        </Route>
    )
}

export default useDishTagRoutes