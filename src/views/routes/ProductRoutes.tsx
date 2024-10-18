import { Route } from "react-router-dom";
import ProductDetails from "../product/details/ProductDetails";
import { DataAction } from "../../models";
import ProductList from "../product/list/ProductList";
import ProductFormContextProvider from "../../context/ProductFormContext";
import ProductForm from "../product/form/ProductForm";

function useProductRoutes() {
    return (
        <Route path="/products">
            <Route
            path={'/products/create/copy/:id'}
            element={<ProductFormContextProvider action={DataAction.Create}>
                <ProductForm />
            </ProductFormContextProvider>} />
            <Route
                path={'/products/create'}
                element={<ProductFormContextProvider action={DataAction.Create}>
                    <ProductForm />
                </ProductFormContextProvider>} />
            <Route
                path={'/products/edit/:id'}
                element={<ProductFormContextProvider action={DataAction.Update}>
                    <ProductForm />
                </ProductFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<ProductDetails />} />
            <Route
                path={'/products/all'}
                element={<ProductList />} />
        </Route>
    )
}

export default useProductRoutes