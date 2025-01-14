import { Route } from "react-router-dom";
import IngredientCategoryFormContextProvider from "../context/forms/ingredient/IngredientCategoryFormContext";
import IngredientCategoryForm from "../views/ingredientCategory/form/IngredientCategoryForm";
import IngredientCategoryDetails from "../views/ingredientCategory/details/IngredientCategoryDetails";
import IngredientCategoryList from "../views/ingredientCategory/list/IngredientCategoryList";
import { DataAction } from "../models";

function useIngredientCategoryRoutes() {
    return (
        <Route path="/ingredient-categories">
            <Route
            path={'create/copy/:id'}
            element={<IngredientCategoryFormContextProvider action={DataAction.Create}>
                <IngredientCategoryForm />
            </IngredientCategoryFormContextProvider>} />
            <Route
                path={'create'}
                element={<IngredientCategoryFormContextProvider action={DataAction.Create}>
                    <IngredientCategoryForm />
                </IngredientCategoryFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<IngredientCategoryFormContextProvider action={DataAction.Update}>
                    <IngredientCategoryForm />
                </IngredientCategoryFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<IngredientCategoryDetails />} />
            <Route
                index
                element={<IngredientCategoryList />} />
            <Route
                path={'all'}
                element={<IngredientCategoryList />} />
        </Route>
    )
}

export default useIngredientCategoryRoutes