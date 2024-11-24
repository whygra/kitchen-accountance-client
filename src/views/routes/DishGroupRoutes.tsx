import { Route } from "react-router-dom";
import DishGroupFormContextProvider from "../../context/dish/DishGroupFormContext";
import DishGroupForm from "../dishGroup/form/DishGroupForm";
import DishGroupDetails from "../dishGroup/details/DishGroupDetails";
import DishGroupList from "../dishGroup/list/DishGroupList";
import { DataAction } from "../../models";

function useDishGroupRoutes() {
    return (
        <Route path="/dish-groups">
            <Route
            path={'create/copy/:id'}
            element={<DishGroupFormContextProvider action={DataAction.Create}>
                <DishGroupForm />
            </DishGroupFormContextProvider>} />
            <Route
                path={'create'}
                element={<DishGroupFormContextProvider action={DataAction.Create}>
                    <DishGroupForm />
                </DishGroupFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<DishGroupFormContextProvider action={DataAction.Update}>
                    <DishGroupForm />
                </DishGroupFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<DishGroupDetails />} />
            <Route
                index
                element={<DishGroupList />} />
            <Route
                path={'all'}
                element={<DishGroupList />} />
        </Route>
    )
}

export default useDishGroupRoutes