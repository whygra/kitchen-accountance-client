import { Route } from "react-router-dom";
import IngredientFormContextProvider from "../../context/IngredientFormContext";
import IngredientForm from "../ingredient/form/IngredientForm";
import IngredientDetails from "../ingredient/details/IngredientDetails";
import IngredientList from "../ingredient/list/IngredientList";
import { DataAction } from "../../models";

function useIngredientRoutes() {
    return (
        <Route path="/ingredients">
            <Route
            path={'create/copy/:id'}
            element={<IngredientFormContextProvider action={DataAction.Create}>
                <IngredientForm />
            </IngredientFormContextProvider>} />
            <Route
                path={'create'}
                element={<IngredientFormContextProvider action={DataAction.Create}>
                    <IngredientForm />
                </IngredientFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<IngredientFormContextProvider action={DataAction.Update}>
                    <IngredientForm />
                </IngredientFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<IngredientDetails />} />
            <Route
                index
                element={<IngredientList />} />
            <Route
                path={'all'}
                element={<IngredientList />} />
        </Route>
    )
}

export default useIngredientRoutes