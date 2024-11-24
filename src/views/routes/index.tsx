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
import { EmailVerificationRequired } from '../EmailVerificationRequired';
import { VerifyEmail } from '../VerifyEmail';
import useProjectRoutes from './ProjectRoutes';
import useIngredientCategoryRoutes from './IngredientCategoryRoutes';
import useIngredientGroupRoutes from './IngredientGroupRoutes';
import useDishCategoryRoutes from './DishCategoryRoutes';
import useDishGroupRoutes from './DishGroupRoutes';
import useProductCategoryRoutes from './ProductCategoryRoutes';
import useProductGroupRoutes from './ProductGroupRoutes';
import useUnitRoutes from './UnitRoutes';

function AppRoutes() {
    const ingredientRoutes = useIngredientRoutes()
    const ingredientCategoryRoutes = useIngredientCategoryRoutes()
    const ingredientGroupRoutes = useIngredientGroupRoutes()
    const distributorRoutes = useDistributorRoutes()
    const dishRoutes = useDishRoutes()
    const dishCategoryRoutes = useDishCategoryRoutes()
    const dishGroupRoutes = useDishGroupRoutes()
    const productRoutes = useProductRoutes()
    const productCategoryRoutes = useProductCategoryRoutes()
    const productGroupRoutes = useProductGroupRoutes()
    const purchaseOptionRoutes = usePurchaseOptionRoutes()
    const unitRoutes = useUnitRoutes()
    const projectRoutes = useProjectRoutes()

    return (
        
        <Routes>
            
        {ingredientRoutes}
        {ingredientCategoryRoutes}
        {ingredientGroupRoutes}
        {distributorRoutes}
        {dishRoutes}
        {dishCategoryRoutes}
        {dishGroupRoutes}
        {dishRoutes}
        {productRoutes}
        {productCategoryRoutes}
        {productGroupRoutes}
        {purchaseOptionRoutes}
        {unitRoutes}
        {projectRoutes}

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
            path={'/email-verification-required'}
            element={ 
                <EmailVerificationRequired/>
            }
            />
        <Route
            path={'/verify-email'}
            element={ 
                <VerifyEmail/>
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
