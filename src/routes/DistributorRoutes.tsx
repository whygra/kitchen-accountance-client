import { Route } from "react-router-dom";
import { DataAction } from "../models";
import DistributorFormContextProvider from "../context/DistributorFormContext";
import DistributorForm from "../views/distributor/form/DistributorForm";
import DistributorDetails from "../views/distributor/details/DistributorDetails";
import DistributorList from "../views/distributor/list/DistributorList";

function useDistributorRoutes() {
    return (
        <Route path="/distributors">
            
        <Route
            path={'create'}
            element={ 
                <DistributorFormContextProvider action={DataAction.Create}>
                    <DistributorForm/>
                </DistributorFormContextProvider>
            }
            />
        <Route
            path={'create/copy/:id'}
            element={ 
                <DistributorFormContextProvider action={DataAction.Create}>
                    <DistributorForm/>
                </DistributorFormContextProvider>
            }
            />
        <Route
            path={'edit/:id'}
            element={ 
                <DistributorFormContextProvider action={DataAction.Update}>
                    <DistributorForm/>
                </DistributorFormContextProvider>
            }
            />
        <Route
            path={'details/:id'}
            element={ 
                <DistributorDetails/>
            }
        />
        <Route
            index
            element={ 
                <DistributorList/>
            }
            />
        <Route
            path={'all'}
            element={ 
                <DistributorList/>
            }
            />
        </Route>
    )
}

export default useDistributorRoutes