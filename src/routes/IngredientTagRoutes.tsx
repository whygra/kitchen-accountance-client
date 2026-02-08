import { Route } from "react-router-dom";
import IngredientTagFormContextProvider from "../context/forms/nomenclature/ingredient/IngredientTagFormContext";
import IngredientTagForm from "../views/ingredientTag/form/IngredientTagForm";
import IngredientTagDetails from "../views/ingredientTag/details/IngredientTagDetails";                     
import IngredientTagList from "../views/ingredientTag/list/IngredientTagList";
import { DataAction } from "../models";

function useIngredientTagRoutes() {
    return (
        <Route path="/ingredient-tags">
            <Route
            path={'create/copy/:id'}
            element={<IngredientTagFormContextProvider action={DataAction.Create}>
                <IngredientTagForm />
            </IngredientTagFormContextProvider>} />
            <Route
                path={'create'}
                element={<IngredientTagFormContextProvider action={DataAction.Create}>
                    <IngredientTagForm />
                </IngredientTagFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<IngredientTagFormContextProvider action={DataAction.Update}>
                    <IngredientTagForm />
                </IngredientTagFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<IngredientTagDetails />} />
            <Route
                index
                element={<IngredientTagList />} />
            <Route
                path={'all'}
                element={<IngredientTagList />} />
        </Route>
    )
}

export default useIngredientTagRoutes