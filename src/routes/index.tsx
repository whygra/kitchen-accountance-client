import { Route, Routes } from 'react-router-dom'
import 'bootstrap';
import 'react-bootstrap';
import Home from '../views/Home';
import DistributorDetails from '../views/distributor/details/DistributorDetails';
import SignIn from '../views/auth/SignIn';
import SignUp from '../views/auth/SignUp';
import NotFound from '../views/NotFound';
import UserDetails from '../views/user/details/UserDetails';
import UserList from '../views/user/list/UserList';
import useIngredientRoutes from './IngredientRoutes';
import useDishRoutes from './DishRoutes';
import useProductRoutes from './ProductRoutes';
import useDistributorRoutes from './DistributorRoutes';
import usePurchaseOptionRoutes from './PurchaseOptionRoutes';
import { EmailVerificationRequired } from '../views/EmailVerificationRequired';
import { VerifyEmail } from '../views/VerifyEmail';
import useProjectRoutes from './ProjectRoutes';
import useIngredientCategoryRoutes from './IngredientCategoryRoutes';
import useIngredientGroupRoutes from './IngredientGroupRoutes';
import useDishCategoryRoutes from './DishCategoryRoutes';
import useDishGroupRoutes from './DishGroupRoutes';
import useProductCategoryRoutes from './ProductCategoryRoutes';
import useProductGroupRoutes from './ProductGroupRoutes';
import useUnitRoutes from './UnitRoutes';
import ForgotPassword from '../views/auth/ForgotPassword';
import ResetPassword from '../views/auth/ResetPassword';
import useUserRoutes from './UserRoutes';
import useInventoryActRoutes from './InventoryActRoutes';
import useWriteOffActRoutes from './WriteOffActRoutes';
import usePurchaseActRoutes from './PurchaseActRoutes';
import useSaleActRoutes from './SaleActRoutes';

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
    const userRoutes = useUserRoutes()
    const inventoryActRoutes = useInventoryActRoutes()
    const writeOffActRoutes = useWriteOffActRoutes()
    const purchaseActRoutes = usePurchaseActRoutes()
    const saleActRoutes = useSaleActRoutes()

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
        {userRoutes}
        {inventoryActRoutes}
        {writeOffActRoutes}
        {purchaseActRoutes}
        {saleActRoutes}


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
            path={'/forgot-password'}
            element={ 
                <ForgotPassword/>
            }
            />
        <Route
            path={'/password-reset/:resetToken'}
            element={ 
                <ResetPassword/>
            }
            />
        <Route
            path={'/profile'}
            element={ 
                <UserDetails/>
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
