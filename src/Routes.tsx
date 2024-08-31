import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import router from './router'
import store from "./redux/store";
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import Navbar from './views/Navbar';
import { useContext, useEffect, useState } from 'react';
import { appContext } from './context/AppContextProvider';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './views/Error';
import Home from './views/Home';
import IngredientFormContextProvider from './context/IngredientFormContext';
import IngredientForm from './views/ingredient/form/IngredientForm';
import IngredientDetails from './views/ingredient/details/IngredientDetails';
import IngredientList from './views/ingredient/list/IngredientList';
import DishFormContextProvider from './context/DishFormContext';
import { DataAction } from './models';
import DishForm from './views/dish/form/DishForm';
import DishDetails from './views/dish/details/DishDetails';
import DishList from './views/dish/list/DishList';
import DistributorFormContextProvider from './context/DistributorFormContext';
import DistributorForm from './views/distributor/form/DistributorForm';
import DistributorDetails from './views/distributor/details/DistributorDetails';
import DistributorList from './views/distributor/list/DistributorList';
import SignIn from './views/user/forms/SignIn';
import SignUp from './views/user/forms/SignUp';
import NotFound from './views/NotFound';
import UserDetails from './views/user/details/UserDetails';
import UserList from './views/user/list/UserList';

function Router() {
    return (


        <Routes>
        <Route
            path='/home'
            element={<Home/>}
            />
        <Route
            path={'/ingredients/create/copy/:id'}
            element={<IngredientFormContextProvider action={DataAction.Create}>
            <IngredientForm/>
            </IngredientFormContextProvider>}
        />
        <Route
            path={'/ingredients/edit/:id'}
            element={ 
                <IngredientFormContextProvider action={DataAction.Update}>
                    <IngredientForm/>
                </IngredientFormContextProvider>
            }
            />
        <Route
            path={'/ingredients/details/:id'}
            element={ 
                <IngredientDetails/>
            }
            />
        <Route
            path={'/ingredients/all'}
            element={ 
                <IngredientList/>
            }
            />
        <Route
            path={'/dishes/create/copy/:id'}
            element={ 
                <DishFormContextProvider action={DataAction.Create}>
                    <DishForm/>
                </DishFormContextProvider>
            }
            />
        
        <Route
            path={'/dishes/create'}
            element={ 
                <DishFormContextProvider action={DataAction.Create}>
                    <DishForm/>
                </DishFormContextProvider>
            }
            />
        <Route
            path={'/dishes/edit/:id'}
            element={ 
                <DishFormContextProvider action={DataAction.Update}>
                    <DishForm/>
                </DishFormContextProvider>
            }
        />
        <Route
            path={'/dishes/details/:id'}
            element={ 
                <DishDetails/>
            }
            />
        <Route
            path={'/dishes/all'}
            element={ 
                <DishList/>
            }
            />
        <Route
            path={'/distributors/create'}
            element={ 
                <DistributorFormContextProvider action={DataAction.Create}>
                    <DistributorForm/>
                </DistributorFormContextProvider>
            }
            />
        <Route
            path={'/distributors/create/copy/:id'}
            element={ 
                <DistributorFormContextProvider action={DataAction.Create}>
                    <DistributorForm/>
                </DistributorFormContextProvider>
            }
            />
        <Route
            path={'/distributors/edit/:id'}
            element={ 
                <DistributorFormContextProvider action={DataAction.Update}>
                    <DistributorForm/>
                </DistributorFormContextProvider>
            }
            />
        <Route
            path={'/distributors/details/:id'}
            element={ 
                <DistributorDetails/>
            }
        />
        <Route
            path={'/distributors/all'}
            element={ 
                <DistributorList/>
            }
            />
        <Route
            path={'/signin'}
            element={ 
                <SignIn/>
            }
            />
        <Route
            path={'/signup'}
            element={ 
                <SignUp/>
            }
            />
        <Route
            path={'/profile'}
            element={ 
                <UserDetails/>
            }
            />
        <Route
            path={'/users'}
            element={ 
                <UserList/>
            }
            />
        <Route
            path={'/'}
            element={ 
                <Home/>
            }
            />
        <Route
            path={'*'}
            element={ 
                <NotFound/>
            }
            />
        
        </Routes>
    )
}

export default Router
