import { Route } from "react-router-dom";
import UnitList from "../unit/list/UnitList";

function useUnitRoutes() {
    return (
        <Route path="/units">
            <Route
                index
                element={<UnitList />} />
            <Route
                path={'all'}
                element={<UnitList />} />
        </Route>
    )
}

export default useUnitRoutes