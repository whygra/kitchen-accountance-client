import { Route } from "react-router-dom";
import UnitList from "../views/unit/list/UnitList";
import UserList from "../views/user/list/UserList";
import InviteUser from "../views/user/forms/InviteUser";

function useUserRoutes() {
    return (
        <Route path="/users">
            
            <Route
                index
                element={<UserList />} />
            <Route
                path={'all'}
                element={<UserList />} />
            <Route
                path={'invite'}
                element={<InviteUser />} />
        </Route>
    )
}

export default useUserRoutes