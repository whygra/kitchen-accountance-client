import { Route } from "react-router-dom";
import PurchaseActDetails from "../views/storage/purchaseAct/details/PurchaseActDetails";
import { DataAction } from "../models";
import PurchaseActList from "../views/storage/purchaseAct/list/PurchaseActList";
import PurchaseActFormContextProvider from "../context/forms/storage/PurchaseActFormContext";
import PurchaseActForm from "../views/storage/purchaseAct/form/PurchaseActForm";

function usePurchaseActRoutes() {
    return (
        <Route path="/purchase-acts">
            <Route
            path={'/purchase-acts/create/copy/:id'}
            element={<PurchaseActFormContextProvider action={DataAction.Create}>
                <PurchaseActForm />
            </PurchaseActFormContextProvider>} />
            <Route
                path={'/purchase-acts/create'}
                element={<PurchaseActFormContextProvider action={DataAction.Create}>
                    <PurchaseActForm />
                </PurchaseActFormContextProvider>} />
            <Route
                path={'/purchase-acts/edit/:id'}
                element={<PurchaseActFormContextProvider action={DataAction.Update}>
                    <PurchaseActForm />
                </PurchaseActFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<PurchaseActDetails />} />
            <Route
                path={'/purchase-acts/all'}
                element={<PurchaseActList />} />
        </Route>
    )
}

export default usePurchaseActRoutes