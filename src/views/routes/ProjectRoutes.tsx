import { Route } from "react-router-dom";
import ProjectDetails from "../project/details/ProjectDetails";
import { DataAction } from "../../models";
import ProjectList from "../project/list/ProjectList";
import ProjectFormContextProvider from "../../context/ProjectFormContextProvider";
import ProjectForm from "../project/form/ProjectForm";

function useProjectRoutes() {
    return (
        <Route path="/projects">
            <Route
                path={'create'}
                element={<ProjectFormContextProvider action={DataAction.Create}>
                    <ProjectForm />
                </ProjectFormContextProvider>} />
            <Route
                path={'edit/:id'}
                element={<ProjectFormContextProvider action={DataAction.Update}>
                    <ProjectForm />
                </ProjectFormContextProvider>} />
            <Route
                path={'details/:id'}
                element={<ProjectDetails />} />
            <Route
                path={'all'}
                element={<ProjectList />} />
        </Route>
    )
}

export default useProjectRoutes