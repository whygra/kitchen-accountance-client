import { Route } from "react-router-dom";
import DishCategoryFormContextProvider from "../../context/dish/DishCategoryFormContext";
import DishCategoryForm from "../dishCategory/form/DishCategoryForm";
import DishCategoryDetails from "../dishCategory/details/DishCategoryDetails";
import DishCategoryList from "../dishCategory/list/DishCategoryList";
import { DataAction } from "../../models";

function useDishCategoryRoutes() {
    return (
        <Route path="/dish-categories">
            <Route
            path={'create/copy/:id'}
            element={<DishCategoryFormContextProvider action={DataAction.Create}>
                <DishCategoryForm />
            </DishCategoryFormContextProvider>} />
            <Route
                path={'create'}
                element={<DishCategoryFormContextProvider action={DataAction.Create}>
                    <DishCategoryForm />
                </DishCategoryFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<DishCategoryFormContextProvider action={DataAction.Update}>
                    <DishCategoryForm />
                </DishCategoryFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<DishCategoryDetails />} />
            <Route
                index
                element={<DishCategoryList />} />
            <Route
                path={'all'}
                element={<DishCategoryList />} />
        </Route>
    )
}

export default useDishCategoryRoutes