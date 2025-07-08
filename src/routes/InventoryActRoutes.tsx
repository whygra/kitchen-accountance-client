import { Route } from "react-router-dom";
import InventoryActDetails from "../views/storage/inventoryAct/details/InventoryActDetails";
import { DataAction } from "../models";
import InventoryActList from "../views/storage/inventoryAct/list/InventoryActList";
import InventoryActFormContextProvider from "../context/forms/storage/InventoryActFormContext";
import InventoryActForm from "../views/storage/inventoryAct/form/InventoryActForm";

function useInventoryActRoutes() {
    return (
        <Route path="/inventory-acts">
            <Route
            path={'/inventory-acts/create/copy/:id'}
            element={<InventoryActFormContextProvider action={DataAction.Create}>
                <InventoryActForm />
            </InventoryActFormContextProvider>} />
            <Route
                path={'/inventory-acts/create'}
                element={<InventoryActFormContextProvider action={DataAction.Create}>
                    <InventoryActForm />
                </InventoryActFormContextProvider>} />
            <Route
                path={'/inventory-acts/edit/:id'}
                element={<InventoryActFormContextProvider action={DataAction.Update}>
                    <InventoryActForm />
                </InventoryActFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<InventoryActDetails />} />
            <Route
                path={'/inventory-acts/all'}
                element={<InventoryActList />} />
        </Route>
    )
}

export default useInventoryActRoutes