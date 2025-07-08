import { Route } from "react-router-dom";
import WriteOffActDetails from "../views/storage/writeOffAct/details/WriteOffActDetails";
import { DataAction } from "../models";
import WriteOffActList from "../views/storage/writeOffAct/list/WriteOffActList";
import WriteOffActFormContextProvider from "../context/forms/storage/WriteOffActFormContext";
import WriteOffActForm from "../views/storage/writeOffAct/form/WriteOffActForm";

function useWriteOffActRoutes() {
    return (
        <Route path="/write-off-acts">
            <Route
            path={'/write-off-acts/create/copy/:id'}
            element={<WriteOffActFormContextProvider action={DataAction.Create}>
                <WriteOffActForm />
            </WriteOffActFormContextProvider>} />
            <Route
                path={'/write-off-acts/create'}
                element={<WriteOffActFormContextProvider action={DataAction.Create}>
                    <WriteOffActForm />
                </WriteOffActFormContextProvider>} />
            <Route
                path={'/write-off-acts/edit/:id'}
                element={<WriteOffActFormContextProvider action={DataAction.Update}>
                    <WriteOffActForm />
                </WriteOffActFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<WriteOffActDetails />} />
            <Route
                path={'/write-off-acts/all'}
                element={<WriteOffActList />} />
        </Route>
    )
}

export default useWriteOffActRoutes