import { Route } from "react-router-dom";
import ProductTagFormContextProvider from "../context/forms/nomenclature/product/ProductTagFormContext";
import ProductTagForm from "../views/productTag/form/ProductTagForm";
import ProductTagDetails from "../views/productTag/details/ProductTagDetails";                     
import ProductTagList from "../views/productTag/list/ProductTagList";
import { DataAction } from "../models";

function useProductTagRoutes() {
    return (
        <Route path="/product-tags">
            <Route
            path={'create/copy/:id'}
            element={<ProductTagFormContextProvider action={DataAction.Create}>
                <ProductTagForm />
            </ProductTagFormContextProvider>} />
            <Route
                path={'create'}
                element={<ProductTagFormContextProvider action={DataAction.Create}>
                    <ProductTagForm />
                </ProductTagFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<ProductTagFormContextProvider action={DataAction.Update}>
                    <ProductTagForm />
                </ProductTagFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<ProductTagDetails />} />
            <Route
                index
                element={<ProductTagList />} />
            <Route
                path={'all'}
                element={<ProductTagList />} />
        </Route>
    )
}

export default useProductTagRoutes