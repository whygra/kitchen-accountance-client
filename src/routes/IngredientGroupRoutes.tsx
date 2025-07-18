import { Route } from "react-router-dom";
import IngredientGroupFormContextProvider from "../context/forms/nomenclature/ingredient/IngredientGroupFormContext";
import IngredientGroupForm from "../views/ingredientGroup/form/IngredientGroupForm";
import IngredientGroupDetails from "../views/ingredientGroup/details/IngredientGroupDetails";
import IngredientGroupList from "../views/ingredientGroup/list/IngredientGroupList";
import { DataAction } from "../models";

function useIngredientGroupRoutes() {
    return (
        <Route path="/ingredient-groups">
            <Route
            path={'create/copy/:id'}
            element={<IngredientGroupFormContextProvider action={DataAction.Create}>
                <IngredientGroupForm />
            </IngredientGroupFormContextProvider>} />
            <Route
                path={'create'}
                element={<IngredientGroupFormContextProvider action={DataAction.Create}>
                    <IngredientGroupForm />
                </IngredientGroupFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<IngredientGroupFormContextProvider action={DataAction.Update}>
                    <IngredientGroupForm />
                </IngredientGroupFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<IngredientGroupDetails />} />
            <Route
                index
                element={<IngredientGroupList />} />
            <Route
                path={'all'}
                element={<IngredientGroupList />} />
        </Route>
    )
}

export default useIngredientGroupRoutes