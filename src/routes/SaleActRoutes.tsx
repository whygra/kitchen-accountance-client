import { Route } from "react-router-dom";
import SaleActDetails from "../views/storage/saleAct/details/SaleActDetails";
import { DataAction } from "../models";
import SaleActList from "../views/storage/saleAct/list/SaleActList";
import SaleActFormContextProvider from "../context/forms/storage/SaleActFormContext";
import SaleActForm from "../views/storage/saleAct/form/SaleActForm";

function useSaleActRoutes() {
    return (
        <Route path="/sale-acts">
            <Route
            path={'/sale-acts/create/copy/:id'}
            element={<SaleActFormContextProvider action={DataAction.Create}>
                <SaleActForm />
            </SaleActFormContextProvider>} />
            <Route
                path={'/sale-acts/create'}
                element={<SaleActFormContextProvider action={DataAction.Create}>
                    <SaleActForm />
                </SaleActFormContextProvider>} />
            <Route
                path={'/sale-acts/edit/:id'}
                element={<SaleActFormContextProvider action={DataAction.Update}>
                    <SaleActForm />
                </SaleActFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<SaleActDetails />} />
            <Route
                path={'/sale-acts/all'}
                element={<SaleActList />} />
        </Route>
    )
}

export default useSaleActRoutes