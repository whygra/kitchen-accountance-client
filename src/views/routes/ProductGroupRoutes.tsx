import { Route } from "react-router-dom";
import ProductGroupFormContextProvider from "../../context/product/ProductGroupFormContext";
import ProductGroupForm from "../productGroup/form/ProductGroupForm";
import ProductGroupDetails from "../productGroup/details/ProductGroupDetails";
import ProductGroupList from "../productGroup/list/ProductGroupList";
import { DataAction } from "../../models";

function useProductGroupRoutes() {
    return (
        <Route path="/product-groups">
            <Route
            path={'create/copy/:id'}
            element={<ProductGroupFormContextProvider action={DataAction.Create}>
                <ProductGroupForm />
            </ProductGroupFormContextProvider>} />
            <Route
                path={'create'}
                element={<ProductGroupFormContextProvider action={DataAction.Create}>
                    <ProductGroupForm />
                </ProductGroupFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<ProductGroupFormContextProvider action={DataAction.Update}>
                    <ProductGroupForm />
                </ProductGroupFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<ProductGroupDetails />} />
            <Route
                index
                element={<ProductGroupList />} />
            <Route
                path={'all'}
                element={<ProductGroupList />} />
        </Route>
    )
}

export default useProductGroupRoutes