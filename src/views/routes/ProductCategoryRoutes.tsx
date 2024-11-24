import { Route } from "react-router-dom";
import ProductCategoryFormContextProvider from "../../context/product/ProductCategoryFormContext";
import ProductCategoryForm from "../productCategory/form/ProductCategoryForm";
import ProductCategoryDetails from "../productCategory/details/ProductCategoryDetails";
import ProductCategoryList from "../productCategory/list/ProductCategoryList";
import { DataAction } from "../../models";

function useProductCategoryRoutes() {
    return (
        <Route path="/product-categories">
            <Route
            path={'create/copy/:id'}
            element={<ProductCategoryFormContextProvider action={DataAction.Create}>
                <ProductCategoryForm />
            </ProductCategoryFormContextProvider>} />
            <Route
                path={'create'}
                element={<ProductCategoryFormContextProvider action={DataAction.Create}>
                    <ProductCategoryForm />
                </ProductCategoryFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<ProductCategoryFormContextProvider action={DataAction.Update}>
                    <ProductCategoryForm />
                </ProductCategoryFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<ProductCategoryDetails />} />
            <Route
                index
                element={<ProductCategoryList />} />
            <Route
                path={'all'}
                element={<ProductCategoryList />} />
        </Route>
    )
}

export default useProductCategoryRoutes