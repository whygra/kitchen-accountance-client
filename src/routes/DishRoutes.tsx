import { Route } from "react-router-dom";
import { DataAction } from "../models";
import DishFormContextProvider from "../context/forms/dish/DishFormContext";
import DishForm from "../views/dish/form/DishForm";
import DishDetails from "../views/dish/details/DishDetails";
import DishList from "../views/dish/list/DishList";

function useDishRoutes() {
    return (
        <Route path="/dishes">
            <Route
            path={'create/copy/:id'}
            element={ 
                <DishFormContextProvider action={DataAction.Create}>
                    <DishForm/>
                </DishFormContextProvider>
            }
            />
            <Route
                path={'create'}
                element={ 
                    <DishFormContextProvider action={DataAction.Create}>
                        <DishForm/>
                    </DishFormContextProvider>
                }
                />
            <Route
                path={'edit/:id'}
                element={ 
                    <DishFormContextProvider action={DataAction.Update}>
                        <DishForm/>
                    </DishFormContextProvider>
                }
            />
            <Route
                path={'details/:id'}
                element={ 
                    <DishDetails/>
                }
                />
            <Route
                index
                element={ 
                    <DishList/>
                }
                />
            <Route
                path={'all'}
                element={ 
                    <DishList/>
                }
                />
        </Route>
    )
}

export default useDishRoutes