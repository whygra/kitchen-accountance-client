import { Route, Routes } from 'react-router-dom'
import 'bootstrap';
import 'react-bootstrap';
import Home from '../Home';
import DistributorDetails from '../distributor/details/DistributorDetails';
import SignIn from '../user/forms/SignIn';
import SignUp from '../user/forms/SignUp';
import NotFound from '../NotFound';
import UserDetails from '../user/details/UserDetails';
import UserList from '../user/list/UserList';
import useIngredientRoutes from './IngredientRoutes';
import useDishRoutes from './DishRoutes';
import useProductRoutes from './ProductRoutes';
import useDistributorRoutes from './DistributorRoutes';
import usePurchaseOptionRoutes from './PurchaseOptionRoutes';

function AppRoutes() {
    const ingredientRoutes = useIngredientRoutes()
    const distributorRoutes = useDistributorRoutes()
    const dishRoutes = useDishRoutes()
    const productRoutes = useProductRoutes()
    const purchaseOptionRoutes = usePurchaseOptionRoutes()

    return (
        
        <Routes>
            
        {ingredientRoutes}
        {distributorRoutes}
        {dishRoutes}
        {productRoutes}
        {purchaseOptionRoutes}

        <Route
            path='/home'
            element={<Home/>}
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

export default AppRoutes
