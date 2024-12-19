import { Route } from "react-router-dom";
import PurchaseOptionDetails from "../views/purchase_option/details/PurchaseOptionDetails";
import { DataAction } from "../models";
import PurchaseOptionList from "../views/purchase_option/list/PurchaseOptionList";
import PurchaseOptionFormContextProvider from "../context/PurchaseOptionFormContext";
import PurchaseOptionForm from "../views/purchase_option/form/PurchaseOptionForm";

function usePurchaseOptionRoutes() {
    return (
        <Route path="/purchase-options">
            <Route
            path={'/purchase-options/create/copy/:id'}
            element={<PurchaseOptionFormContextProvider action={DataAction.Create}>
                <PurchaseOptionForm />
            </PurchaseOptionFormContextProvider>} />
            <Route
                path={'/purchase-options/create'}
                element={<PurchaseOptionFormContextProvider action={DataAction.Create}>
                    <PurchaseOptionForm />
                </PurchaseOptionFormContextProvider>} />
            <Route
                path={'/purchase-options/edit/:id'}
                element={<PurchaseOptionFormContextProvider action={DataAction.Update}>
                    <PurchaseOptionForm />
                </PurchaseOptionFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<PurchaseOptionDetails />} />
            <Route
                path={'/purchase-options/all'}
                element={<PurchaseOptionList />} />
        </Route>
    )
}

export default usePurchaseOptionRoutes